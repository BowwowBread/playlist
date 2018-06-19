import React from 'react';
import classNames from 'classnames/bind';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import Divider from '@material-ui/core/Divider';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
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
