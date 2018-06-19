import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import { Switch, Route } from 'react-router-dom';
import Cookies from 'universal-cookie';
import { MainPage } from 'pages';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as authActions from 'store/modules/auth';

class App extends Component {
  state = {};

  async componentDidMount() {
    const cookies = new Cookies();
    const token = cookies.get('token');
    const { AuthActions, userInfo } = this.props;
    await AuthActions.getUser(token);
  }

  render() {
    return (
      <div>
        <Helmet>
          <title>youtube playlist</title>
        </Helmet>
        <Switch>
          <Route exact path="/" component={MainPage} />
        </Switch>
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
