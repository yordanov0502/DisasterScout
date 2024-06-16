import { Box, ButtonBase, Paper, Typography, styled } from "@mui/material";
import './seismic_activity_component.scss';

const ImageButton = styled(ButtonBase)(({ theme }) => ({
  position: 'relative',
  height: 200,
  borderTopLeftRadius: '10px',
  borderTopRightRadius: '10px',
  borderBottomLeftRadius: '0px',
  borderBottomRightRadius: '0px',
  [theme.breakpoints.down('sm')]: {
    width: '100% !important', // Overrides inline-style
    height: 100,
  },
  '&:hover, &.Mui-focusVisible': {
    zIndex: 1,
    '& .MuiImageBackdrop-root': {
      opacity: 0.15,
    },
    '& .MuiImageMarked-root': {
      opacity: 0,
    },
    '& .MuiTypography-root': {
      border: '4px solid currentColor',
    },
  },
}));

const ImageSrc = styled('span')({
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  backgroundSize: 'cover',
  backgroundPosition: 'center 40%',
  borderTopLeftRadius: '10px',
  borderTopRightRadius: '10px',
  borderBottomLeftRadius: '0px',
  borderBottomRightRadius: '0px',
});

const Image = styled('span')(({ theme }) => ({
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: theme.palette.common.white,
  borderTopLeftRadius: '10px',
  borderTopRightRadius: '10px',
  borderBottomLeftRadius: '0px',
  borderBottomRightRadius: '0px',
}));

const ImageBackdrop = styled('span')(({ theme, opacity }) => ({
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  backgroundColor: theme.palette.common.black,
  opacity: opacity || 0.4,
  transition: theme.transitions.create('opacity'),
  borderTopLeftRadius: '10px',
  borderTopRightRadius: '10px',
  borderBottomLeftRadius: '0px',
  borderBottomRightRadius: '0px',
}));




