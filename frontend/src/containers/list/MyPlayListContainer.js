import React, { Component } from 'react';
import Cookies from 'universal-cookie';
import { check } from 'lib/api/auth';
import { getPlayList } from 'lib/api/youtube';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as playListActions from 'store/modules/playlist';
import MyPlatList from 'components/list/MyPlayList';

class MyPlayListContainer extends Component {
  state = { }
  async componentWillMount() {
    const { data: accessToken } = await check(new Cookies().get('token'));
    const { PlayListActions } = this.props;
    await PlayListActions.fetchMyPlayList(accessToken);
  }

  render() {
    const { myPlayList } = this.props;
    return (
      <div>
        <MyPlatList myPlayList={myPlayList} />
      </div>
    );
  }
}

export default connect(
  state => ({
    myPlayList: state.playlist.get('myPlayList'),
  }),
  dispatch => ({
    PlayListActions: bindActionCreators(playListActions, dispatch),
  }),
)(MyPlayListContainer);
