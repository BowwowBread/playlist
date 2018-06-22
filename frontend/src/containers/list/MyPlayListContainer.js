import React, { Component } from 'react';
import Cookies from 'universal-cookie';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as playListActions from 'store/modules/playList';
import MyPlatList from 'components/list/MyPlayList';

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
    myPlayList: state.playList.get('myPlayList'),
  }),
  dispatch => ({
    PlayListActions: bindActionCreators(playListActions, dispatch),
  }),
)(MyPlayListContainer);
