import HeaderContainer from 'containers/common/HeaderContainer';
import SideMenuContainer from 'containers/common/SideMenuContainer';
import FooterContainer from 'containers/common/FooterContainer';
import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  root: {
    flexGrow: 1,
    height: '100%',
    zIndex: 1,
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
    width: '100%',
  },
  toolbar: theme.mixins.toolbar,
  content: {
    width: '100%',
    flexGrow: 1,
    height: '100%',
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3,
  },
});

class PageLayout extends Component {
  state = {
    mobileOpen: false,
  };

  handleSideMenu = () => {
    console.log('hi');
    this.setState({
      mobileOpen: !this.state.mobileOpen,
    });
  };
  render() {
    const { mobileOpen } = this.state;
    const { children, classes, theme } = this.props;
    const { handleSideMenu } = this;
    return (
      <div>
        <div className={classes.root}>
          <HeaderContainer mobileOpen={mobileOpen} handleSideMenu={handleSideMenu} />
          <SideMenuContainer mobileOpen={mobileOpen} handleSideMenu={handleSideMenu} />
          <main className={classes.content}>
            <div className={classes.toolbar} />
            {children}
          </main>
        </div>
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(PageLayout);
