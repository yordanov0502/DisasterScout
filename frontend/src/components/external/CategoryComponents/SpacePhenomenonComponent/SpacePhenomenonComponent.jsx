import { Box, ButtonBase, Paper, Typography, styled } from "@mui/material";
import './space_phenomenon_component.scss';

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

const ImageSrc = styled('span')(({ backgroundPosition }) => ({
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  backgroundSize: 'cover',
  backgroundPosition: backgroundPosition || 'center 40%',
  borderTopLeftRadius: '10px',
  borderTopRightRadius: '10px',
  borderBottomLeftRadius: '0px',
  borderBottomRightRadius: '0px',
}));

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




export const SpacePhenomenonComponent = () => {


  return (
    <div className="space_phenomenon_component">

      



        <Paper 
         key={"meteorite_impact"}
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
                <ImageSrc style={{ backgroundImage: `url(/src/assets/images/categories/SPACE_PHENOMENON/meteorite_impact.jpg)`,  backgroundPosition: 'center 35%'  }} />
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
                    Метеоритен удар
                    </Typography>
                </Image>
                </ImageButton>
            }
            </Box>

            <Typography variant="subtitle1" color="text.primary" component="div" sx={{marginLeft: '2%', marginRight: '2%',textAlign: 'justify' ,color: '#E50000', '@media (pointer: coarse)': {marginLeft: '3%', marginRight: '3%'}}}>
            Метеоритният удар представлява сблъсък на метеорит с повърхността на планета, или друго небесно тяло. Метеоритът е твърдо тяло, което произхожда от космоса и преминава през атмосферата на Земята или друга планета, като запазва част от своята маса. При навлизането в атмосферата, метеоритът обикновено се нагрява и свети поради високата скорост и триенето с въздуха, което го прави видим като метеор (или падаща звезда). Ако той не изгори напълно в атмосферата и достигне до повърхността, тогава се получава сблъсък в мащаб, зависещ от големината на метеорита.
            </Typography>

            <Typography variant="subtitle1" color="text.primary" component="div" sx={{textAlign: 'center', marginTop: '10px',fontWeight: 'bold', color: '#009F58', textDecoration: 'underline', fontSize: '20px', '@media (pointer: coarse)': {fontSize: '18px'} }}>
            Какво да правим в случай на метеоритен удар?
            </Typography>

            <Typography variant="subtitle1" color="text.primary" component="div" sx={{textAlign: 'justify', marginRight: '2%', '@media (pointer: coarse)': {marginRight: '3%'}}}>
            <ol>
                <li><span style={{fontWeight: 'bold'}}>Останете спокойни:</span> Запазете спокойствие и се уверете, че имате ясен план за действие.</li>
                <li><span style={{fontWeight: 'bold'}}>Потърсете убежище:</span> Потърсете подземни помещения като мазета и бомбоубежища, за да запазите живота и здравето си.</li>
                <li><span style={{fontWeight: 'bold'}}>Избягвайте опасните зони:</span> Стойте далеч от зони, където метеоритът е ударил. Такива зони могат да бъдат нестабилни и опасни поради горещи отломки, вторични експлозии или токсични вещества.</li>
                <li><span style={{fontWeight: 'bold'}}>Информирайте се:</span> Следете социалните медии и новинарски сайтове за актуална информация.</li>
                <li><span style={{fontWeight: 'bold'}}>Следвайте инструкциите на властите:</span> Ако получите инструкции от местните власти, следвайте ги стриктно. Това може да включва евакуация или други мерки за безопасност.</li>
            </ol>
            </Typography>

        </Paper>



        <Paper 
         key={"meteor_rain"}
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
                <ImageSrc style={{ backgroundImage: `url(/src/assets/images/categories/SPACE_PHENOMENON/meteor_rain.jpg)`,  backgroundPosition: 'center 40%'  }} />
                <ImageBackdrop className="MuiImageBackdrop-root" opacity={0.4} />
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
                    Метеоритен дъжд
                    </Typography>
                </Image>
                </ImageButton>
            }
            </Box>

            <Typography variant="subtitle1" color="text.primary" component="div" sx={{marginLeft: '2%', marginRight: '2%',textAlign: 'justify' ,color: 'darkblue', '@media (pointer: coarse)': {marginLeft: '3%', marginRight: '3%'}}}>
            Метеоритен дъжд или звезден дъжд е едно от най-често срещаните космически явления. Астрономите го наричат метеоритен поток. Той се характеризира с голям брой метеори, които пресичат звездната орбита на нашата планета. Когато попаднат в горните слоеве на нашата атмосфера, те се загряват от триенето с въздуха и изгарят.
            </Typography>

            <Typography variant="subtitle1" color="text.primary" component="div" sx={{textAlign: 'center', marginTop: '10px',fontWeight: 'bold', color: '#009F58', textDecoration: 'underline', fontSize: '20px', '@media (pointer: coarse)': {fontSize: '18px'} }}>
            Какво да правим в случай на метеоритен дъжд?
            </Typography>

            <Typography variant="subtitle1" color="text.primary" component="div" sx={{textAlign: 'justify', marginRight: '2%', '@media (pointer: coarse)': {marginRight: '3%'}}}>
            <ol>
                <li><span style={{fontWeight: 'bold'}}>Наблюдавайте от безопасно място:</span> Намерете открито пространство далеч от светлинното замърсяване (градските светлини), за да видите метеоритите по-добре.</li>
                <li><span style={{fontWeight: 'bold'}}>Защитете очите си:</span> Ако имате, използвайте защитни очила или визьор за защита на очите от малки парчета, ако някои от метеоритите достигнат близо до земната повърхност.</li>
                <li><span style={{fontWeight: 'bold'}}>Следете за предупреждения:</span> Следете новините и предупрежденията от местните власти и метеорологичните служби за актуална информация.</li>
                <li><span style={{fontWeight: 'bold'}}>Избягвайте откритите места при големи метеоритни дъждове:</span> Ако се прогнозира по-голямо метеоритно събитие, което може да представлява опасност, останете на закрито и се пазете от прозорци и остъклени врати.</li>
                <li><span style={{fontWeight: 'bold'}}>Аварийни мерки:</span> При значителна опасност, пригответе аварийни материали, като вода, храна и медицински консумативи, както и план за действие в случай на авария.</li>
            </ol>
            </Typography>

        </Paper>



        <Paper 
         key={"solar_storms"}
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
                <ImageSrc style={{ backgroundImage: `url(/src/assets/images/categories/SPACE_PHENOMENON/solar_storms.jpg)`,  backgroundPosition: 'center 40%'  }} />
                <ImageBackdrop className="MuiImageBackdrop-root" opacity={0.4} />
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
                    Слънчеви бури
                    </Typography>
                </Image>
                </ImageButton>
            }
            </Box>

            <Typography variant="subtitle1" color="text.primary" component="div" sx={{marginLeft: '2%', marginRight: '2%',textAlign: 'justify' ,color: '#E50000', '@media (pointer: coarse)': {marginLeft: '3%', marginRight: '3%'}}}>
            Слънчевите бури са енергийни събития, които възникват от Слънцето и могат да имат значително въздействие върху Земята. Те обикновено включват изхвърляне на големи количества енергия и заредени частици от слънчевата корона. Те могат да предизвикат смущения в земното магнитно поле, които да засегнат електропреносните мрежи, навигационните системи и радиокомуникациите.
            </Typography>

            <Typography variant="subtitle1" color="text.primary" component="div" sx={{textAlign: 'center', marginTop: '10px',fontWeight: 'bold', color: '#009F58', textDecoration: 'underline', fontSize: '20px', '@media (pointer: coarse)': {fontSize: '18px'} }}>
            Какво да правим по време на слънчеви бури?
            </Typography>

            <Typography variant="subtitle1" color="text.primary" component="div" sx={{textAlign: 'justify', marginRight: '2%', '@media (pointer: coarse)': {marginRight: '3%'}}}>
            <ol>
                <li><span style={{fontWeight: 'bold'}}>Защитете електронните си устройства:</span> Изключете от контакта ненужните електронни устройства по време на силни слънчеви бури, за да ги предпазите от повреди, причинени от електрически пренапрежения.</li>
                <li><span style={{fontWeight: 'bold'}}>Ограничете използването на комуникации:</span> Избягвайте да използвате радиостанции и сателитни комуникации по време на силни геомагнитни бури, тъй като те могат да бъдат засегнати от смущения.</li>
                <li><span style={{fontWeight: 'bold'}}>Ограничете работата на открито:</span> Ако се намирате в екстремни географски ширини (близо до полюсите), бъдете наясно, че геомагнитните бури могат да предизвикат повишени нива на радиация. Приемайте съответни предпазни мерки, ако е необходимо.</li>
                <li><span style={{fontWeight: 'bold'}}>Следвайте официалните указания:</span> Властите може да издадат специфични указания за защита на електропреносните мрежи, комуникациите и други критични инфраструктури. Следвайте техните препоръки и указания.</li>
                <li><span style={{fontWeight: 'bold'}}>Следете прогнозите за космическото време:</span> Редовно проверявайте прогнозите за космическото време от надеждни източници като Националната агенция за океански и атмосферни изследвания (NOAA) или Европейската космическа агенция (ESA).</li>
            </ol>
            </Typography>

        </Paper>
        
    </div>
  );
};