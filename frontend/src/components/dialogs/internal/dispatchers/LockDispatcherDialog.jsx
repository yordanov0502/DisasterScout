import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export const LockDispatcherDialog = ({ open, onAgree, onDisagree }) => {

    const handleAgree = () => { onAgree(); };
    const handleClose = () => { onDisagree(); };
   
    return (
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="lock-dispatcher-dialog-title"
        aria-describedby="lock-dispatcher-dialog-description"
      >
        <DialogTitle id="lock-dispatcher-dialog-title">{"Наистина ли искате да заключите акаунта на избрания диспечер ?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="lock-dispatcher-dialog-description">
            Ако заключите акаунта на посочения от вас диспечер, той вече няма да има достъп  
            до системата, докато не отключите акаунта му обратно. Освен това, 
            ако диспечера в момента е влязъл в системата, то той ще бъде изхвърлен 
            при каквото и да било негово следващо действие.
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
  