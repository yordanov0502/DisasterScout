import { Box, ButtonBase, Paper, Typography, styled } from "@mui/material";
import './road_conditions_component.scss';

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




export const RoadConditionsComponent = () => {


  return (
    <div className="road_conditions_component">

       <Paper 
        key={"closed_road"}
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
                <ImageSrc style={{ backgroundImage: `url(/src/assets/images/categories/ROAD_CONDITIONS/closed_road.jpg)`, backgroundPosition: 'center 50%' }}/>
                <ImageBackdrop className="MuiImageBackdrop-root" opacity={0.5}/>
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
                    Затворен път
                    </Typography>
                </Image>
                </ImageButton>
            }
            </Box>

            <Typography variant="subtitle1" color="text.primary" component="div" sx={{marginLeft: '2%', marginRight: '2%',textAlign: 'justify' ,color: '#E50000', '@media (pointer: coarse)': {marginLeft: '3%', marginRight: '3%'}}}>
            Затворен път представлява участък от пътната мрежа, който е временно или постоянно затворен за движение на превозни средства и/или пешеходци. Причините за затваряне на пътя могат да бъдат различни, включително: строителни и ремонтни дейности, произшествия и аварии, специални събития, лоши пътни условия, сигурност и др.
            </Typography>

            <Typography variant="subtitle1" color="text.primary" component="div" sx={{textAlign: 'center', marginTop: '10px',fontWeight: 'bold', color: '#009F58', textDecoration: 'underline', fontSize: '20px', '@media (pointer: coarse)': {fontSize: '18px'} }}>
            Какво да правим при затворен път?
            </Typography>

            <Typography variant="subtitle1" color="text.primary" component="div" sx={{textAlign: 'justify', marginRight: '2%', '@media (pointer: coarse)': {marginRight: '3%'}}}>
            <ol>
                <li><span style={{fontWeight: 'bold'}}>Огледайте знаците и указанията:</span> Проверете всички налични пътни знаци, които може да указват причината за затварянето и предоставят информация за алтернативни маршрути.</li>
                <li><span style={{fontWeight: 'bold'}}>Следвайте официалните указания:</span> Ако има присъствие на полиция или други отговорни служители, следвайте техните инструкции.</li> 
                <li><span style={{fontWeight: 'bold'}}>Бъдете търпеливи и спазвайте правилата:</span> Избягвайте да заобикаляте барикадите или да игнорирате знаците. Това може да е опасно и незаконно.</li>
                <li><span style={{fontWeight: 'bold'}}>Потърсете алтернативни маршрути:</span> Използвайте навигационната система на автомобила или мобилно приложение за навигация (като Google Maps, Waze и др.), за да намерите алтернативен маршрут до вашата дестинация.</li>
                <li><span style={{fontWeight: 'bold'}}>Информирайте се за ситуацията:</span> Ако разполагате с време, проверете новините или уебсайтовете на местните власти за актуална информация относно причината за затварянето и очакваното време за възобновяване на движението.</li>
            </ol>
            </Typography>

        </Paper>

        <Paper 
         key={"road_accident"}
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
                <ImageSrc style={{ backgroundImage: `url(/src/assets/images/categories/ROAD_CONDITIONS/road_accident.png)`,  backgroundPosition: 'center 75%' }} />
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
                    ПТП
                    </Typography>
                </Image>
                </ImageButton>
            }
            </Box>

            <Typography variant="subtitle1" color="text.primary" component="div" sx={{marginLeft: '2%', marginRight: '2%',textAlign: 'justify' ,color: '#E50000', '@media (pointer: coarse)': {marginLeft: '3%', marginRight: '3%'}}}>
            Пътнотранспортно произшествие (ПТП) е събитие, възникнало в процеса на движението на пътно превозно средство (ППС) и предизвикало нараняване или смърт на хора, повреда на пътно превозно средство, път, пътно съоръжение, товар или други материални щети.
            </Typography>

            <Typography variant="subtitle1" color="text.primary" component="div" sx={{textAlign: 'center', marginTop: '10px',fontWeight: 'bold', color: '#009F58', textDecoration: 'underline', fontSize: '20px', '@media (pointer: coarse)': {fontSize: '18px'} }}>
            Какво да правим при ПТП?
            </Typography>

            <Typography variant="subtitle1" color="text.primary" component="div" sx={{textAlign: 'justify', marginRight: '2%', '@media (pointer: coarse)': {marginRight: '3%'}}}>
            <ol>
                <li><span style={{fontWeight: 'bold'}}>Запазете спокойствие:</span> Опитайте се да останете спокойни и да не изпадате в паника.</li>
                <li><span style={{fontWeight: 'bold'}}>Проверете за наранявания:</span> Уверете се, че всички участници в произшествието са добре. Ако има пострадали, незабавно се обадете на Спешна помощ (тел. 112).</li>
                <li><span style={{fontWeight: 'bold'}}>Осигурете безопасността на мястото:</span> Поставете предупредителен триъгълник на подходящо разстояние (30-50 метра в населени места и поне 100 метра извън населени места), за да предупредите другите участници в движението.</li>
                <li><span style={{fontWeight: 'bold'}}>Съобщете за произшествието:</span> При сериозни произшествия, включително тези с пострадали или значителни материални щети, се обадете на полицията (тел. 112). Дайте точна информация за местоположението и обстоятелствата на произшествието.</li>
                <li><span style={{fontWeight: 'bold'}}>Документирайте произшествието:</span> Направете снимки на мястото на произшествието, щетите по превозните средства, регистрационните номера и всякакви други релевантни детайли. Запишете имената и контактите на свидетели, ако има такива.</li>
            </ol>
            </Typography>

        </Paper>


        <Paper 
         key={"difficult_road_conditions"}
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
                <ImageSrc style={{ backgroundImage: `url(/src/assets/images/categories/ROAD_CONDITIONS/difficult_road_conditions.jpg)`,  backgroundPosition: 'center 70%'  }} />
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
                    Затруднени пътни условия
                    </Typography>
                </Image>
                </ImageButton>
            }
            </Box>

            <Typography variant="subtitle1" color="text.primary" component="div" sx={{marginLeft: '2%', marginRight: '2%',textAlign: 'justify' ,color: '#E50000', '@media (pointer: coarse)': {marginLeft: '3%', marginRight: '3%'}}}>
            Затруднените пътни условия представляват ситуации, в които движението по пътищата става по-трудно и опасно поради различни фактори. Те могат да включват: метеорологични условия (снеговалеж, поледица, мъгла, дъжд, сняг, вятър, градушка, буря и др.), пътна инфраструктура (неработещи светофари, пътни ремонти или затворени пътища, лошо състояние на пътната настилка и др.), трафик, инциденти, животни на пътя и др.
            </Typography>

            <Typography variant="subtitle1" color="text.primary" component="div" sx={{textAlign: 'center', marginTop: '10px',fontWeight: 'bold', color: '#009F58', textDecoration: 'underline', fontSize: '20px', '@media (pointer: coarse)': {fontSize: '18px'} }}>
            Какво да правим при затруднени пътни условия?
            </Typography>

            <Typography variant="subtitle1" color="text.primary" component="div" sx={{textAlign: 'justify', marginRight: '2%', '@media (pointer: coarse)': {marginRight: '3%'}}}>
            <ol>
                <li><span style={{fontWeight: 'bold'}}>Запазете спокойствие:</span> Паниката може да доведе до грешки. Опитайте се да запазите спокойствие.</li>
                <li><span style={{fontWeight: 'bold'}}>Бъдете внимателни и нащрек:</span> Намалете скоростта и избягвайте резките маневри.</li>
                <li><span style={{fontWeight: 'bold'}}>Пазете по-голяма дистанция:</span> Поддържайте по-голяма дистанция от остналите участници в движението ако има такива.</li>
                <li><span style={{fontWeight: 'bold'}}>Използвайте сигурни места за спиране:</span> Ако трябва да спрете заради лошите условия, намерете безопасно място като паркинг, бензиностанция или специално обособена зона и информирайте близките си за своето местоположение.</li>
                <li><span style={{fontWeight: 'bold'}}>Информирайте се:</span> Слушайте местните радиостанции и други комуникационни канали за актуална информация касаеща пътната обстановка.</li>
            </ol>
            </Typography>

        </Paper>



        <Paper 
         key={"roadworks"}
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
                <ImageSrc style={{ backgroundImage: `url(/src/assets/images/categories/ROAD_CONDITIONS/roadworks.jpg)`,  backgroundPosition: 'center 10%'  }} />
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
                    Ремонтни дейности
                    </Typography>
                </Image>
                </ImageButton>
            }
            </Box>

            <Typography variant="subtitle1" color="text.primary" component="div" sx={{marginLeft: '2%', marginRight: '2%',textAlign: 'justify' ,color: 'darkblue', '@media (pointer: coarse)': {marginLeft: '3%', marginRight: '3%'}}}>
            Ремонтните дейности на пътя включват различни видове работи, свързани с поддържането, възстановяването и подобряването на пътната инфраструктура. Основната цел на тези дейности е да се осигури безопасността и удобството на движението, както и да се удължи експлоатационния срок на пътищата.
            </Typography>

            <Typography variant="subtitle1" color="text.primary" component="div" sx={{textAlign: 'center', marginTop: '10px',fontWeight: 'bold', color: '#009F58', textDecoration: 'underline', fontSize: '20px', '@media (pointer: coarse)': {fontSize: '18px'} }}>
            Какво да правим при ремонтни дейности на пътя?
            </Typography>

            <Typography variant="subtitle1" color="text.primary" component="div" sx={{textAlign: 'justify', marginRight: '2%', '@media (pointer: coarse)': {marginRight: '3%'}}}>
            <ol>
                <li><span style={{fontWeight: 'bold'}}>Следете знаците:</span> Внимателно следете пътните знаци и маркировките, които указват ремонтните дейности. Те ще ви информират за затворените участъци, пренасочвания и ограничение на скоростта.</li>
                <li><span style={{fontWeight: 'bold'}}>Намалете скоростта:</span> Намалете скоростта и бъдете подготвени за внезапни спирания или промени в движението. Ремонтните зони често са с намалена скорост заради работещите и оборудването на пътя.</li>
                <li><span style={{fontWeight: 'bold'}}>Избягвайте разсейванията:</span> Бъдете напълно концентрирани върху пътя и избягвайте разсейвания като мобилни телефони или други устройства.</li>
                <li><span style={{fontWeight: 'bold'}}>Бъдете търпеливи:</span> Ремонтните дейности са необходими за поддържането на безопасни и качествени пътища. Бъдете търпеливи и толерантни към временното неудобство.</li>
                <li><span style={{fontWeight: 'bold'}}>Бъдете внимателни при заобикаляне:</span> Ако трябва да заобиколите ремонтната зона, направете го с внимание и уважение към другите участници в движението. Избягвайте резки маневри и спазвайте правилата за предимство.</li>
            </ol>
            </Typography>

        </Paper>



        <Paper 
         key={"icy_road"}
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
                <ImageSrc style={{ backgroundImage: `url(/src/assets/images/categories/ROAD_CONDITIONS/icy_road.jpg)`,  backgroundPosition: 'center 0%'  }} />
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
                    Поледица
                    </Typography>
                </Image>
                </ImageButton>
            }
            </Box>

            <Typography variant="subtitle1" color="text.primary" component="div" sx={{marginLeft: '2%', marginRight: '2%',textAlign: 'justify' ,color: '#E50000', '@media (pointer: coarse)': {marginLeft: '3%', marginRight: '3%'}}}>
            Поледицата е слой лед, който се образува на повърхността на земята, пътища, тротоари и други повърхности, когато температурата на въздуха и повърхността е около или под нулата. Тя се получава, когато водата от дъжд, мокър сняг или мъгла замръзне върху студените повърхности. Поледицата е много опасна, защото прави повърхностите изключително хлъзгави и трудни за ходене и шофиране, което води до повишен риск от злополуки и наранявания.
            </Typography>

            <Typography variant="subtitle1" color="text.primary" component="div" sx={{textAlign: 'center', marginTop: '10px',fontWeight: 'bold', color: '#009F58', textDecoration: 'underline', fontSize: '20px', '@media (pointer: coarse)': {fontSize: '18px'} }}>
            Какво да правим при поледица?
            </Typography>

            <Typography variant="subtitle1" color="text.primary" component="div" sx={{textAlign: 'justify', marginRight: '2%', '@media (pointer: coarse)': {marginRight: '3%'}}}>
            <ol>
                <li><span style={{fontWeight: 'bold'}}>Шофирайте бавно и внимателно:</span> Намалете скоростта и шофирайте по-бавно от обичайното. Ледът може да е невидим и внезапно да изгубите контрол върху автомобила.</li>
                <li><span style={{fontWeight: 'bold'}}>Избягвайте резки маневри:</span> Избягвайте рязко спиране, ускорение или завиване. Всички действия трябва да бъдат плавни и контролирани.</li>
                <li><span style={{fontWeight: 'bold'}}>Увеличете дистанцията:</span> Поддържайте по-голяма дистанция от остналите участници в движението ако има такива.</li>
                <li><span style={{fontWeight: 'bold'}}>Избягвайте изпреварвания:</span> Изпреварванията на заледен път са изключително опасни и трябва да се избягват, освен ако не е абсолютно необходимо.</li>
                <li><span style={{fontWeight: 'bold'}}>Използвайте ниска предавка:</span> Използвайте ниска предавка, за да контролирате скоростта на автомобила без да се налага да спирате рязко.</li>
            </ol>
            </Typography>

        </Paper>
        
    </div>
  );
};