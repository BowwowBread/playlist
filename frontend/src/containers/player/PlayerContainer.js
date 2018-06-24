import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as playListActions from 'store/modules/playList';
import * as baseActions from 'store/modules/base';
import { Player } from 'components/player';
import * as PlayListApi from 'lib/api/playList';

class PlayerContainer extends Component {
  state = {};
  async componentWillMount() {
    const {
      BaseActions, PlayListActions, playerInfo, match, history,
    } = this.props;
    if (playerInfo.get('id') === '') {
      const newPlayerInfo = await PlayListApi.getPlayList(match.params.id);
      newPlayerInfo === null ? history.push('/') : PlayListActions.setPlayer(newPlayerInfo);
      BaseActions.togglePlayer();
    }
  }

  componentWillUnmount() {
    const { BaseActions } = this.props;
    BaseActions.togglePlayer();
  }
  render() {
    const { playerInfo, match } = this.props;
    return (
      <div style={{
        height: '100%',
      }}
      >
        <Player component="div" id={match.params.id} playerInfo={playerInfo} />
      </div>
    );
  }
}

export default withRouter(connect(state => ({
  playerInfo: state
    .playList
    .get('playerInfo'),
}), dispatch => ({
  PlayListActions: bindActionCreators(playListActions, dispatch),
  BaseActions: bindActionCreators(baseActions, dispatch),
}))(PlayerContainer));
