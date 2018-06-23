import React from 'react';
import classNames from 'classnames/bind';
import { withStyles } from '@material-ui/core/styles';
import { Drawer, Hidden, Divider, List } from '@material-ui/core';
import MenuItem from './MenuItem';

const drawerWidth = 240;

const styles = theme => ({
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
    [
    theme
      .breakpoints
      .up('md')
    ]: {
      position: 'relative',
    },
  },
  playerDrawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing.unit * 7,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing.unit * 9,
    },
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3,
  },
});

const FloatMenu = ({
  isSidebarOpen, toggleSidebar, isLogin, classes,
}) => (
  <Drawer
    variant="temporary"
    anchor="left"
    open={isSidebarOpen}
    onClose={toggleSidebar}
    classes={{
    paper: classes.drawerPaper,
  }}
    ModalProps={{
    keepMounted: true,
  }}
  >
    <div className={classes.toolbar} />
    <MenuItem isLogin={isLogin} />
  </Drawer>
);

const MiniMenu = ({
  isPlayerOpen, isSidebarOpen, toggleSidebar, isLogin, classes,
}) => (
  <Drawer
    variant="permanent"
    classes={{
    paper: classNames(classes.playerDrawerPaper, !isSidebarOpen && classes.drawerPaperClose),
  }}
    open={isSidebarOpen}
    onClose={toggleSidebar}
  >
    <div className={classes.toolbar} />
    <MenuItem isLogin={isLogin} isPlayerOpen={isPlayerOpen} />
  </Drawer>
);

const DefaultMenu = ({ classes, isLogin }) => (
  <Drawer
    variant="permanent"
    open
    classes={{
    paper: classes.drawerPaper,
  }}
  >
    <div className={classes.toolbar} />
    <MenuItem isLogin={isLogin} />

  </Drawer>
);

const SideMenu = ({
  isPlayerOpen,
  isLogin,
  isSidebarOpen,
  toggleSidebar,
  classes,
  theme,
}) => {
  console.log(isPlayerOpen);
  return (
    <div>
      <Hidden mdUp>
        {isPlayerOpen === true
          ? <MiniMenu
            isSidebarOpen={isSidebarOpen}
            toggleSidebar={toggleSidebar}
            isLogin={isLogin}
            classes={classes}
            isPlayerOpen={isPlayerOpen}
          />
          : null}
        <FloatMenu
          isSidebarOpen={isSidebarOpen}
          toggleSidebar={toggleSidebar}
          classes={classes}
        />
      </Hidden>
      <Hidden smDown implementation="css">
        {isPlayerOpen === true
          ? <MiniMenu
            isSidebarOpen={isSidebarOpen}
            toggleSidebar={toggleSidebar}
            isLogin={isLogin}
            classes={classes}
            isPlayerOpen={isPlayerOpen}
          />
          : <DefaultMenu isLogin={isLogin} classes={classes} />}
      </Hidden>
    </div>
  );
};

export default withStyles(styles, { withTheme: true })(SideMenu);
