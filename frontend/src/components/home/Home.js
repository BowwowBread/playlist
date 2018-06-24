import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { GridList } from '@material-ui/core';
import { PlayListBox } from 'components/common';

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    flexWrap: 'nowrap',
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: 'translateZ(0)',
  },
});

function Home({ classes, playLists, handlePlayer }) {
  return (
    <div className={classes.root}>
      <GridList className={classes.gridList} cols={2.5}>
        {playLists.map(playList => (
          <PlayListBox playList={playList} classes={classes} handlePlayer={handlePlayer} />
        ))}
      </GridList>
    </div>
  );
}

export default withStyles(styles)(Home);
