import React from 'react';
import { ExpansionPanel, ExpansionPanelSummary, Typography, ExpansionPanelDetails } from '@material-ui/core';
import { ExpandMore } from '@material-ui/icons';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
});


const Player = ({ id, playerInfo, classes }) => {
  const src = `http://www.youtube.com/embed?listType=playlist&list=${id}&autoplay=1`;
  return (
    <div style={{ height: '100%' }}>
      <iframe
        src={src}
        width="100%"
        height="80%"
        title={playerInfo.get('channelTitle')}
        frameBorder="0"
        allow="autoplay; encrypted-media"
        allowFullScreen
      />
      <ExpansionPanel>
        <ExpansionPanelSummary expandIcon={<ExpandMore />}>
          <Typography className={classes.heading}>{playerInfo.get('title')}</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Typography>
            설명 - {playerInfo.get('description')}
          </Typography>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </div>
  );
};

export default withStyles(styles)(Player);
