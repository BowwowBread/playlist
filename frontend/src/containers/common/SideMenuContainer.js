import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as baseActions from 'store/modules/base';
import SideMenu from 'components/common/SideMenu';

class SideMenuContainer extends Component {
  state ={

  };

  toggleMobileSidebar = () => {
    const { BaseActions } = this.props;
    BaseActions.toggleMobileSidebar();
  }
  render() {
    const { mobileSidebar } = this.props;
    const { toggleMobileSidebar } = this;
    return (
      <SideMenu mobileSidebar={mobileSidebar} toggleMobileSidebar={toggleMobileSidebar} />
    );
  }
}

export default connect(
  state => ({
    mobileSidebar: state.base.getIn(['mobileSidebar', 'visible']),
  }),
  dispatch => ({
    BaseActions: bindActionCreators(baseActions, dispatch),
  }),
)(SideMenuContainer);
