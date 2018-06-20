import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  CardMedia,
  ExpansionPanel,
  ExpansionPanelDetails,
  ExpansionPanelSummary,
} from '@material-ui/core';

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
});

let id = 0;
function createData(name, calories, fat, carbs, protein) {
  id += 1;
  return {
    id,
    name,
    calories,
    fat,
    carbs,
    protein,
  };
}

const data = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

const MyList = ({ classes, myPlayList }) => {
  return (
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell style={{ textAlign: 'center' }}>앨범</TableCell>
            <TableCell style={{ textAlign: 'center' }}>제목</TableCell>
            <TableCell style={{ textAlign: 'center' }}>설명</TableCell>
            <TableCell style={{ textAlign: 'center' }}>날짜</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {myPlayList.map((playList, index) => {
            console.log(playList);
            const key = index;
            const src = `http://www.youtube.com/embed?listType=playlist&list=${playList.get('id')}&autoplay=1`;
            const date = new Date(playList.get('date'));
            return (
              <TableRow key={key}>
                <TableCell style={{ textAlign: 'center' }}>
                  <iframe
                    title={playList.title}
                    width="50%"
                    height="100%"
                    src={src}
                    frameBorder="0"
                    allowFullScreen
                  />
                </TableCell>
                <TableCell style={{ textAlign: 'center' }}>{playList.get('title')}</TableCell>
                <TableCell style={{ textAlign: 'center' }}>{playList.get('description')}</TableCell>
                <TableCell style={{ textAlign: 'center' }}>{date.getFullYear() + '년' + date.getMonth() + '월' + date.getDate() + '일'}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </Paper>
  );
};

export default withStyles(styles)(MyList);
