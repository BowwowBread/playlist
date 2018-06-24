import React, { Component } from 'react';
import Cookies from 'universal-cookie';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as playListActions from 'store/modules/playList';
import { MyPlayList } from 'components/list';
import { withRouter } from 'react-router-dom';


class MyPlayListContainer extends Component {
  state = {
    categoryList: [
      '음악', '게임', '유머', '교육',
    ],
    selectCategory: [],
    open: false,
    selectPlayList: {},
  }
  async componentDidMount() {
    const { PlayListActions } = this.props;
    const token = new Cookies().get('token');
    await PlayListActions.getMyPlayList(token);
  }

  handleChange = (event) => {
    this.setState({ selectCategory: event.target.value });
  };

  handleClickOpen = (playList) => {
    this.setState({ open: true, selectPlayList: playList });
  }

  handleClose = () => {
    this.setState({ open: false, selectPlayList: {} });
  }

  handlePlayer = (playList) => {
    const { PlayListActions, BaseActions, history } = this.props;
    PlayListActions.setPlayer(playList);
    history.push(`/player/${playList.id}`);
  }

  sharePlayList = async () => {
    const { selectCategory, selectPlayList } = this.state;
    const { PlayListActions } = this.props;
    const token = new Cookies().get('token');
    try {
      await PlayListActions.sharePlayList(token, selectPlayList, selectCategory);
      this.setState({ open: false });
    } catch (e) {
      this.setState({ open: false });
    }
  }

  render() {
    const {
      categoryList,
      selectCategory,
      open,
      selectPlayList,
    } = this.state;
    const {
      myPlayList, pending, success, failure,
    } = this.props;
    const {
      handleChange,
      handleClickOpen,
      handleClose,
      sharePlayList,
      handlePlayer,
    } = this;
    return (
      <div>
        <MyPlayList
          selectPlayList={selectPlayList}
          categoryList={categoryList}
          selectCategory={selectCategory}
          open={open}
          handleChange={handleChange}
          handleClickOpen={handleClickOpen}
          handleClose={handleClose}
          myPlayList={myPlayList}
          sharePlayList={sharePlayList}
          pending={pending}
          success={success}
          failure={failure}
          handlePlayer={handlePlayer}
        />
      </div>
    );
  }
}

export default withRouter(connect(state => ({
  myPlayList: state.playList.get('myPlayList'),
  pending: state.pender.pending['list/GET_MY_PLAYLIST'],
  success: state.pender.success['list/GET_MY_PLAYLIST'],
  failure: state.pender.failure['list/GET_MY_PLAYLIST'],
}), dispatch => ({
  PlayListActions: bindActionCreators(playListActions, dispatch),
}))(MyPlayListContainer));
