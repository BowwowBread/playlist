import React, { Component } from 'react';
import { Home } from 'components/home';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as playListActions from 'store/modules/playList';
import Cookies from 'universal-cookie';

class HomeContainer extends Component {
  state = { };
  async componentDidMount() {
    const { PlayListActions } = this.props;
    const token = new Cookies().get('token');
    await PlayListActions.getAllPlayList(token);
  }

  handlePlayer = (playList) => {
    const { PlayListActions, history } = this.props;
    PlayListActions.setPlayer(playList);
    history.push(`/player/${playList.id}`);
  }

  render() {
    const { playLists } = this.props;
    const { handlePlayer } = this;
    return (
      <div style={{ height: '100%' }}>
        <Home playLists={playLists} handlePlayer={handlePlayer} />
      </div>
    );
  }
}

export default withRouter(connect(state => ({
  playLists: state.playList.get('playLists'),
  pending: state.pender.pending['list/GET_ALL_PLAYLIST'],
  success: state.pender.success['list/GET_ALL_PLAYLIST'],
  failure: state.pender.failure['list/GET_ALL_PLAYLIST'],
}), dispatch => ({
  PlayListActions: bindActionCreators(playListActions, dispatch),
}))(HomeContainer));
