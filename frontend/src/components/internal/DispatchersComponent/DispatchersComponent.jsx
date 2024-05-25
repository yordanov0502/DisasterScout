import { ComponentLoader } from "../../Loaders/ComponentLoader";
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { IconButton, Pagination } from "@mui/material";
import LockIcon from '@mui/icons-material/Lock';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import EditLocationAltIcon from '@mui/icons-material/EditLocationAlt';
import DeleteIcon from '@mui/icons-material/Delete';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import "./dispatchers_component.scss";

export const DispatchersComponent = ({status,
                                      isLoadingComponent,
                                      handlePageChange,
                                      pageNumber,
                                      pages,
                                      rows,   
                                      handleOpenLockDialog,
                                      handleOpenUnlockDialog,
                                      handleOpenUpdateZonesDialog,
                                      handleOpenDeleteDialog}) => {

    const getStatusDivName = (status) => {
        switch(status) {
          case 'ACTIVE':
            return 'dispatchers_component__active';
          case 'LOCKED':
            return 'dispatchers_component__locked';
          default:
            return 'dispatchers_component__active';
        }
    }

    const getStatusValue = (status) => {
        switch(status) {
          case 'ACTIVE':
            return 'Активен';
          case 'LOCKED':
            return 'Заключен';
          default:
            return 'Активен';
        }
    }

    const getActivityDivName = (activity) => {
        switch(activity) {
          case 'ONLINE':
            return 'dispatchers_component__online';
          case 'OFFLINE':
            return 'dispatchers_component__offline';
          default:
            return 'dispatchers_component__offline';
        }
    }

    const getActivityValue = (activity) => {
        switch(activity) {
          case 'ONLINE':
            return 'Онлайн';
          case 'OFFLINE':
            return 'Офлайн';
          default:
            return 'Офлайн';
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

      const GreenTooltip = styled(({ className, ...props }) => (
        <Tooltip {...props} classes={{ popper: className }} />
      ))(({ theme }) => ({
        [`& .${tooltipClasses.tooltip}`]: {
          backgroundColor: '#009f58',
          fontSize: theme.typography.pxToRem(13),
          boxShadow: theme.shadows[2],    
        },
        [`& .${tooltipClasses.arrow}`]: {
          color: '#009f58',
        }
      }));

      const RedTooltip = styled(({ className, ...props }) => (
        <Tooltip {...props} classes={{ popper: className }} />
      ))(({ theme }) => ({
        [`& .${tooltipClasses.tooltip}`]: {
          backgroundColor: '#e50000',
          fontSize: theme.typography.pxToRem(13),
          boxShadow: theme.shadows[2],    
        },
        [`& .${tooltipClasses.arrow}`]: {
          color: '#e50000',
        }
      }));

      const BlueTooltip = styled(({ className, ...props }) => (
        <Tooltip {...props} classes={{ popper: className }} />
      ))(({ theme }) => ({
        [`& .${tooltipClasses.tooltip}`]: {
          backgroundColor: '#101cc0',
          fontSize: theme.typography.pxToRem(13),
          boxShadow: theme.shadows[2],    
        },
        [`& .${tooltipClasses.arrow}`]: {
          color: '#101cc0',
        }
      }));
      

  if(isLoadingComponent)
  {
   return (
      <div className="dispatchers_component">
        <div className="dispatchers_component__loader-box">
          <ComponentLoader />
        </div>
      </div>
    );
  }
  
  return (
    <div className="dispatchers_component">

    <div className="dispatchers_component__header">
     {/*this is div is empty because it was previously used for button about addDispatcherDialog*/}
    </div>
    
    <TableContainer component={Paper}>
      <Table stickyHeader sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="center">Номер</StyledTableCell>
            <StyledTableCell align="center">Име</StyledTableCell>
            <StyledTableCell align="center">Имейл адрес</StyledTableCell>
            <StyledTableCell align="center">Потребителско име</StyledTableCell>
            <StyledTableCell align="center">Статус</StyledTableCell>
            <StyledTableCell align="center">Активност</StyledTableCell>
            <StyledTableCell align="center">Действия</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {
            status !== 'error' && rows.length > 0 ?
            (
              rows.map((row) => (
                <StyledTableRow key={row.id}>
                  <StyledTableCell align="center" component="th" scope="row">{row.number}</StyledTableCell>
                  <StyledTableCell align="center">{row.name}</StyledTableCell>
                  <StyledTableCell align="center">{row.email}</StyledTableCell>
                  <StyledTableCell align="center">{row.username}</StyledTableCell>
                  <StyledTableCell align="center"><span className={getStatusDivName(row.status)}>{getStatusValue(row.status)}</span></StyledTableCell>
                  <StyledTableCell align="center"><span className={getActivityDivName(row.activity)}>{getActivityValue(row.activity)}</span></StyledTableCell>
                  <StyledTableCell align="center">
                    {row.status === 'ACTIVE' ? 
                    <RedTooltip title="Заключи акаунт" arrow ><IconButton aria-label="lock" onClick={() => handleOpenLockDialog(row.id)}><LockOpenIcon color="success" /></IconButton></RedTooltip> : 
                    <GreenTooltip title="Отключи акаунт" arrow><IconButton aria-label="unlock" onClick={() => handleOpenUnlockDialog(row.id)}><LockIcon sx={{color: '#e50000'}} /></IconButton></GreenTooltip>}
                    <BlueTooltip title="Актуализирай области" arrow><IconButton aria-label="edit-zones" onClick={() => handleOpenUpdateZonesDialog(row.id, row.availableZoneIds)}><EditLocationAltIcon sx={{color: '#101cc0'}} /></IconButton></BlueTooltip>
                    <RedTooltip title="Изтрий акаунт" arrow><IconButton aria-label="delete" onClick={() => handleOpenDeleteDialog(row.id)}><DeleteIcon sx={{color: '#e50000'}} /></IconButton></RedTooltip>
                    </StyledTableCell>
                </StyledTableRow>
              ))
            ) :
            ( 
              <StyledTableRow>
              <StyledTableCell align="center" colSpan={7}>
                Няма информация
              </StyledTableCell>
            </StyledTableRow>
            ) 
          }
        </TableBody>
      </Table>
    </TableContainer>


    <div className="dispatchers_component__footer">
    <Pagination page={pageNumber} count={pages} onChange={handlePageChange} size="large" color="success" shape="rounded"  />
    </div>

    

    </div>
  );
};