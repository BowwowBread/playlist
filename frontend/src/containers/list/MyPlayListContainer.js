import React, { Component } from 'react';
import Cookies from 'universal-cookie';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as playListActions from 'store/modules/playList';
import { MyPlayList } from 'components/list';

class MyPlayListContainer extends Component {
  state = { }
  async componentDidMount() {
    const { PlayListActions } = this.props;
    const token = new Cookies().get('token');
    await PlayListActions.getMyPlayList(token);
  }

  shouldComponentUpdate(nextProps, nextState) {
    console.log('shouldComponentUpdate: ' + JSON.stringify(nextProps) + ' ' + JSON.stringify(nextState));
    return true;
  }
  render() {
    const {
      myPlayList, pending, success, failure,
    } = this.props;
    return (
      <div>
        <MyPlayList myPlayList={myPlayList} pending={pending} success={success} failure={failure} />
      </div>
    );
  }
}

export default connect(
  state => ({
    myPlayList: state.playList.get('myPlayList'),
    pending: state.pender.pending['list/GET_MY_PLAYLIST'],
    success: state.pender.success['list/GET_MY_PLAYLIST'],
    failure: state.pender.failure['list/GET_MY_PLAYLIST'],
  }),
  dispatch => ({
    PlayListActions: bindActionCreators(playListActions, dispatch),
  }),
)(MyPlayListContainer);
