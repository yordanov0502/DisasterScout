import { ComponentLoader } from "../../Loaders/ComponentLoader";
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import "./logger_component.scss";

export const LoggerComponent = ({rows}) => {
 
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
      

    if(false)
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
