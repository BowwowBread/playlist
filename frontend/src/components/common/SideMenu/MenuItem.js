import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import HomeIcon from '@material-ui/icons/Home';
import MusicIcon from '@material-ui/icons/QueueMusic';
import TrendingIcon from '@material-ui/icons/TrendingUp';
import GameIcon from '@material-ui/icons/Games';
import HumorIcon from '@material-ui/icons/ChildCare';
import EduIcon from '@material-ui/icons/AccountBalance';
import StarIcon from '@material-ui/icons/Star';
import MyListIcon from '@material-ui/icons/List';

const MenuItem = () => {
  return (
    <div>
      <Divider />
      <ListItem button>
        <ListItemIcon>
          <HomeIcon />
        </ListItemIcon>
        <ListItemText primary="홈" />
      </ListItem>
      <ListItem button>
        <ListItemIcon>
          <TrendingIcon />
        </ListItemIcon>
        <ListItemText primary="인기" />
      </ListItem>
      <ListSubheader component="div">카테고리</ListSubheader>
      <ListItem button>
        <ListItemIcon>
          <MusicIcon />
        </ListItemIcon>
        <ListItemText primary="음악" />
      </ListItem>
      <ListItem button>
        <ListItemIcon>
          <GameIcon />
        </ListItemIcon>
        <ListItemText primary="게임" />
      </ListItem>
      <ListItem button>
        <ListItemIcon>
          <HumorIcon />
        </ListItemIcon>
        <ListItemText primary="유머" />
      </ListItem>
      <ListItem button>
        <ListItemIcon>
          <EduIcon />
        </ListItemIcon>
        <ListItemText primary="교육" />
      </ListItem>
      <ListSubheader component="div">내 라이브러리</ListSubheader>
      <ListItem button>
        <ListItemIcon>
          <MyListIcon />
        </ListItemIcon>
        <ListItemText primary="내 재생목록" />
      </ListItem>
      <ListItem button>
        <ListItemIcon>
          <StarIcon />
        </ListItemIcon>
        <ListItemText primary="즐겨찾기" />
      </ListItem>
    </div>
  );
};

export default MenuItem;
