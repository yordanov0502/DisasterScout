import { useEffect, useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import Checkbox from '@mui/material/Checkbox';
import Divider from '@mui/material/Divider';
import { getNonMatchingZones, getZoneById } from "../../../../services/zoneService";

export const UpdateDispatcherZonesDialog = ({ open, onAgree, onDisagree, initialZones }) => {
    const [checked, setChecked] = useState([]);
    const [left, setLeft] = useState([]);
    const [right, setRight] = useState([]);

    useEffect(() => {
        setLeft(getNonMatchingZones(initialZones));
        setRight(initialZones);
    }, [initialZones]);

    const handleToggle = (value) => () => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];
        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }
        setChecked(newChecked);
    };

    const handleCheckedRight = () => {
        const newRight = right.concat(checked.filter(value => left.includes(value)));
        setRight(newRight); 
        setLeft(left.filter(value => !checked.includes(value)));
        setChecked([]); 
    };
    
    const handleCheckedLeft = () => {
        const newLeft = left.concat(checked.filter(value => right.includes(value)));
        setLeft(newLeft); 
        setRight(right.filter(value => !checked.includes(value))); 
        setChecked([]); 
    };
    

    const customList = (title, items, listType) => (
        <Card sx={{ boxShadow: '2px 4px 10px 3px rgba(0, 0, 0, 0.2)', border: '1px solid #d0d6d1' }}>
            <CardHeader
                sx={{ px: 2, py: 1 }}
                avatar={
                    <Checkbox name={`select-all-zones-on-${listType}`}
                        onClick={() => {
                            const allChecked = items.length === items.filter(item => checked.includes(item)).length;
                            setChecked(allChecked ? checked.filter(x => !items.includes(x)) : [...checked, ...items.filter(x => !checked.includes(x))]);
                        }}
                        checked={items.length > 0 && items.every(value => checked.includes(value))}
                        indeterminate={items.some(value => checked.includes(value)) && !items.every(value => checked.includes(value))}
                        disabled={items.length === 0}
                        inputProps={{ 'aria-label': 'all items selected' }}
                    />
                }
                title={title}
                subheader={`${items.filter(value => checked.includes(value)).length}/${items.length} избрани`}
            />
            <Divider />
            <List
                sx={{
                    width: 200,
                    height: 230,
                    bgcolor: 'background.paper',
                    overflow: 'auto',
                    ...(listType === 'left' ? {
                        paddingLeft: '33px',
                    } : {
                        paddingRight: '33px',
                    })
                }}
                dense
                component="div"
                role="list"
            >
                {items.map((value) => (
                    <ListItemButton key={value} role="listitem" onClick={handleToggle(value)} 
                    sx={{
                        '& .MuiButtonBase-root': {
                            marginLeft: listType === 'left' ? '-33px' : '0px',  
                        },
                        '& .MuiListItemText-root': {
                            marginLeft: listType === 'left' ? '-33px' : '0px', 
                        }
                    }}>
                        <ListItemIcon>
                            <Checkbox 
                                id={value}
                                checked={checked.indexOf(value) !== -1}
                                tabIndex={-1}
                                disableRipple
                            />
                        </ListItemIcon>
                        <ListItemText primary={getZoneById(value)} />
                    </ListItemButton>
                ))}
            </List>
        </Card>
    );

    const handleAgree = () => { 
        onAgree(right);
        handleClose(); }; //? resets state(selected checkboxes)

    const handleClose = () => { 
        setLeft(getNonMatchingZones(initialZones)); 
        setRight(initialZones);
        setChecked([]);
        onDisagree(); };

    return (
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="update-dispatcher-zones-dialog-title"
        aria-describedby="update-dispatcher-zones-dialog-description"
        sx={{ '& .MuiDialog-paper': { width: '630px', maxWidth: 'none' } }}  
      >
        <DialogTitle id="update-dispatcher-zones-dialog-title" sx={{ textAlign: 'center' }}>{"Актуализиране на достъпните области за диспечер"}</DialogTitle>
        <DialogContent>
            <Grid container spacing={2} justifyContent="center" alignItems="center">
                <Grid item sx={{width:'250px'}}>{customList('Налични области', left, 'left')}</Grid>
                <Grid item>
                    <Grid container direction="column" alignItems="center">
                        <Button
                            sx={{ my: 0.5 }}
                            variant="outlined"
                            size="small"
                            onClick={handleCheckedRight}
                            disabled={left.filter(value => checked.includes(value)).length === 0}
                            aria-label="move selected right"
                        >
                            &gt;
                        </Button>
                        <Button
                            sx={{ my: 0.5 }}
                            variant="outlined"
                            size="small"
                            onClick={handleCheckedLeft}
                            disabled={right.filter(value => checked.includes(value)).length === 0}
                            aria-label="move selected left"
                        >
                            &lt;
                        </Button>
                    </Grid>
                </Grid>
                <Grid item>{customList('Области на диспечер', right, 'right')}</Grid>
            </Grid>
        </DialogContent>
        <DialogActions sx={{ justifyContent: 'center' }}>
          <Button 
             onClick={handleAgree} 
             color="success" 
             sx={{backgroundColor: "#009f58", color: "white", '&:hover': {backgroundColor: "#00b463"}}}>
             Актуализирай
          </Button>
          <Button 
             onClick={handleClose} 
             color="error" 
             sx={{backgroundColor: "#e50000", color: "white", width: '130px','&:hover': {backgroundColor: "#ff3e3e"}}}>
             Откажи
          </Button>
        </DialogActions>
      </Dialog>
    );
}
