import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export const DeleteDispatcherDialog = ({ open, onAgree, onDisagree }) => {

    const handleAgree = () => { onAgree(); };
    const handleClose = () => { onDisagree(); };
    
    return (
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="delete-dispatcher-dialog-title"
        aria-describedby="delete-dispatcher-dialog-description"
      >
        <DialogTitle id="delete-dispatcher-dialog-title">{"Наистина ли искате да премахнете акаунта на избрания диспечер ?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="delete-dispatcher-dialog-description">
            Ако премахнете посочения от вас диспечер, информацията за неговия акаунт ще бъде изтрита 
            заедно с кешираните му данни и повече няма да има достъп до системата. Въпреки това, 
            действията му фигуриращи в системния логър ще останат наличи за срок от 7 дни, но 
            няма да бъдат откриваеми по потребителското му име.
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
  