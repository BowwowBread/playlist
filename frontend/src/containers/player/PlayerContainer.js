import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as playListActions from 'store/modules/playList';
import * as baseActions from 'store/modules/base';


class PlayerContainer extends Component {
  state = {
    src: '',
  };
  componentWillMount() {
    const { BaseActions, playerInfo, match } = this.props;
    BaseActions.togglePlayer();
    const src = match.params.id;
    this.setState({
      src: `http://www.youtube.com/embed?listType=playlist&list=${src}&autoplay=1`,
    });
  }

  componentWillUnmount() {
    const { BaseActions } = this.props;
    BaseActions.togglePlayer();
  }
  render() {
    const { src } = this.state;
    const { playerInfo } = this.props;
    return (
      <div style={{ height: '100%' }}>
        <iframe
          src={src}
          width="100%"
          height="100%"
          title={playerInfo.get('channelTitle')}
          frameBorder="0"
          allow="autoplay; encrypted-media"
          allowFullScreen
        />
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
