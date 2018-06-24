import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import { Switch, Route } from 'react-router-dom';
import Cookies from 'universal-cookie';
import { HomePage, MyPlayListPage, PlayerPage, CategoryPage } from 'pages';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as userActions from 'store/modules/user';

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
        <Route exact path="/" component={HomePage} />
        <Route path="/mylist" component={MyPlayListPage} />
        <Route path="/player/:id" component={PlayerPage} />
        <Route path="/category/:category" component={CategoryPage} />
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
