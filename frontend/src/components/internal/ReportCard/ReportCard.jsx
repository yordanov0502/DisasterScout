import { styled } from '@mui/material/styles';
import { Card, CardContent, CardHeader, CardMedia, Chip, Divider } from "@mui/material";
import WarningIcon from '@mui/icons-material/Warning';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PlaceIcon from '@mui/icons-material/Place';
import { getLabelOfIssue } from "../../../services/reportService";
import { getColorOfSeverityType, getLabelOfSeverityType } from "../../../services/severityService";

const ClickableDiv = styled('div')({
  cursor: 'pointer',
  '&:hover': {
    boxShadow: '0 5px 15px rgba(0, 0, 0, 0.2)',
  },
});

//! must navigate to reportPageInfo where the reportId will have to be passed to the url of the page before loading it
const handleCardClick = () => {
    //TODO: perform navigation to page for report info passing the report id as search param
    console.log("Card clicked!");
  };

const noImageUrl = "src/assets/images/no-photo.png";

export const ReportCard = ({ row }) => (
  <ClickableDiv onClick={handleCardClick} key={row.id}>
    <Card sx={{ width: 350, height: 395, backgroundColor: '#e0e0e0', boxShadow: 5 }}>
      <CardHeader
        sx={{
          mt: -1.5,
          '& .MuiCardHeader-title': {
            fontSize: '1.3rem',
            fontWeight: 'bold',
            display: 'flex',
            justifyContent: 'center', 
            width: '100%',
            color: 'red'
          },
          '& .MuiCardHeader-subheader': {
            fontSize: '1rem', 
            color: 'black'
          },
        }}
        title={getLabelOfIssue(row.issue)}
      />
      <CardMedia
        sx={{mt: -1.5, mb: -1.5, backgroundSize: 'cover', backgroundPosition: 'center'}}
        component="img"
        height="190"
        image={row.imageUrl || noImageUrl}
        alt=""
      />
      <CardContent>
        <span style={{ fontSize: '1rem', color: 'black',display: 'flex', alignItems: 'center' }}>
        <WarningIcon fontSize="small" sx={{mr: 0.5 }} /> 
         {"Ниво на опасност:"} <Chip sx={{marginTop: -0.2, marginLeft: 0.5, backgroundColor: getColorOfSeverityType(row.severityType), color: 'white'}} size="small" label={getLabelOfSeverityType(row.severityType)} />
        </span>
        <Divider sx={{mt: 0.4, mb: 0.4}} />
        <span className="truncated-text"  style={{ fontSize: '1rem', color: 'black',display: 'flex', alignItems: 'center' }}>
        <AccessTimeIcon fontSize="small" sx={{mr: 0.5 }} />
         {"Докладвано в: "+row.submittedAt}
        </span>
        <Divider sx={{mt: 0.4, mb: 0.4}} />
        <span className="truncated-text" style={{ fontSize: '1rem', color: 'black',display: 'flex', alignItems: 'center' }}>
        <AccessTimeIcon fontSize="small" sx={{mr: 0.5 }} />
         {"Актуално до: "+row.expiresAt}
        </span>
        <Divider sx={{mt: 0.4, mb: 0.4}} />
        <span className="truncated-text" style={{ fontSize: '0.8rem', color: 'blue',display: 'flex', alignItems: 'center' }}>
        <PlaceIcon fontSize="small" sx={{mr: 0.5 }} />
         {"Локация: "+row.address}
        </span>
        <Divider sx={{mt: 0.4, mb: 0.4}} />
        <span className="truncated-description" style={{ fontSize: '0.8rem', color: '#474747' }}>
         {row.description}
        </span>
      </CardContent>
    </Card>
  </ClickableDiv>
);
