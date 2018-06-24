import { HeaderContainer, SideMenuContainer } from 'containers/base';
import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { callbackify } from 'util';

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
    height: 'calc(100vh - 100px)',
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3,
  },
});

const MainLayout = ({ children, classes, theme }) => {
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

export default withStyles(styles, { withTheme: true })(MainLayout);
