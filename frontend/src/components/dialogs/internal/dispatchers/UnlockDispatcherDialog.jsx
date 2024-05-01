import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export const UnlockDispatcherDialog = ({ open, onAgree, onDisagree }) => {

    const handleAgree = () => { onAgree(); };
    const handleClose = () => { onDisagree(); };
   
    return (
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="unlock-dispatcher-dialog-title"
        aria-describedby="unlock-dispatcher-dialog-description"
      >
        <DialogTitle id="unlock-dispatcher-dialog-title">{"Наистина ли искате да отключите акаунта на избрания диспечер ?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="unlock-dispatcher-dialog-description">
            Ако отключите акаунта на посочения от вас диспечер, той ще разполага
            отново с пълен достъп до системата.  
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ justifyContent: 'center' }}>
          <Button 
             onClick={handleAgree} 
             color="success" 
             sx={{backgroundColor: "#009f58", color: "white", '&:hover': {backgroundColor: "#00b463"} }}>
             Да
          </Button>
          <Button 
             onClick={handleClose} 
             color="error" 
             sx={{backgroundColor: "#e50000", color: "white", '&:hover': {backgroundColor: "#ff3e3e"} }}>
             Не
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
  