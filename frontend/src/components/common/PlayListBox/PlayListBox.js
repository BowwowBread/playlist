import React from 'react';
import { GridListTile, GridListTileBar, IconButton } from '@material-ui/core';
import { StarBorder } from '@material-ui/icons';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  title: {
    color: 'white',
  },
  titleBar: {
    background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 1' +
        '00%)',
  },
});
const PlayListBox = ({ playList, classes, handlePlayer }) => {
  return (
    <GridListTile
      key={playList.get('id')}
      style={{
      height: '200px',
      width: '250px',
      marginRight: '30px',
    }}
    >

      <img
        src={playList.get('thumbnail')}
        alt={playList.get('title')}
        style={{
        cursor: 'pointer',
      }}
        onClick={() => handlePlayer(playList.toJS())}
      />

      <GridListTileBar
        title={playList.get('title')}
        subtitle={<span > by : { playList.get('channelTitle')}</span>}
        actionIcon={
          <IconButton className={classes.icon} >
            <StarBorder className={classes.title} />
          </IconButton>}
      />
    </GridListTile>
  );
};

export default withStyles(styles)(PlayListBox);