export const SeismicActivityComponent = () => {


  return (
    <div className="seismic_activity_component">

       <Paper 
        key={"earthquake"}
        elevation={3} 
        sx={{
        width: '70%', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center', 
        flexDirection: 'column',
        borderRadius: '10px',
        marginTop: '6%',
        marginBottom: '3%',
        '@media (max-width: 1000px)': {
            width: '80%',
        },
        '@media (max-width: 820px)': {
            width: '90%',
        },
        '@media (max-width: 720px)': {
            width: '95%',
        },
        '@media (pointer: coarse)': {
            width: '95%',
        }
        }}
       >
             
            <Box sx={{ display: 'flex', flexWrap: 'wrap', width: '100%' }}>
            {
                <ImageButton
                focusRipple
                disabled={true}
                style={{
                    width: '100%',
                    height: 300
                }}
                >
                <ImageSrc style={{ backgroundImage: `url(/src/assets/images/categories/SEISMIC_ACTIVITY/earthquake.jpg)` }} />
                <ImageBackdrop className="MuiImageBackdrop-root" />
                <Image>
                    <Typography
                    component="span"
                    variant="subtitle1"
                    color="inherit"
                    sx={{
                        position: 'relative',
                        p: 4,
                        pt: 2,
                        pb: (theme) => `calc(${theme.spacing(1)} + 6px)`,
                        fontSize: '32px'
                    }}
                    >
                    Земетресение
                    </Typography>
                </Image>
                </ImageButton>
            }
            </Box>

            <Typography variant="subtitle1" color="text.primary" component="div" sx={{marginLeft: '2%', marginRight: '2%',textAlign: 'justify' ,color: '#E50000', '@media (pointer: coarse)': {marginLeft: '3%', marginRight: '3%'}}}>
            Земетресенията са природни явления, при които земната повърхност внезапно и силно се разтърсва. Те са резултат от освобождаването на натрупаната енергия в земната кора. Тази енергия се освобождава под формата на сеизмични вълни, които се разпространяват през земните пластове и причиняват трептения на земната повърхност. Земетресенията могат да бъдат с различен магнитуд по скалата на Рихтер и да причинят значителни разрушения и загуби. Важно е да бъдем подготвени и да знаем как да реагираме в случай на земетресение.
            </Typography>

            <Typography variant="subtitle1" color="text.primary" component="div" sx={{textAlign: 'center', marginTop: '10px',fontWeight: 'bold', color: '#009F58', textDecoration: 'underline', fontSize: '20px', '@media (pointer: coarse)': {fontSize: '18px'} }}>
            Какво да правим при земетресение?
            </Typography>

            <Typography variant="subtitle1" color="text.primary" component="div" sx={{textAlign: 'justify', marginRight: '2%', '@media (pointer: coarse)': {marginRight: '3%'}}}>
            <ol>
                <li><span style={{fontWeight: 'bold'}}>Запазете спокойствие:</span> Паниката може да увеличи риска от наранявания. Дишайте дълбоко и се опитайте да мислите рационално.</li>
                <li><span style={{fontWeight: 'bold'}}>Покрийте се:</span> Ако сте в помещение, намерете място под здрава мебел, като маса или бюро. Ако няма такава наблизо, застанете до вътрешна стена или каса на врата и се покрийте с ръце.</li>
                <li><span style={{fontWeight: 'bold'}}>Стойте на място:</span> Не бягайте навън по време на земетресение. По-безопасно е да останете на мястото си, докато трусовете не престанат.</li>
                <li><span style={{fontWeight: 'bold'}}>Далеч от прозорци и предмети, които могат да паднат:</span> Стойте далеч от прозорци, огледала, шкафове и всякакви предмети, които могат да се свлекат и да ви наранят.</li>
                <li><span style={{fontWeight: 'bold'}}>Ако сте навън:</span> Намерете открито пространство далеч от сгради, дървета, улични лампи и електропроводи. Седнете или легнете и изчакайте трусовете да престанат.</li>
            </ol>
            </Typography>

        </Paper>

        <Paper 
         key={"tsunami"}
         elevation={3} 
         sx={{
         width: '70%', 
         display: 'flex', 
         alignItems: 'center', 
         justifyContent: 'center', 
         flexDirection: 'column',
         borderRadius: '10px',
         marginTop: '3%',
         marginBottom: '3%',
         '@media (max-width: 1000px)': {
            width: '80%',
         },
         '@media (max-width: 820px)': {
            width: '90%',
         },
         '@media (max-width: 720px)': {
            width: '95%',
         },
         '@media (pointer: coarse)': {
            width: '95%',
         }
         }}
        >
             
            <Box sx={{ display: 'flex', flexWrap: 'wrap', width: '100%' }}>
            {
                <ImageButton
                focusRipple
                disabled={true}
                style={{
                    width: '100%',
                    height: 300
                }}
                >
                <ImageSrc style={{ backgroundImage: `url(/src/assets/images/categories/SEISMIC_ACTIVITY/tsunami.jpg)` }} />
                <ImageBackdrop className="MuiImageBackdrop-root" opacity={0.1} />
                <Image>
                    <Typography
                    component="span"
                    variant="subtitle1"
                    color="inherit"
                    sx={{
                        position: 'relative',
                        p: 4,
                        pt: 2,
                        pb: (theme) => `calc(${theme.spacing(1)} + 6px)`,
                        fontSize: '32px'
                    }}
                    >
                    Цунами
                    </Typography>
                </Image>
                </ImageButton>
            }
            </Box>

            <Typography variant="subtitle1" color="text.primary" component="div" sx={{marginLeft: '2%', marginRight: '2%',textAlign: 'justify' ,color: '#E50000', '@media (pointer: coarse)': {marginLeft: '3%', marginRight: '3%'}}}>
            Цунамито е природно явление, представляващо поредица от необичайно високи и разрушителни вълни, възникващи при масивно разместване на водите на езеро, море или океан. Предвид огромната разрушителна сила и големина на вълната и огромното количество енергия, едно цунами може да нанесе огромни поражения на крайбрежните райони. Причините за възникване на цунами, могат да бъдат земетресения, земни свличания или сблъсък с космически обекти.
            </Typography>

            <Typography variant="subtitle1" color="text.primary" component="div" sx={{textAlign: 'center', marginTop: '10px',fontWeight: 'bold', color: '#009F58', textDecoration: 'underline', fontSize: '20px', '@media (pointer: coarse)': {fontSize: '18px'} }}>
            Какво да правим при цунами?
            </Typography>

            <Typography variant="subtitle1" color="text.primary" component="div" sx={{textAlign: 'justify', marginRight: '2%', '@media (pointer: coarse)': {marginRight: '3%'}}}>
            <ol>
                <li><span style={{fontWeight: 'bold'}}>Разпознайте природните знаци:</span> Внезапно отдръпване на морето, странни шумове или необичайни вълни може да са признаци за предстоящо цунами.</li>
                <li><span style={{fontWeight: 'bold'}}>Напуснете крайбрежната зона:</span> Ако получите предупреждение за цунами или усетите силно земетресение, веднага напуснете крайбрежната зона и се отправете към високи места или вътрешността на сушата.</li>
                <li><span style={{fontWeight: 'bold'}}>Не чакайте официално предупреждение:</span> При силно земетресение, което продължава повече от 20 секунди, не чакайте официално предупреждение – веднага се евакуирайте.</li>
                <li><span style={{fontWeight: 'bold'}}>Избягвайте ниските места:</span> Стойте далеч от речни долини и низини, които могат да бъдат залети.</li>
                <li><span style={{fontWeight: 'bold'}}>Пазете се от остатъчни вълни:</span> Цунамито често идва с няколко вълни, които могат да бъдат разделени с часове. Изчакайте, докато се уверите, че опасността е отминала.</li>
            </ol>
            </Typography>

        </Paper>


        <Paper 
         key={"landslide"}
         elevation={3} 
         sx={{
         width: '70%', 
         display: 'flex', 
         alignItems: 'center', 
         justifyContent: 'center', 
         flexDirection: 'column',
         borderRadius: '10px',
         marginTop: '3%',
         marginBottom: '6%',
         '@media (max-width: 1000px)': {
            width: '80%',
         },
         '@media (max-width: 820px)': {
            width: '90%',
         },
         '@media (max-width: 720px)': {
            width: '95%',
         },
         '@media (pointer: coarse)': {
            width: '95%',
         }
         }}
        >
             
            <Box sx={{ display: 'flex', flexWrap: 'wrap', width: '100%' }}>
            {
                <ImageButton
                focusRipple
                disabled={true}
                style={{
                    width: '100%',
                    height: 300
                }}
                >
                <ImageSrc style={{ backgroundImage: `url(/src/assets/images/categories/SEISMIC_ACTIVITY/landslide.jpg)` }} />
                <ImageBackdrop className="MuiImageBackdrop-root" opacity={0.3} />
                <Image>
                    <Typography
                    component="span"
                    variant="subtitle1"
                    color="inherit"
                    sx={{
                        position: 'relative',
                        p: 4,
                        pt: 2,
                        pb: (theme) => `calc(${theme.spacing(1)} + 6px)`,
                        fontSize: '32px'
                    }}
                    >
                    Свлачище
                    </Typography>
                </Image>
                </ImageButton>
            }
            </Box>

            <Typography variant="subtitle1" color="text.primary" component="div" sx={{marginLeft: '2%', marginRight: '2%',textAlign: 'justify' ,color: '#E50000', '@media (pointer: coarse)': {marginLeft: '3%', marginRight: '3%'}}}>
            Свлачището е природен феномен, при който големи маси от земни материали като почва, камъни, скали и растителност се плъзгат надолу по склон или планина под въздействието на гравитацията. Това явление може да бъде предизвикано от продължителни дъждове, бури, земетресения или човешка дейност.
            </Typography>

            <Typography variant="subtitle1" color="text.primary" component="div" sx={{textAlign: 'center', marginTop: '10px',fontWeight: 'bold', color: '#009F58', textDecoration: 'underline', fontSize: '20px', '@media (pointer: coarse)': {fontSize: '18px'} }}>
            Какво да правим при свлачище?
            </Typography>

            <Typography variant="subtitle1" color="text.primary" component="div" sx={{textAlign: 'justify', marginRight: '2%', '@media (pointer: coarse)': {marginRight: '3%'}}}>
            <ol>
                <li><span style={{fontWeight: 'bold'}}>Напуснете веднага:</span> Ако забележите признаци на свлачище, незабавно се евакуирайте към безопасно място.</li>
                <li><span style={{fontWeight: 'bold'}}>Следете за признаци на движение на почвата:</span> Промени в терена, нови пукнатини в земята или в стените на сгради, изместване на огради и стълбове могат да бъдат признаци за вторично свлачище.</li>
                <li><span style={{fontWeight: 'bold'}}>Избягвайте засегнатите зони:</span> Не се връщайте в зоната на свлачището, докато властите не обявят, че е безопасно.</li>
                <li><span style={{fontWeight: 'bold'}}>Избягвайте долини и склонове:</span> Стойте далеч от долини и склонове, където свлачищата могат да се движат най-бързо.</li>
                <li><span style={{fontWeight: 'bold'}}>Съобщете за нови опасности:</span> Информирайте властите за всякакви нови опасности, като пропадания или нови пукнатини.</li>
            </ol>
            </Typography>

        </Paper>

        
    </div>
  );
};