import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import { Switch, Route } from 'react-router-dom';
import Cookies from 'universal-cookie';
import { MainPage, MyPlayListPage } from 'pages';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as authActions from 'store/modules/auth';
import { check } from 'lib/api/auth';
import { getPlayList } from 'lib/api/youtube';

class App extends Component {
  state = {};

  async componentWillMount() {
    const cookies = new Cookies();
    const token = cookies.get('token');
    const { AuthActions } = this.props;
    await AuthActions.getUser(token);
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
    userInfo: state.auth.get('userInfo'),
  }),
  dispatch => ({
    AuthActions: bindActionCreators(authActions, dispatch),
  }),
)(App);
