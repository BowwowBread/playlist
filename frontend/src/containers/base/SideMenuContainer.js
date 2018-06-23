import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as baseActions from 'store/modules/base';
import { SideMenu } from 'components/base';

class SideMenuContainer extends Component {
  state ={

  };

  toggleSidebar = () => {
    const { BaseActions } = this.props;
    BaseActions.toggleSidebar();
  }
  render() {
    const { isSidebarOpen, isLogin, isPlayerOpen } = this.props;
    const { toggleSidebar } = this;
    return (
      <SideMenu isLogin={isLogin} isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} isPlayerOpen={isPlayerOpen} />
    );
  }
}

export default connect(
  state => ({
    isSidebarOpen: state.base.get('isSidebarOpen'),
    isPlayerOpen: state.base.get('isPlayerOpen'),
    isLogin: state.user.get('isLogin'),
  }),
  dispatch => ({
    BaseActions: bindActionCreators(baseActions, dispatch),
  }),
)(SideMenuContainer);
