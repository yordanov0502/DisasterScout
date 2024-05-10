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
import { Pagination, TextField } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import "./logger_component.scss";

export const LoggerComponent = ({status,
                                 isLoadingComponent,
                                 handlePageChange,
                                 pageNumber,
                                 handleLevelChange,
                                 level,
                                 pages,
                                 rows,
                                 username,
                                 usernameError,
                                 handleUsernameInput,
                                 onPressSearchByUsername,
                                 onPressClearSearchByUsername}) => {

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
          backgroundColor: '#f2f2f2',
        },
        '&:last-child td, &:last-child th': {
          border: 0,
        },
        '&:hover': {
          backgroundColor: '#b5ffcc',
        },
        '@media (pointer: coarse)': {
          '&:hover': {
              backgroundColor: 'inherit', //? Disables hover color on even rows on mobile devices 
          },
          '&:nth-of-type(odd)': {
              backgroundColor: '#f2f2f2', //? Disables hover color on odd rows on mobile devices
          }
      }
      }));
      

    if(isLoadingComponent)
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

    <div className="logger_component__header">
     
    <div className="logger_component__header__level-filter">
    <FormControl sx={{mb: 6, top: 23}}>
      <RadioGroup
        id="logger-buttons-radio-group"
        row
        aria-labelledby="logger-row-radio-buttons-group-label"
        name="logger-row-radio-buttons-group"
        value={level}
        onChange={(event) => handleLevelChange(event.target.value)}
      >
        <FormControlLabel value="ALL" control={<Radio color="success" />} label="Всички" />
        <FormControlLabel value="INFO" control={<Radio color="primary" />} label="Информация" />
        <FormControlLabel value="WARN" control={<Radio color="warning"/>} label="Предупреждение" />
        <FormControlLabel value="ERROR" control={<Radio color="error"/>} label="Внимание" />
      </RadioGroup>
    </FormControl>
    </div>

    <div className="logger_component__header__user-filter">
      <TextField sx={{top: 9}}
          autoComplete="on"
          name="username" //! MUST MATCH WITH THE RELATED useState username from CmsLoggerPage
          required
          fullWidth
          label="Потребителско име"
          variant="outlined"
          color="success"
          margin="dense"
          error={usernameError}
          value={username}
          onChange={handleUsernameInput}
      />
    </div>

    <div className="logger_component__header__button1">
    <button className="logger_component__header__button1__search" disabled={isLoadingComponent} onClick={onPressSearchByUsername}><SearchIcon/></button>
    </div>
    
    <div className="logger_component__header__button2">
    <button className="logger_component__header__button2__clear" disabled={isLoadingComponent} onClick={onPressClearSearchByUsername}><ClearIcon/></button>
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
          {
            status !== 'error' && rows.length > 0 ?
            (
              rows.map((row) => (
                <StyledTableRow key={row.number}>
                  <StyledTableCell align="center" component="th" scope="row">{row.number}</StyledTableCell>
                  <StyledTableCell align="left">{row.action}</StyledTableCell>
                  <StyledTableCell align="center"><span className={getLevelDivName(row.level)}>{getLevelValue(row.level)}</span></StyledTableCell>
                  <StyledTableCell align="center">{row.dateTime}</StyledTableCell>
                </StyledTableRow>
              ))
            ) :
            ( 
              <StyledTableRow>
              <StyledTableCell align="center" colSpan={4}>
                Няма информация
              </StyledTableCell>
            </StyledTableRow>
            ) 
          }
        </TableBody>
      </Table>
    </TableContainer>


    <div className="logger_component__footer">
    <Pagination page={pageNumber} count={pages} onChange={handlePageChange} size="large" color="success" shape="rounded"  />
    </div>

    

    </div>
  );
};