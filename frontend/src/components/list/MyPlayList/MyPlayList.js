import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
  Paper,
  CircularProgress,
} from '@material-ui/core';

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
          <CircularProgress
            size={50}
          />
        </TableCell>
      </TableRow>
    </TableBody>
  </Table>
);

const FetchPlayList = ({ myPlayList, classes }) => (
  <Table className={classes.table}>
    {myPlayList.map((playList) => {
      /* const src = `http://www.youtube.com/embed?listType=playlist&list=${playList.get('id')}&autoplay=1`; */
      let date = new Date(playList.get('date'));
      date = date.getFullYear() + '년' + date.getMonth() + '월' + date.getDate() + '일';
      return (
        <TableBody>
          <TableRow key={playList.get('id')}>
            <TableCell style={{
              textAlign: 'center',
            }}
            >
              <img
                alt={playList.get('title')}
                width="50%"
                height="100%"
                src={playList.get('thumbnail')}
                // frameBorder="0"
                // allowFullScreen
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

const SuccessPlayList = ({ myPlayList, classes }) => {
  return (myPlayList.get(0).get('id') !== ''
    ? <FetchPlayList myPlayList={myPlayList} classes={classes} />
    : <NotFoundPlayList classes={classes} />);
};

const MyList = ({
  classes, myPlayList, pending, success, failure,
}) => {
  return (
    <div className={classes.root}>
      {
        pending
        ? <PendingPlaylist classes={classes} pending={pending} />
        : null
      }
      {
        success
        ? <SuccessPlayList classes={classes} myPlayList={myPlayList} />
        : null
      }
      {
        failure
        ? <FailurePlayList classes={classes} />
        : null
      }
    </div>
  );
};

export default withStyles(styles)(MyList);
