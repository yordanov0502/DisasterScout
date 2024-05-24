import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export const ReportWithoutImageDialog = ({ open, onAgree, onDisagree }) => {

    const handleAgree = () => { onAgree(); };
    const handleClose = () => { onDisagree(); };
    
    return (
      <Dialog
        //fullScreen
        open={open}
        onClose={handleClose}
        aria-labelledby="submit-report-without-image-dialog-title"
        aria-describedby="submit-report-without-image-dialog-description"
      >
        <DialogTitle id="submit-report-without-image-dialog-title">{"Наистина ли искате да изпратите сигнал за бедствиe или авария без снимка ?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="submit-report-without-image-dialog-description">
            Препоръчително е към всеки един сигнал за бедствие или авария да бъде
            прикачена снимка за повече яснота. Всички сигнали се разглеждат подробно 
            от диспечери преди да бъдат публикувани публично.
            Снимките помагат на диспечерите да преценят сериозността и достоверността
            на подадения сигнал.
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
  