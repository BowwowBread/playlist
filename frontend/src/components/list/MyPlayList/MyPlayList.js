import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import {
  Table,
  TableBody,
  TableHead,
  TableCell,
  TableRow,
  Paper,
  CircularProgress,
} from '@material-ui/core';
import { Share, Cancel } from '@material-ui/icons';
import { Button, Dialog } from 'components/common';
import { toJS } from 'immutable';

const styles = theme => ({
  root: {
    width: '90%',
    overflowX: 'auto',
    margin: '0 auto',
    marginTop: theme.spacing.unit * 3,
  },
  table: {
    minWidth: 700,
  },
});

const FailurePlayList = ({ classes }) => (
  <Table className={classes.table}>

    <TableBody>
      <TableRow>
        <TableCell style={{
          textAlign: 'center',
        }}
        >재생목록을 가져오는데 문제가 발생하였습니다.
        </TableCell>
      </TableRow>
    </TableBody>
  </Table>
);

const PendingPlaylist = ({ classes, pending }) => (
  <Table className={classes.table}>
    <TableBody>
      <TableRow>
        <TableCell style={{
          textAlign: 'center',
        }}
        >
          <CircularProgress size={50} />
        </TableCell>
      </TableRow>
    </TableBody>
  </Table>
);

const FetchPlayList = ({
  myPlayList,
  classes,
  categoryList,
  selectCategory,
  open,
  handleChange,
  handleClickOpen,
  handleClose,
  sharePlayList,
  selectPlayList,
  handlePlayer,
}) => (
  <Table className={classes.table}>
    <TableHead>
      <TableRow>
        <TableCell style={{
          textAlign: 'center',
        }}
        >앨범
        </TableCell>
        <TableCell style={{
          textAlign: 'center',
        }}
        >제목
        </TableCell>
        <TableCell style={{
          textAlign: 'center',
        }}
        >설명
        </TableCell>
        <TableCell style={{
          textAlign: 'center',
        }}
        >날짜
        </TableCell>
        <TableCell style={{
          textAlign: 'center',
        }}
        >공유
        </TableCell>
        <TableCell style={{
          textAlign: 'center',
        }}
        >카테고리
        </TableCell>
      </TableRow>
    </TableHead>
    {myPlayList.map((playList) => {
      let date = new Date(playList.get('date'));
      date = date.getFullYear() + '년' + date.getMonth() + '월' + date.getDate() + '일';
      return (
        <TableBody>
          <TableRow key={playList.get('id')} >
            <TableCell
              style={{
              textAlign: 'center',
              cursor: 'pointer',
            }}
              onClick={() => handlePlayer(playList.toJS())}
            >
              <img

                alt={playList.get('title')}
                width="50%"
                height="100%"
                src={playList.get('thumbnail')}
              />
            </TableCell>
            <TableCell style={{
              textAlign: 'center',
            }}
            >{playList.get('title')}
            </TableCell>
            <TableCell style={{
              textAlign: 'center',
            }}
            >{playList.get('description')}
            </TableCell>
            <TableCell style={{
              textAlign: 'center',
            }}
            >{date}
            </TableCell>
            <TableCell style={{
              textAlign: 'center',
            }}
            >{playList.get('shared')
                ? <Button isTooltip title="공유취소"><Cancel /></Button>
                : <Button onClick={() => handleClickOpen(playList)} isTooltip title="공유하기"><Share /></Button>
              }
              {open === true ?
                <Dialog
                  onChange={handleChange}
                  list={categoryList}
                  value={selectCategory}
                  open={open}
                  onClose={handleClose}
                  classes={classes}
                  sharePlayList={sharePlayList}
                  playList={selectPlayList}
                />
              : null
              }
            </TableCell>
            <TableCell style={{
              textAlign: 'center',
            }}
            >{playList.get('shared')
                ? playList.get('category').join(', ')
                : '재생목록을 공유해보세요!'}
            </TableCell>
          </TableRow>
        </TableBody>
      );
    })
}
  </Table>
);

const NotFoundPlayList = ({ classes }) => (
  <Table className={classes.table}>
    <TableBody>
      <TableRow>
        <TableCell style={{
          textAlign: 'center',
        }}
        >재생목록이 없습니다.
        </TableCell>
      </TableRow>
    </TableBody>
  </Table>
);

const SuccessPlayList = ({
  myPlayList,
  classes,
  categoryList,
  selectCategory,
  open,
  handleChange,
  handleClickOpen,
  handleClose,
  sharePlayList,
  selectPlayList,
  handlePlayer,
}) => {
  return (myPlayList.get(0).get('id') !== ''
    ? <FetchPlayList
      classes={classes}
      myPlayList={myPlayList}
      categoryList={categoryList}
      selectCategory={selectCategory}
      open={open}
      handleChange={handleChange}
      handleClickOpen={handleClickOpen}
      handleClose={handleClose}
      sharePlayList={sharePlayList}
      selectPlayList={selectPlayList}
      handlePlayer={handlePlayer}
    />
    : <NotFoundPlayList classes={classes} />);
};

const MyPlayList = ({
  classes,
  myPlayList,
  pending,
  success,
  failure,
  categoryList,
  selectCategory,
  open,
  handleChange,
  handleClickOpen,
  handleClose,
  sharePlayList,
  selectPlayList,
  handlePlayer,
}) => {
  return (
    <div className={classes.root}>
      {pending
        ? <PendingPlaylist classes={classes} pending={pending} />
        : null
}
      {success
        ? <SuccessPlayList
          classes={classes}
          myPlayList={myPlayList}
          categoryList={categoryList}
          selectCategory={selectCategory}
          open={open}
          handleChange={handleChange}
          handleClickOpen={handleClickOpen}
          handleClose={handleClose}
          sharePlayList={sharePlayList}
          selectPlayList={selectPlayList}
          handlePlayer={handlePlayer}
        />
        : null
}
      {failure
        ? <FailurePlayList classes={classes} />
        : null
}
    </div>
  );
};

export default withStyles(styles)(MyPlayList);
