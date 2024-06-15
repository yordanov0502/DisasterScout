import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Alert, CardMedia, Paper, Typography } from "@mui/material";
import { getAlertsOfAllZones, getLabelOfZoneById, getDescriptionOfZoneById } from "../../../services/zoneService";
import { getColorBySeverityType } from "../../../services/severityService";
import { PageLoader } from "../../../components/Loaders/PageLoader";
import './zones_page.scss';

export const ZonesPage = () => {

  const location = useLocation();
  const navigate = useNavigate();
  const [papers, setPapers] = useState([]);
  const paperRefs = useRef({}); // Stores refs of all DOM elements (which are 28 <Paper> components) 
  const [isLoadingPage, setIsLoadingPage] = useState(true);
 
  const { data, status, isLoading, error } = useQuery({
    queryKey: ["getAlertsOfAllZones"],
    queryFn: () => getAlertsOfAllZones(),
    enabled: true
  });

  useEffect(() => {

    if (!isLoadingPage && papers.length === 28 && location.state?.selectedZone) 
    {
      const idNumber = parseInt(location.state.selectedZone.replace('st', ''), 10);
      navigate(location.pathname, { replace: true, state: {} });

      if (paperRefs.current[idNumber]) 
      {
        window.scroll({top: paperRefs.current[idNumber].offsetTop, behavior: 'smooth'});
      }
    }
  }, [location, isLoadingPage, papers ]);

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
      setPapers([]);
    }
  }, [status, data, error]);

  //? Cleanup effect to reset scroll position when component unmounts
  useEffect(() => {
    return () => {
      window.scroll({ top: 0, behavior: 'auto' });
    };
  }, []);



  const getPaperByNumber = (number) => {
    return papers.find(paper => paper.number === number);
  };

  


  
  if(isLoadingPage) 
  {
    return (
      <div className="zones_page">
        <div className="zones_page__loader-box">
          <PageLoader />
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
              //! The el in the ref callback function represents the DOM element for the current Paper component.
              //? Stores reference to the current <Paper> inside paperRefs.current[index + 1] only if hasn't yet been stored
              ref={el => { if(!paperRefs.current[index + 1] && el) {paperRefs.current[index + 1] = el;} }} 
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