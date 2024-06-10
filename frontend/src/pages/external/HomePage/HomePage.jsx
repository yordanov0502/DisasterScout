import { useEffect, useRef, useState } from 'react';
import { useQuery } from "@tanstack/react-query";
import { useSnackbar } from "../../../hooks/useSnackbar";
import { Alert, Snackbar } from "@mui/material";
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { getAlertsOfAllZones } from "../../../services/zoneService";
import './home_page.scss';
import '/src/assets/scripts/bgMap/map.css';

export const HomePage = () => {
    const mapContainerRef = useRef(null); 
    const mapInstance = useRef(null); 
    const [mapLoaded, setMapLoaded] = useState(false);
    const [isQueryEnabled, setIsQueryEnabled] = useState(false);
    const { open, message, severity, position, showSnackbar, closeSnackbar } = useSnackbar();

    const {
        data,
        status,
        error,
        refetch
    } = useQuery({
        queryKey: ["getAlertsOfAllZones"],
        queryFn: () => getAlertsOfAllZones(), 
        enabled: isQueryEnabled
    });

    useEffect(() => {
        const currentMapContainer = mapContainerRef.current;

        const loadScript = (scriptPath) => {
            return new Promise((resolve, reject) => {
                if (document.querySelector(`script[src="${scriptPath}"]`)) {
                    resolve();
                    return;
                }
                const script = document.createElement('script');
                script.src = scriptPath;
                script.async = false;
                script.defer = true;
                script.onload = resolve;
                script.onerror = reject;
                document.head.appendChild(script);
            });
        };

        const initMap = () => {
            if (!mapInstance.current && window.FlaMap && mapContainerRef.current) {
                mapInstance.current = new window.FlaMap(window.map_cfg);
                mapInstance.current.draw(mapContainerRef.current.id);
                setMapLoaded(true);

                const event = 'click';
                mapInstance.current.on(event, (event, elementId) => { 
                    handleClick(event, elementId);
                });
            }
        };

        Promise.all([
            loadScript('/src/assets/scripts/bgMap/raphael.min.js')
        ]).then(() => {
            return Promise.all([
                loadScript('/src/assets/scripts/bgMap/settings.js'),
                loadScript('/src/assets/scripts/bgMap/paths.js'),
                loadScript('/src/assets/scripts/bgMap/map.js')
            ]);
        }).then(initMap)
        .catch((error) => {
            console.log('Error loading scripts:', error);
        });

        return () => {
            if (currentMapContainer) {
                currentMapContainer.innerHTML = '';
            }
            mapInstance.current = null;
        };

    }, []);

    useEffect(() => {
        if(mapLoaded) {
            setIsQueryEnabled(true);
        }
    }, [mapLoaded]);

    useEffect(() => {
        if (status === 'success') {
            data.data.zoneSeveritiesDTOList.map((item) => {
                const zoneColor = item.severityType !== null ? getZoneColor(item.severityType) : '#009F58';
                mapInstance.current.setColor(item.zoneId, zoneColor);
                const zoneColorOver = getZoneColorOver(zoneColor);
                mapInstance.current.setColorOver(item.zoneId, zoneColorOver);
            });
        }

        if(status === 'error') {
            showSnackbar("Възникна грешка. Моля опитайте отново.","error","top","center");
        }

    }, [status, data, error]);

    function getZoneColor(severityType) {
        if (severityType === 'LOW') {return 'yellow';}
        else if (severityType === 'MEDIUM') {return 'orange';}
        else if (severityType === 'HIGH') {return '#E50000';}
        else if (severityType === 'CRITICAL') {return '#303515';}
        else {return '#009F58';}
    }

    function getZoneColorOver(zoneColor) {
        if (zoneColor === 'yellow') {return '#b1b100';}
        else if (zoneColor === 'orange') {return '#c77700';}
        else if (zoneColor === '#E50000') {return '#B40000';}
        else if (zoneColor === '#303515') {return '#1E220E';}
        else {return '#007742';}
    }

    const handleClick = (event, id) => { 
        console.log(id);
    };

    const handleCloseSnackBar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        closeSnackbar();
    };

    useEffect(() => {
        const scoutSpan = document.querySelector('.home_page__heading--scout');
        const disasterSpan = document.querySelector('.home_page__heading--disaster');
        
        setTimeout(() => {
            scoutSpan.style.visibility = 'visible';
            disasterSpan.classList.add('no-border');
        }, 2200); // increased by 100 to avoid flashing of word SCOUT when rendering the title everytime without the first render
    }, []);

    return (
        <div className="home_page">

            <div className="home_page__heading">
                <span className="home_page__heading--disaster">DISASTER</span>
                <span className="home_page__heading--scout">SCOUT</span>
            </div>

            <div className="home_page__sub-heading">
                Първата в България общодостъпна платформа за докладване и следене на природни бедствия и аварии по всяко време във всяка една точка на страната.
            </div>

            <div className="home_page__container">
                <div ref={mapContainerRef} id="map-container"></div>
            </div>


             <div className="home_page__cards1">

                <Card sx={{ display: 'flex',  boxShadow: 11, width: '50%', border: '2px solid #009F58' }}>
                    <CardMedia
                        component="img"
                        sx={{ width: 151 }}
                        image="/src/assets/images/dispatcher.svg"
                        alt="image"
                    />
                    <Box sx={{ 
                        display: 'flex', 
                        flexDirection: 'column'
                        }}>
                        <CardContent sx={{ flex: '1 0 auto', color: '#065531' }}>
                        <Typography component="div" variant="h5">
                            Диспечери
                        </Typography>
                        <Typography variant="subtitle1" color="text.secondary" component="div">
                            Диспечерите на Disaster Scout обработват, следят и проверяват достоверността на всеки един подаден сигнал преди да бъде публикуван, както и през цялото време докато е актуален.
                        </Typography>
                        </CardContent>
                    </Box>
                </Card>

                <Card sx={{ display: 'flex',  boxShadow: 11, width: '50%', border: '2px solid #009F58'/*, height: '157px'*/ }}>
                    <CardMedia
                        component="img"
                        sx={{ width: 151 }}
                        image="/src/assets/images/phone.svg"
                        alt="image"
                    />
                    <Box sx={{ 
                        display: 'flex', 
                        flexDirection: 'column'
                        }}>
                        <CardContent sx={{ flex: '1 0 auto', color: '#065531' }}>
                        <Typography component="div" variant="h5">
                            Обратна връзка
                        </Typography>
                        <Typography variant="subtitle1" color="text.secondary" component="div">
                            При всеки един подаден сигнал от ваша страна за природно бедствие или авария, очаквайте позвъняване от диспечер за уточняване на подробностите.
                        </Typography>
                        </CardContent>
                    </Box>
                </Card>

             </div>

             <div className="home_page__cards2">

                <Card sx={{ display: 'flex',  boxShadow: 11, width: '50%', border: '2px solid #009F58' }}>
                    <CardMedia
                        component="img"
                        sx={{ width: 151 }}
                        image="/src/assets/images/alert.svg"
                        alt="image"
                    />
                    <Box sx={{ 
                        display: 'flex', 
                        flexDirection: 'column'
                        }}>
                        <CardContent sx={{ flex: '1 0 auto', color: '#065531' }}>
                        <Typography component="div" variant="h5">
                            Областни предупреждения за опасности
                        </Typography>
                        <Typography variant="subtitle1" color="text.secondary" component="div">
                           Disaster Scout ще добавя предупреждения и ще актуализира цветовете на конкретни области от българската карта, при наличие на потенциални опасности за живота и здравето на хората.
                        </Typography>
                        </CardContent>
                    </Box>
                </Card>

                <Card sx={{ display: 'flex',  boxShadow: 11, width: '50%', border: '2px solid #009F58'/*, height: '157px'*/ }}>
                    <CardMedia
                        component="img"
                        sx={{ width: 151 }}
                        image="/src/assets/images/location.svg"
                        alt="image"
                    />
                    <Box sx={{ 
                        display: 'flex', 
                        flexDirection: 'column'
                        }}>
                        <CardContent sx={{ flex: '1 0 auto', color: '#065531' }}>
                        <Typography component="div" variant="h5">
                            Точна локация
                        </Typography>
                        <Typography variant="subtitle1" color="text.secondary" component="div">
                            Освен област, район и адрес, всеки един сигнал за природно бедствие или авария съдържа и точни координати, показващи конкретното местоположение.
                        </Typography>
                        </CardContent>
                    </Box>
                </Card>

             </div>


            






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
    );
};
