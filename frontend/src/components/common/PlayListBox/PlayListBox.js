import React from 'react';
import { GridListTile, GridListTileBar, IconButton } from '@material-ui/core';
import { StarBorder } from '@material-ui/icons';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  title: {
    color: theme.palette.primary.light,
  },
  titleBar: {
    background:
      'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
  },
});
const PlayListBox = ({ playList, classes, handlePlayer }) => {
  return (
    <GridListTile key={playList.get('id')} style={{ cursor: 'pointer' }} onClick={() => handlePlayer(playList.toJS())}>
      <img src={playList.get('thumbnail')} alt={playList.get('title')} />
      <GridListTileBar
        title={playList.get('title')}
        classes={{
                root: classes.titleBar,
                title: classes.title,
              }}
        actionIcon={
          <IconButton>
            <StarBorder className={classes.title} />
          </IconButton>
              }
      />
    </GridListTile>
  );
};

export default withStyles(styles)(PlayListBox);
