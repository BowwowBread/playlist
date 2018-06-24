import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import { ListItem, Divider, ListItemIcon, ListItemText, ListSubheader } from '@material-ui/core';
import { Home, QueueMusic, TrendingUp, Games, ChildCare, AccountBalance, Star, List } from '@material-ui/icons';

const styles = theme => ({
  active: {
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
  },
});

const GuestMenu = ({ classes, isPlayerOpen }) => {
  return (
    <div>
      <Divider />
      <ListItem button component={NavLink} to="/">
        <ListItemIcon>
          <Home />
        </ListItemIcon>
        <ListItemText primary="홈" />
      </ListItem>
      <ListItem button component={NavLink} to="/trend" activeClassName={classes.active}>
        <ListItemIcon>
          <TrendingUp />
        </ListItemIcon>
        <ListItemText primary="인기" />
      </ListItem>
      { !isPlayerOpen ? <ListSubheader component="div">카테고리</ListSubheader> : null}
      <ListItem button component={NavLink} to="/category/music" activeClassName={classes.active}>
        <ListItemIcon>
          <QueueMusic />
        </ListItemIcon>
        <ListItemText primary="음악" />
      </ListItem>
      <ListItem button component={NavLink} to="/category/game" activeClassName={classes.active}>
        <ListItemIcon>
          <Games />
        </ListItemIcon>
        <ListItemText primary="게임" />
      </ListItem>
      <ListItem button component={NavLink} to="/category/humor" activeClassName={classes.active}>
        <ListItemIcon>
          <ChildCare />
        </ListItemIcon>
        <ListItemText primary="유머" />
      </ListItem>
      <ListItem button component={NavLink} to="/category/edu" activeClassName={classes.active}>
        <ListItemIcon>
          <AccountBalance />
        </ListItemIcon>
        <ListItemText primary="교육" />
      </ListItem>
    </div>
  );
};

const UserMenu = ({ classes, isPlayerOpen }) => {
  console.log(isPlayerOpen);
  return (
    <div>
      <Divider />
      <ListItem button component={NavLink} to="/">
        <ListItemIcon>
          <Home />
        </ListItemIcon>
        <ListItemText primary="홈" />
      </ListItem>
      <ListItem button component={NavLink} to="/trend" activeClassName={classes.active}>
        <ListItemIcon>
          <TrendingUp />
        </ListItemIcon>
        <ListItemText primary="인기" />
      </ListItem>
      { !isPlayerOpen ? <ListSubheader component="div">카테고리</ListSubheader> : null}
      <ListItem button component={NavLink} to="/category/music" activeClassName={classes.active}>
        <ListItemIcon>
          <QueueMusic />
        </ListItemIcon>
        <ListItemText primary="음악" />
      </ListItem>
      <ListItem button component={NavLink} to="/category/game" activeClassName={classes.active}>
        <ListItemIcon>
          <Games />
        </ListItemIcon>
        <ListItemText primary="게임" />
      </ListItem>
      <ListItem button component={NavLink} to="/category/humor" activeClassName={classes.active}>
        <ListItemIcon>
          <ChildCare />
        </ListItemIcon>
        <ListItemText primary="유머" />
      </ListItem>
      <ListItem button component={NavLink} to="/category/edu" activeClassName={classes.active}>
        <ListItemIcon>
          <AccountBalance />
        </ListItemIcon>
        <ListItemText primary="교육" />
      </ListItem>
      { !isPlayerOpen ? <ListSubheader component="div">내 라이브러리</ListSubheader> : null }
      <ListItem button component={NavLink} to="/mylist" activeClassName={classes.active}>
        <ListItemIcon>
          <List />
        </ListItemIcon>
        <ListItemText primary="내 재생목록" />
      </ListItem>
      <ListItem button component={NavLink} to="/like" activeClassName={classes.active}>
        <ListItemIcon>
          <Star />
        </ListItemIcon>
        <ListItemText primary="즐겨찾기" />
      </ListItem>
    </div>
  );
};

const MenuItem = ({ isLogin, classes, isPlayerOpen }) => {
  return isLogin ? <UserMenu classes={classes} isPlayerOpen={isPlayerOpen} /> : <GuestMenu classes={classes} isPlayerOpen={isPlayerOpen} />;
};

export default withStyles(styles)(MenuItem);
