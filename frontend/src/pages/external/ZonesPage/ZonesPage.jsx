import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Alert, CardMedia, Paper, Snackbar, Typography } from "@mui/material";
import { getAlertsOfAllZones, getLabelOfZoneById, getDescriptionOfZoneById } from "../../../services/zoneService";
import { getColorBySeverityType } from "../../../services/severityService";
import { useSnackbar } from "../../../hooks/useSnackbar";
import { PageLoader } from "../../../components/Loaders/PageLoader";
import './zones_page.scss';

export const ZonesPage = () => {

  const [papers, setPapers] = useState([]);
  const [isLoadingPage, setIsLoadingPage] = useState(true);
  const { open, message, severity, position, showSnackbar, closeSnackbar } = useSnackbar();
 
  const { data, status, isLoading, error } = useQuery({
    queryKey: ["getAlertsOfAllZones"],
    queryFn: () => getAlertsOfAllZones(),
    enabled: true
  });

  useEffect(() => {
    if (isLoading) {
      setIsLoadingPage(true);
    }

    if (status === "success") {
      const fetchedPapers = data.data.zonesAlertsDTOList.map((item) => {
        return {
          number: parseInt(item.zoneId.replace('st', ''), 10),
          zoneId: item.zoneId,
          color: getColorBySeverityType(item.severityType), 
          message: item.message
        };
      });

      setPapers(fetchedPapers);
      setIsLoadingPage(false);
    }

    if (status === "error") 
    {
      showSnackbar("Възникна грешка. Моля опитайте отново.","error","top","center");
      setPapers([]);
    }
  }, [status, data, error]);

  const getPaperByNumber = (number) => {
    return papers.find(paper => paper.number === number);
  };

  const handleCloseSnackBar = (event, reason) => {
    if (reason === 'clickaway') {
        return;
    }
    closeSnackbar();
};

  if(isLoadingPage) 
  {
    return (
      <div className="zones_page">
        <div className="zones_page__loader-box">
          <PageLoader />

          <Snackbar 
                anchorOrigin={{
                    vertical: position.vertical,
                    horizontal: position.horizontal,
                }} 
                sx={{position: 'fixed', top: '100px !important'}}
                open={open} 
                autoHideDuration={4000} 
                onClose={handleCloseSnackBar}>
                <Alert onClose={handleCloseSnackBar} severity={severity} variant="filled" sx={{ width: '100%' }}>
                    {message}
                </Alert>
          </Snackbar>
        </div>
      </div>
     );
  }

  else
  {
    return (
      <div className="zones_page">
  
             
         
         <div className="zones_page__papers">




         {Array.from({ length: 28 }).map((_, index) => (

          <Paper 
            key={index+1}
            elevation={3} 
            sx={{
              width: '50%', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              flexDirection: 'column',
              marginTop: (index + 1) === 1 ? '3%' : '0%',
              marginBottom: '3%',
              '@media (max-width: 1000px)': {
                width: '60%',
              },
              '@media (max-width: 820px)': {
                width: '70%',
              },
              '@media (max-width: 720px)': {
                width: '80%',
              },
              '@media (max-width: 620px)': {
                width: '90%',
              },
              '@media (max-width: 550px)': {
                width: '95%',
              },
              '@media (pointer: coarse)': {
                width: '100%',
              }
            }}
          >
            <CardMedia
              component="img"
              sx={{ width: '18%', objectFit: 'contain', marginTop: 1, marginBottom: 1 }}
              image={`/src/assets/images/zoneBadges/${getPaperByNumber(index+1).zoneId}.png`}
              alt="image"
            />
            <Typography component="div" variant="h5" sx={{color: '#065531', fontSize: '30px'}}>
              {getLabelOfZoneById(getPaperByNumber(index+1).zoneId)}
            </Typography>
            {
              getPaperByNumber(index+1).message && (
                <Alert variant="filled" severity="warning" sx={{backgroundColor: getPaperByNumber(index+1).color, padding: '1% 0%', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '0%', fontSize: '18px', textAlign: 'center', overflow: 'hidden' }}>
                 {getPaperByNumber(index+1).message}
                </Alert>
              )
            }
            <Typography variant="subtitle1" color="text.primary" component="div" sx={{textAlign: 'center'}}>
             {getDescriptionOfZoneById(getPaperByNumber(index+1).zoneId)}
            </Typography>
          </Paper>
        ))}




  
                 
                  
  
  
  
  
               
        </div>
  
             
      </div>
    );
  }

 
};
