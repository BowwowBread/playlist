import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import ListSubheader from '@material-ui/core/ListSubheader';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';
import { PlayListBox } from 'components/common';

const styles = theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
  },
  gridList: {
    transform: 'translateZ(0)',
    paddingBottom: '50px',
  },
  icon: {
    color: 'rgba(255, 255, 255, 0.54)',
  },
  box: {
    paddingBottom: '50px',
  },
});

const CategoryList = ({
  playLists, classes, handlePlayer, category,
}) => {
  return (
    <div className={classes.root}>
      <GridList className={classes.gridList} cols={3.3}>
        <GridListTile key="Subheader" cols={3} style={{ height: 'auto' }}>
          <ListSubheader component="div">{category}</ListSubheader>
        </GridListTile>
        {playLists.map(playList => (
          <PlayListBox playList={playList} classes={classes} className={classes.box} handlePlayer={handlePlayer} />
        ))}
      </GridList>
    </div>
  );
};

export default withStyles(styles)(CategoryList);
