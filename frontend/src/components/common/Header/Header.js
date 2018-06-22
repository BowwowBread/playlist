import React from 'react';
import classNames from 'classnames/bind';
import MenuIcon from '@material-ui/icons/Menu';
import { withStyles } from '@material-ui/core/styles';
import { toJS } from 'immutable';
import { AppBar, Toolbar, IconButton, Typography, MenuItem, Menu, Button, Avatar } from '@material-ui/core';

const drawerWidth = 240;

const styles = theme => ({
  flex: {
    flex: 1,
  },
  appBar: {
    position: 'absolute',
    [
    theme
      .breakpoints
      .up('md')
    ]: {
      width: `calc(100% - ${drawerWidth}px)`,
    },
  },
  navIconHide: {
    [
    theme
      .breakpoints
      .up('md')
    ]: {
      display: 'none',
    },
  },
  avatar: {
    width: 40,
    height: 40,
  },
});
const Header = ({
  toggleMobileSideBar,
  handleMenu,
  handleClose,
  login,
  anchorEl,
  classes,
  theme,
  userInfo,
  isLogin,
  logout,
  mobileSideBar,
}) => {
  const open = Boolean(anchorEl);
  const { name, email, thumbnail } = userInfo.toJS();
  return (
    <AppBar className={classes.appBar}>
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={toggleMobileSideBar}
          className={classes.navIconHide}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="title" color="inherit" className={classes.flex}>
          PLAYLIST
        </Typography>
        {isLogin
          ? (
            <div>
              {name}님
              <IconButton
                onClick={handleMenu}
              >
                <Avatar
                  alt="profile image"
                  src={thumbnail}
                  className={classes.avatar}
                />
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
                transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
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
