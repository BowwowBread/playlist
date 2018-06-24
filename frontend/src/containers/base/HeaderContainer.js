import React, { Component } from 'react';
import { Header } from 'components/base';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Cookies from 'universal-cookie';
import * as userActions from 'store/modules/user';
import * as baseActions from 'store/modules/base';

class HeaderContainer extends Component {
  state = {
    anchorEl: null,
  };

  handleMenu = (event) => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  toggleSideBar = () => {
    const { BaseActions } = this.props;
    BaseActions.toggleSidebar();
  }

  login = () => {
    const baseURI = location.protocol + '//' + location.hostname + ':' + 3001 + '/api/auth/sign';
    location.href = `${baseURI}`;
  }

  logout = async () => {
    const { UserActions, history } = this.props;
    const cookies = new Cookies();
    await UserActions.logout();
    cookies.remove('token');
    history.push('/');
  }
  render() {
    const {
      toggleSideBar, handleMenu, handleClose, login, logout,
    } = this;
    const {
      userInfo, isLogin, isSidebarOpen, isPlayerOpen,
    } = this.props;
    const { anchorEl } = this.state;

    return (
      <div>
        <Header
          isSidebarOpen={isSidebarOpen}
          isPlayerOpen={isPlayerOpen}
          toggleSideBar={toggleSideBar}
          handleMenu={handleMenu}
          handleClose={handleClose}
          isLogin={isLogin}
          login={login}
          logout={logout}
          userInfo={userInfo}
          anchorEl={anchorEl}
        />
      </div>
    );
  }
}

export default withRouter(connect(
  state => ({
    userInfo: state.user.get('userInfo'),
    isSidebarOpen: state.base.get('isSidebarOpen'),
    isPlayerOpen: state.base.get('isPlayerOpen'),
    isLogin: state.user.get('isLogin'),
  }),
  dispatch => ({
    UserActions: bindActionCreators(userActions, dispatch),
    BaseActions: bindActionCreators(baseActions, dispatch),
  }),
)(HeaderContainer));
