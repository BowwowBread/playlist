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
    [theme.breakpoints.up('md')]: {
      position: 'relative',
    },
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3,
  },
});


const SideMenu = ({
  mobileOpen, handleSideMenu, classes, theme,
}) => {
  return (
    <div>
      <Hidden mdUp>
        <Drawer
          variant="temporary"
          anchor="left"
          open={mobileOpen}
          onClose={handleSideMenu}
          classes={{
          paper: classes.drawerPaper,
        }}
          ModalProps={{ keepMounted: true }}
        >
          <div className={classes.toolbar} />
          <MenuItem />
        </Drawer>
      </Hidden>
      <Hidden smDown implementation="css">
        <Drawer
          variant="permanent"
          open
          classes={{
          paper: classes.drawerPaper,
        }}
        >
          <div className={classes.toolbar} />
          <MenuItem />
        </Drawer>
      </Hidden>
    </div>
  );
};

export default withStyles(styles, { withTheme: true })(SideMenu);
