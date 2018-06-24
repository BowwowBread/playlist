import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { GridList, GridListTile, ListSubheader } from '@material-ui/core';
import { PlayListBox } from 'components/common';
import { toJS } from 'immutable';

const styles = theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
  },
  gridList: {
    flexWrap: 'nowrap',
    transform: 'translateZ(0)',
    paddingBottom: '50px',
  },
});

// 메인페이지 세로크기, 타이틀명

function Home({ classes, playLists, handlePlayer }) {
  const musicPlayList = playLists.filter((playList) => {
    return playList
      .get('category')
      .includes('music');
  });

  const gamePlayList = playLists.filter((playList) => {
    return playList
      .get('category')
      .includes('game');
  });

  const humorPlayList = playLists.filter((playList) => {
    return playList
      .get('category')
      .includes('humor');
  });

  const eduPlayList = playLists.filter((playList) => {
    return playList
      .get('category')
      .includes('edu');
  });

  const Title = ({ title }) => (
    <GridListTile
      key="Subheader"
      cols={2}
      style={{
    height: 'auto',
  }}
    >
      <ListSubheader component="div">{title}</ListSubheader>
    </GridListTile>
  );

  return (
    <div className={classes.root}>
      <GridList className={classes.gridList} cols={2.5}>
        <Title title="음악" />
        {musicPlayList.map(playList => (<PlayListBox playList={playList} classes={classes} handlePlayer={handlePlayer} />))}
      </GridList>
      <GridList className={classes.gridList} cols={2.5}>
        <Title title="게임" />
        {gamePlayList.map(playList => (<PlayListBox playList={playList} classes={classes} handlePlayer={handlePlayer} />))}
      </GridList>
      <GridList className={classes.gridList} cols={2.5}>
        <Title title="유머" />
        {humorPlayList.map(playList => (<PlayListBox playList={playList} classes={classes} handlePlayer={handlePlayer} />))}
      </GridList>
      <GridList className={classes.gridList} cols={2.5}>
        <Title title="교육" />
        {eduPlayList.map(playList => (<PlayListBox playList={playList} classes={classes} handlePlayer={handlePlayer} />))}
      </GridList>
    </div>
  );
}

export default withStyles(styles)(Home);
