import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import SendIcon from '@mui/icons-material/Send';
import SearchIcon from '@mui/icons-material/Search';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';

function getButtonColor(color) {
    if (color === '#009F58') {return '#838385';}
    else if (color === 'yellow') {return '#e6e600';}
    else {return color;}
}

function getButtonColorOnHover(color) {
    if (color === 'yellow') {return '#f2f21d';}
    else if (color === 'orange') {return '#ffb84d';}
    else if (color === '#E50000') {return '#ff3e3e';}
    else if (color === '#303515') {return '#525b25';}
    else {return '#838385';}
}

export const OperationsDialog = ({ selectedZone, open, onSubmit, onSearch, onSeeAlert, onClose }) => {

    const handleSubmit = () => { onSubmit(); };
    const handleSearch = () => { onSearch(); };
    const handleSeeAlert = () => { onSeeAlert(); };
    const handleClose = () => { onClose(); };

    
    
    return (
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="operations-dialog-title"
        aria-describedby="operations-dialog-description"
        sx={{width: '100%', height: '100%'}}
      >
        <DialogActions sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>

         <Button 
             startIcon={<SendIcon />}
             onClick={handleSubmit} 
             color="success" 
             sx={{backgroundColor: "#009f58", color: "white", '&:hover': {backgroundColor: "#00b463"}, width: '100%', height: '70px', marginBottom: 1.1, fontSize: '16px' }}>
             Докладвай
          </Button>

          <Button 
             startIcon={<SearchIcon />}
             onClick={handleSearch} 
             color="error" 
             sx={{backgroundColor: "#009f58", color: "white", '&:hover': {backgroundColor: "#00b463"}, width: '100%', height: '70px', marginBottom: 1.1, marginLeft: '0% !important', fontSize: '17px'  }}>
             Търси
          </Button>

          <Button 
             startIcon={<ReportProblemIcon />}
             onClick={handleSeeAlert} 
             color="error"
             disabled={selectedZone.color === '#009F58' ? true : false} 
             sx={{backgroundColor: getButtonColor(selectedZone.color), color: "white", '&:hover': {backgroundColor: getButtonColorOnHover(selectedZone.color)}, width: '100%', height: '70px', marginLeft: '0% !important' }}>
             Виж предупреждение за опасност
          </Button>

        </DialogActions>
      </Dialog>
    );
}