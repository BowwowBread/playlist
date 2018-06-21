import React, { Component } from 'react';
import Cookies from 'universal-cookie';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as playListActions from 'store/modules/playlist';
import MyPlatList from 'components/list/MyPlayList';

class MyPlayListContainer extends Component {
  state = { }
  async componentWillMount() {
    const { PlayListActions } = this.props;
    const token = new Cookies().get('token');
    await PlayListActions.fetchMyPlayList(token);
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
