import React, { Component } from 'react';
import Header from 'components/common/Header';
import { withRouter } from 'react-router-dom';
import { getPlaylist } from 'lib/api/youtube';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Cookies from 'universal-cookie';
import * as userActions from 'store/modules/user';

class HeaderContainer extends Component {
  state = {
    anchorEl: null,
  };

  async componentDidMount() {
    // const res = await getPlaylist();
  }

  handleMenu = (event) => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  login = () => {
    const baseURI = location.protocol + '//' + location.hostname + ':' + 3001 + '/api/user/sign';
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
      handleMenu, handleClose, login, logout,
    } = this;
    const {
      handleSideMenu, mobileOpen, userInfo, isLogin,
    } = this.props;
    const { anchorEl } = this.state;

    return (
      <div>
        <Header
          handleSideMenu={handleSideMenu}
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
  }),
  dispatch => ({
    UserActions: bindActionCreators(userActions, dispatch),
  }),
)(HeaderContainer));
