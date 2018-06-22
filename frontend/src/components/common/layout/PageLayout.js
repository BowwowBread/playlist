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

const PageLayout = ({ children, classes, theme }) => {
  return (
    <div>
      <div className={classes.root}>
        <HeaderContainer />
        <SideMenuContainer />
        <main className={classes.content}>
          <div className={classes.toolbar} />
          {children}
        </main>
      </div>
    </div>
  );
};

export default withStyles(styles, { withTheme: true })(PageLayout);
