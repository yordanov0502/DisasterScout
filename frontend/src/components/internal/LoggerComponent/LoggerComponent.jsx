import { ComponentLoader } from "../../Loaders/ComponentLoader";
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import { TextField } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import "./logger_component.scss";

export const LoggerComponent = ({isLoading,rows}) => {
 
    const getLevelDivName = (level) => {
        switch(level) {
          case 'INFO':
            return 'logger_component__info';
          case 'WARN':
            return 'logger_component__warning';
          case 'ERROR':
            return 'logger_component__error';
          default:
            return 'logger_component__info';
        }
    }

    const getLevelValue = (level) => {
        switch(level) {
          case 'INFO':
            return 'Информация';
          case 'WARN':
            return 'Предупреждение';
          case 'ERROR':
            return 'Внимание';
          default:
            return 'Информация';
        }
    }

    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
          backgroundColor: '#009f58',
          color: theme.palette.common.white,
        },
        [`&.${tableCellClasses.body}`]: {
          fontSize: 14,
        },
      }));
      
      const StyledTableRow = styled(TableRow)(({ theme }) => ({
        '&:nth-of-type(odd)': {
          backgroundColor: theme.palette.action.hover,
        },
        // hide last border
        '&:last-child td, &:last-child th': {
          border: 0,
        },
      }));
      

    if(isLoading)
    {
    return (
      <div className="logger_component">
        <div className="logger_component__loader-box">
          <ComponentLoader />
        </div>
      </div>
    );
    }
  
  return (
    <div className="logger_component">

    <div className="logger_component__heading">
     
    <div className="logger_component__heading__level-filter">
    <FormControl sx={{mb: 6, top: 23}}>
      <RadioGroup
        row
        aria-labelledby="logger-row-radio-buttons-group-label"
        name="logger-row-radio-buttons-group"
        defaultValue="ALL"
      >
        <FormControlLabel value="ALL" control={<Radio color="success" />} label="Всички" />
        <FormControlLabel value="INFO" control={<Radio color="primary" />} label="Информация" />
        <FormControlLabel value="WARN" control={<Radio color="warning"/>} label="Предупреждение" />
        <FormControlLabel value="ERROR" control={<Radio color="error"/>} label="Внимание" />
      </RadioGroup>
    </FormControl>
    </div>

    <div className="logger_component__heading__user-filter">
      <div className="logger_component__heading__user-filter__username-container">
        <TextField sx={{top: 9}}
           name="username" //! MUST MATCH WITH THE RELATED useState username from CmsLoggerPage
           required
           fullWidth
           label="Потребителско име"
           variant="outlined"
           color="success"
           margin="dense"
           // error={usernameError}
           // value={username}
           // onChange={handleUsernameInput}
           />
      </div>
    </div>

    <div className="logger_component__heading__button1">
    <button className="logger_component__heading__button1__search" /*disabled={isRequestSent} onClick={onPressClearMyCache}*/><SearchIcon/></button>
    </div>
    
    
    <div className="logger_component__heading__button2">
    <button className="logger_component__heading__button2__clear" /*disabled={isRequestSent} onClick={onPressClearMyCache}*/><ClearIcon/></button>
    </div>
    

    </div>


    <TableContainer component={Paper}>
      <Table stickyHeader sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="center">Номер</StyledTableCell>
            <StyledTableCell align="center">Действие</StyledTableCell>
            <StyledTableCell align="center">Степен</StyledTableCell>
            <StyledTableCell align="center">Дата и час</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <StyledTableRow key={row.number}>
              <StyledTableCell align="center" component="th" scope="row">{row.number}</StyledTableCell>
              <StyledTableCell align="left">{row.action}</StyledTableCell>
              <StyledTableCell align="center"><label className={getLevelDivName(row.level)}>{getLevelValue(row.level)}</label></StyledTableCell>
              <StyledTableCell align="center">{row.dateTime}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>

    </div>
  );
};