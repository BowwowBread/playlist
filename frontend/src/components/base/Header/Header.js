import React from 'react';
import classNames from 'classnames/bind';
import MenuIcon from '@material-ui/icons/Menu';
import { withStyles } from '@material-ui/core/styles';
import { toJS } from 'immutable';
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  MenuItem,
  Menu,
  Button,
  Avatar,
  Hidden,
} from '@material-ui/core';

const drawerWidth = 240;
const miniWidth = 73;

const styles = theme => ({
  flex: {
    flex: 1,
  },
  appBar: {
    marginLeft: drawerWidth,
    [theme.breakpoints.up('md')]: {
      width: `calc(100% - ${drawerWidth}px)`,
    },
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  appBarShift: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    // [theme.breakpoints.down('sm')]: {
    //   width: `calc(100% - ${56}px)`,
    // },
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${miniWidth}px)`,
    },
  },
  avatar: {
    width: 40,
    height: 40,
  },
});
const Header = ({
  isSidebarOpen,
  isPlayerOpen,
  toggleSideBar,
  handleMenu,
  handleClose,
  login,
  anchorEl,
  classes,
  theme,
  userInfo,
  isLogin,
  logout,
}) => {
  const open = Boolean(anchorEl);
  const { name, email, thumbnail } = userInfo.toJS();
  return (
    <AppBar
      className={classNames(
        isSidebarOpen === false && classes.appBar,
        (isSidebarOpen === false && isPlayerOpen === false) && classes.appBar,
        (isPlayerOpen === true && isSidebarOpen === false) && classes.appBarShift,
        (isPlayerOpen === true && isSidebarOpen === true) && classes.appBar,
      )}

    >

      <Toolbar>
        <Hidden smDown>
          {isPlayerOpen === true ?
            <IconButton color="inherit" aria-label="open drawer" onClick={toggleSideBar}>
              <MenuIcon />
            </IconButton>
          : null}
        </Hidden>
        <Hidden mdUp>
          <IconButton color="inherit" aria-label="open drawer" onClick={toggleSideBar}>
            <MenuIcon />
          </IconButton>
        </Hidden>

        <Typography variant="title" color="inherit" className={classes.flex}>
          PLAYLIST
        </Typography>
        {isLogin
          ? (
            <div>
              {name}님
              <IconButton onClick={handleMenu}>
                <Avatar alt="profile image" src={thumbnail} className={classes.avatar} />
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
                transformOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
                open={open}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>내 정보</MenuItem>
                <MenuItem onClick={logout}>로그아웃</MenuItem>
              </Menu>
            </div>
          )
          : <Button color="inherit" onClick={login}>로그인</Button>}
      </Toolbar>
    </AppBar>
  );
};

export default withStyles(styles, { withTheme: true })(Header);
