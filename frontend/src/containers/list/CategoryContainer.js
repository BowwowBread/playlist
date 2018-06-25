import React, { Component } from 'react';
import { connect } from 'react-redux';
import Cookies from 'universal-cookie';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import * as playListActions from 'store/modules/playList';
import { toJS } from 'immutable';
import { CategoryList } from 'components/list';

class CategoryContainer extends Component {
  state = { }

  async componentDidMount() {
    const { PlayListActions, match, playLists } = this.props;
    const token = new Cookies().get('token');
    await PlayListActions.getAllPlayList(token);
    const { category } = match.params;
    await PlayListActions.setCategoryPlayList(category);
  }

  shouldComponentUpdate(nextProps) {
    const { success } = nextProps;
    if (success) {
      return true;
    }
    return false;
  }

  handlePlayer = (playList) => {
    const { PlayListActions, history } = this.props;
    PlayListActions.setPlayer(playList);
    history.push(`/player/${playList.id}`);
  }

  render() {
    const { playLists, category } = this.props;
    const { handlePlayer } = this;
    return (
      <div>
        <CategoryList playLists={playLists} category={category} handlePlayer={handlePlayer} />
      </div>
    );
  }
}

export default withRouter(connect(state => ({
  playLists: state.playList.getIn(['categoryPlayList', 'playLists']),
  category: state.playList.getIn(['categoryPlayList', 'category']),
  pending: state.pender.pending['list/GET_ALL_PLAYLIST'],
  success: state.pender.success['list/GET_ALL_PLAYLIST'],
  failure: state.pender.failure['list/GET_ALL_PLAYLIST'],
}), dispatch => ({
  PlayListActions: bindActionCreators(playListActions, dispatch),
}))(CategoryContainer));
