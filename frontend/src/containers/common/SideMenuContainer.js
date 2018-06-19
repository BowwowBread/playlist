import React, { Component } from 'react';
import SideMenu from 'components/common/SideMenu';

class SideMenuContainer extends Component {
  state ={

  };
  render() {
    const { mobileOpen, handleSideMenu } = this.props;
    return (
      <SideMenu mobileOpen={mobileOpen} handleSideMenu={handleSideMenu} />
    );
  }
}

export default SideMenuContainer;
