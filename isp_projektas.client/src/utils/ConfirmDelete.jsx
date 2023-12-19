import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function DeleteDialog({deleteFunc, deleteID}) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Button  onClick={handleClickOpen}>
        Pašalinti restoraną
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Tikrai norite pašalinti restoraną?"}
        </DialogTitle>
       
        <DialogActions>
          <Button onClick={() => {handleClose(), deleteFunc(deleteID)}}>Taip</Button>
          <Button onClick={handleClose} autoFocus>
            Ne
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}