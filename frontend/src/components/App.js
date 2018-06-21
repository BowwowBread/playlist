import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import { Switch, Route } from 'react-router-dom';
import Cookies from 'universal-cookie';
import { MainPage, MyPlayListPage } from 'pages';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as userActions from 'store/modules/user';
import { getPlayList } from 'lib/api/playList';

class App extends Component {
  state = {};

  async componentWillMount() {
    const cookies = new Cookies();
    const token = cookies.get('token');
    const { UserActions } = this.props;
    await UserActions.getUser(token);
  }

  render() {
    return (
      <div>
        <Helmet>
          <title>youtube playlist</title>
        </Helmet>
        <Route exact path="/" component={MainPage} />
        <Route path="/mylist" component={MyPlayListPage} />
      </div>
    );
  }
}


export default connect(
  state => ({
    userInfo: state.user.get('userInfo'),
  }),
  dispatch => ({
    UserActions: bindActionCreators(userActions, dispatch),
  }),
)(App);
