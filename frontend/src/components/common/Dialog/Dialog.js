import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import {
  Checkbox,
  ListItemText,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  InputLabel,
  Input,
  MenuItem,
  FormControl,
  Select,
} from '@material-ui/core';
import { toJS } from 'immutable';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 250,
  },
});

const Dialog_ = ({
  onChange,
  list,
  value,
  open,
  onClose,
  classes,
  sharePlayList,
  playList,
}) => {
  return (
    <div>
      <Dialog disableBackdropClick disableEscapeKeyDown open={open} onClose={onClose}>
        <DialogTitle>{playList.get('title') } 앨범 공유</DialogTitle>
        <DialogContent>
          <form className={classes.container}>
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="select-multiple-checkbox">카테고리 선택: </InputLabel>
              <Select
                multiple
                value={value}
                onChange={onChange}
                input={<Input id="select-multiple-checkbox" />}
                renderValue={selected => selected.join(', ')}
              >
                {list.map(item => (
                  <MenuItem key={item} value={item}>
                    <Checkbox checked={value.indexOf(item) > -1} />
                    <ListItemText primary={item} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="primary">
            취소하기
          </Button>
          <Button onClick={sharePlayList} color="primary">
            공유하기
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default withStyles(styles)(Dialog_);
