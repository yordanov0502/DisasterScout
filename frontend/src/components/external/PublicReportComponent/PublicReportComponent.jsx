import { Button, TextField } from "@mui/material";
import PlaceIcon from '@mui/icons-material/Place';
import { ComponentLoader } from "../../Loaders/ComponentLoader";
import { getLabelOfZoneById } from "../../../services/zoneService";
import { getBackgroundColorBySeverityColor, getColorOfSeverityType, getLabelOfSeverityType } from "../../../services/severityService";
import { getLabelOfIssue } from "../../../services/reportService";
import "./public_report_component.scss";

const noImageUrl = "src/assets/images/no-photo.png";

const textFieldSx = {
  backgroundColor: 'white',
  '& label.Mui-focused': {
    color: 'black',
  },
  '& .MuiInput-underline:after': {
    borderBottomColor: 'black',
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: 'black',
    },
    '&:hover fieldset': {
      borderColor: 'black',
    },
    '&.Mui-focused fieldset': {
      borderColor: 'black',
    },
  },
};

export const PublicReportComponent = ({   
                                        isLoadingComponent,
                                        reportForm, 
                                      }) => {

   
    if(isLoadingComponent)
    {
        return (
          <div className="public_report_component">
            <div className="public_report_component__loader-box">
              <ComponentLoader />
            </div>
          </div>
        );
    }
    
    else
    {

      const severityColor =  getColorOfSeverityType(reportForm.severity);

      return (
   
        <div className="public_report_component">
    
        <div className="public_report_component__container1">
    
         <img className="public_report_component__container1__image"
            src={reportForm.imageUrl || noImageUrl}
            alt={""} 
         />
    
         <div className="public_report_component__container1__wrapper1">
    
         <div className="public_report_component__container1__wrapper1__box1">

         <TextField
          sx={textFieldSx}
          autoComplete="off"
          id="issue-review-report"
          label="Бедствие / Авария"
          name="issue" //! MUST MATCH WITH THE RELATED KEY FROM ReportForm
          fullWidth
          margin="dense"
          focused
          value={getLabelOfIssue(reportForm.issue)}
          InputProps={{readOnly: true}}
         />

        <TextField
           sx={{
            backgroundColor: getBackgroundColorBySeverityColor(severityColor),
            '& label.Mui-focused': {
              color: 'black',
              backgroundColor: 'white'
            },
            '& .MuiInput-underline:after': {
              borderBottomColor: severityColor,
            },
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: severityColor,
              },
              '&:hover fieldset': {
                borderColor: severityColor,
              },
              '&.Mui-focused fieldset': {
                borderColor: severityColor,
              },
            },
            '& .MuiInputBase-input': {
              fontWeight: 'bold',
            }
          }}
          autoComplete="off"
          id="severity-review-report"
          label="Ниво на опасност"
          name="severity" //! MUST MATCH WITH THE RELATED KEY FROM ReportForm
          fullWidth
          margin="dense"
          focused
          value={getLabelOfSeverityType(reportForm.severity)}
          InputProps={{readOnly: true}}
        />
    
        <TextField
          sx={textFieldSx}
          autoComplete="off"
          id="submittedAt-review-report"
          label="Докладвано в"
          name="submittedAt" //! MUST MATCH WITH THE RELATED KEY FROM ReportForm
          fullWidth
          margin="dense"
          focused
          value={reportForm.submittedAt}
          InputProps={{readOnly: true}}
          />
        
        <TextField
          sx={textFieldSx}
          autoComplete="off"
          id="expiresAt-review-report"
          label="Актуално до"
          name="expiresAt" //! MUST MATCH WITH THE RELATED KEY FROM ReportForm
          fullWidth
          margin="dense"
          focused
          value={reportForm.expiresAt}
          InputProps={{readOnly: true}}
          />
 
    </div>
    
    <div className="public_report_component__container1__wrapper1__box2">

        <TextField
          sx={textFieldSx}
          autoComplete="off"
          id="zone-review-report"
          label="Област"
          name="zone" //! MUST MATCH WITH THE RELATED KEY FROM ReportForm
          fullWidth
          margin="dense"
          focused
          value={getLabelOfZoneById(reportForm.zone)}
          InputProps={{readOnly: true}}
        />

        <TextField
          sx={textFieldSx}
          autoComplete="off"
          id="area-review-report"
          label="Район"
          name="area" //! MUST MATCH WITH THE RELATED KEY FROM ReportForm
          fullWidth
          margin="dense"
          focused
          value={reportForm.area}
          InputProps={{readOnly: true}}
        />
    
        <Button 
          sx={{height: '123px', 
                backgroundImage: 'url(/src/assets/images/mapButton.jpg)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                mt: 1,
                mb: 0.4
              }}
          fullWidth
          //component="label"
          //role={undefined}
          variant="contained"
          tabIndex={-1}
          startIcon={<PlaceIcon />}
          onClick={() => window.open(reportForm.locationUrl, '_blank')} 
        >
          Виж на картата
        </Button>
    
  
    </div>
    
    
        </div>
        
        
    
        </div>
    
        <div className="public_report_component__container2">
    
        <div className="public_report_component__container2__description">
        <TextField
          //? This text field has "A form field should have an id or name attribute" in the console
          sx={textFieldSx}
          autoComplete="off"
          id="description-review-report"
          label="Описание"
          multiline
          rows={10}
          name="description" //! MUST MATCH WITH THE RELATED KEY FROM ReportForm
          required
          fullWidth
          margin="dense"
          focused
          value={reportForm.description}
          InputProps={{readOnly: true}}
            />
        </div>
    
       
    
        
        </div>
    
        
        </div>
      );
    }
    

  
};