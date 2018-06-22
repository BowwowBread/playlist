import React, { Component } from 'react';
import Header from 'components/common/Header';
import { withRouter } from 'react-router-dom';
import { getPlayList } from 'lib/api/playList';
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

  toggleMobileSideBar = () => {
    const { BaseActions } = this.props;
    BaseActions.toggleMobileSidebar();
  }

  login = () => {
    const baseURI = location.protocol + '//' + location.hostname + ':' + 3001 + '/api/auth/sign';
    location.href = `${baseURI}`;
  }

  logout = async () => {
    const { UserActions } = this.props;
    const cookies = new Cookies();
    await UserActions.logout();
    cookies.remove('token');
    this.props.history.push('/');
    console.log('logout');
  }
  render() {
    const {
      toggleMobileSideBar, handleMenu, handleClose, login, logout,
    } = this;
    const {
      userInfo, isLogin, mobileSideBar,
    } = this.props;
    const { anchorEl } = this.state;

    return (
      <div>
        <Header
          toggleMobileSideBar={toggleMobileSideBar}
          mobileSideBar={mobileSideBar}
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
    isLogin: state.user.get('isLogin'),
    mobileSideBar: state.base.getIn(['mobileSidebar', 'visible']),
  }),
  dispatch => ({
    UserActions: bindActionCreators(userActions, dispatch),
    BaseActions: bindActionCreators(baseActions, dispatch),
  }),
)(HeaderContainer));
