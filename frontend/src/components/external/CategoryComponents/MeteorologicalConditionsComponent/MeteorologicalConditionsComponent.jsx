import { Box, ButtonBase, Paper, Typography, styled } from "@mui/material";
import './meteorological_conditions_component.scss';

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




export const MeteorologicalConditionsComponent = () => {


  return (
    <div className="meteorological_conditions_component">

       <Paper 
        key={"fire"}
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
                <ImageSrc style={{ backgroundImage: `url(/src/assets/images/categories/METEOROLOGICAL_CONDITIONS/fire.jpg)`,  backgroundPosition: 'center 55%'  }}/>
                <ImageBackdrop className="MuiImageBackdrop-root" opacity={0.3}/>
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
                    Пожар
                    </Typography>
                </Image>
                </ImageButton>
            }
            </Box>

            <Typography variant="subtitle1" color="text.primary" component="div" sx={{marginLeft: '2%', marginRight: '2%',textAlign: 'justify' ,color: '#E50000', '@media (pointer: coarse)': {marginLeft: '3%', marginRight: '3%'}}}>
            Пожарът представлява неконтролирано горене, което причинява материални щети, застрашава живота на хора и животни и може да доведе до сериозни екологични последици. Пожарите могат да възникнат в различни среди като гори, градски зони, индустриални комплекси и домове.
            </Typography>

            <Typography variant="subtitle1" color="text.primary" component="div" sx={{textAlign: 'center', marginTop: '10px',fontWeight: 'bold', color: '#009F58', textDecoration: 'underline', fontSize: '20px', '@media (pointer: coarse)': {fontSize: '18px'} }}>
            Какво да правим при пожар?
            </Typography>

            <Typography variant="subtitle1" color="text.primary" component="div" sx={{textAlign: 'justify', marginRight: '2%', '@media (pointer: coarse)': {marginRight: '3%'}}}>
            <ol>
                <li><span style={{fontWeight: 'bold'}}>Запазете спокойствие:</span> Паниката може да доведе до грешки. Опитайте се да запазите спокойствие.</li>
                <li><span style={{fontWeight: 'bold'}}>Анализирайте пожарът:</span> Ако пожарът е малък и може да бъде потушен безопасно с помощта на наличните средства (като пожарогасител), можете да се опитате да го угасите. Ако е голям и неконтролируем, трябва незабавно да се евакуирате.</li> 
                <li><span style={{fontWeight: 'bold'}}>Евакуирайте се:</span> Незабавно се евакуирайте. Използвайте обозначените евакуационни маршрути. Никога не използвайте асансьори при евакуация по време на пожар.</li>
                <li><span style={{fontWeight: 'bold'}}>Сигнализирайте на пожарните служби:</span>  Уведомете пожарната служба на тел. 112. Дайте им точния адрес, информация за размера на пожара и дали има хора в опасност.</li>
                <li><span style={{fontWeight: 'bold'}}>Помогнете на другите:</span> Помогнете на деца, възрастни хора и хора с увреждания при евакуация. Уверете се, че всички са излезли от зоната на пожар.</li>
            </ol>
            </Typography>

        </Paper>

        <Paper 
         key={"flood"}
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
                <ImageSrc style={{ backgroundImage: `url(/src/assets/images/categories/METEOROLOGICAL_CONDITIONS/flood.jpg)`,  backgroundPosition: 'center 73.5%' }} />
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
                    Наводнение
                    </Typography>
                </Image>
                </ImageButton>
            }
            </Box>

            <Typography variant="subtitle1" color="text.primary" component="div" sx={{marginLeft: '2%', marginRight: '2%',textAlign: 'justify' ,color: '#E50000', '@media (pointer: coarse)': {marginLeft: '3%', marginRight: '3%'}}}>
            Наводнението представлява природно бедствие, при което водата от реки, езера, морета или океани прелива и залива околните територии. Това явление може да бъде причинено от различни фактори като: интензивни валежи, топене на сняг, скъсване на язовирни диги или подпорни стени, морски приливи и цунами или географски особености.
            </Typography>

            <Typography variant="subtitle1" color="text.primary" component="div" sx={{textAlign: 'center', marginTop: '10px',fontWeight: 'bold', color: '#009F58', textDecoration: 'underline', fontSize: '20px', '@media (pointer: coarse)': {fontSize: '18px'} }}>
            Какво да правим при наводнение?
            </Typography>

            <Typography variant="subtitle1" color="text.primary" component="div" sx={{textAlign: 'justify', marginRight: '2%', '@media (pointer: coarse)': {marginRight: '3%'}}}>
            <ol>
                <li><span style={{fontWeight: 'bold'}}>Запазете спокойствие:</span> Паниката може да доведе до грешки. Опитайте се да запазите спокойствие.</li>
                <li><span style={{fontWeight: 'bold'}}>Потърсете високо място:</span> Потърсете високо място и се отдалечете от реки, язовири и други водоизточници.</li>
                <li><span style={{fontWeight: 'bold'}}>Избягвайте водата:</span> Не се опитвайте да преминавате през наводнени райони с кола или пеша, тъй като водата може да бъде много дълбока или бърза.</li>
                <li><span style={{fontWeight: 'bold'}}>Изключете електричеството:</span> Ако има риск от заливане, изключете електрозахранването и газоподаването.</li>
                <li><span style={{fontWeight: 'bold'}}>Следвайте инструкциите на властите:</span> Следвайте инструкциите на местните власти и се евакуирайте, ако е необходимо.</li>
            </ol>
            </Typography>

        </Paper>


        <Paper 
         key={"rain"}
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
                <ImageSrc style={{ backgroundImage: `url(/src/assets/images/categories/METEOROLOGICAL_CONDITIONS/rain.jpg)`,  backgroundPosition: 'center 60%'  }} />
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
                    Дъжд
                    </Typography>
                </Image>
                </ImageButton>
            }
            </Box>

            <Typography variant="subtitle1" color="text.primary" component="div" sx={{marginLeft: '2%', marginRight: '2%',textAlign: 'justify' ,color: 'darkblue', '@media (pointer: coarse)': {marginLeft: '3%', marginRight: '3%'}}}>
            Дъждът е атмосферно явление, при което вода, под формата на капки, пада от облаците на земята. Този процес започва, когато водната пара във въздуха се кондензира и образува водни капки. Когато тези капки станат достатъчно големи и тежки, те започват да падат под въздействието на гравитацията.
            </Typography>

            <Typography variant="subtitle1" color="text.primary" component="div" sx={{textAlign: 'center', marginTop: '10px',fontWeight: 'bold', color: '#009F58', textDecoration: 'underline', fontSize: '20px', '@media (pointer: coarse)': {fontSize: '18px'} }}>
            Какво да правим при дъжд?
            </Typography>

            <Typography variant="subtitle1" color="text.primary" component="div" sx={{textAlign: 'justify', marginRight: '2%', '@media (pointer: coarse)': {marginRight: '3%'}}}>
            <ol>
                <li><span style={{fontWeight: 'bold'}}>Носете подходящо облекло:</span> Облечете водоустойчива дреха като дъждобран или яке. Носете ботуши или обувки, които са водоустойчиви и могат да предпазят краката ви от намокряне.</li>
                <li><span style={{fontWeight: 'bold'}}>Вземете чадър:</span> Чадърът е най-лесното и удобно средство за защита от дъжда. Изберете такъв, който е здрав и устойчив на вятър.</li>
                <li><span style={{fontWeight: 'bold'}}>Избягвайте наводнени зони:</span> Стойте далеч от ниски места, където може да се събира вода и да се образуват локви. Внимавайте за хлъзгави повърхности и кални участъци.</li>
                <li><span style={{fontWeight: 'bold'}}>Шофирайте внимателно:</span> Ако шофирате, бъдете внимателни, защото мокрите пътища могат да бъдат хлъзгави. Увеличете дистанцията до превозните средства пред вас и намалете скоростта.</li>
                <li><span style={{fontWeight: 'bold'}}>Бъдете готови за внезапни промени:</span> Дъждът може да започне изведнъж, така че винаги бъдете подготвени с резервни дрехи и обувки, ако е възможно.</li>
            </ol>
            </Typography>

        </Paper>



        <Paper 
         key={"snow"}
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
                <ImageSrc style={{ backgroundImage: `url(/src/assets/images/categories/METEOROLOGICAL_CONDITIONS/snow.jpg)`,  backgroundPosition: 'center 45%'  }} />
                <ImageBackdrop className="MuiImageBackdrop-root" opacity={0.2} />
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
                    Сняг
                    </Typography>
                </Image>
                </ImageButton>
            }
            </Box>

            <Typography variant="subtitle1" color="text.primary" component="div" sx={{marginLeft: '2%', marginRight: '2%',textAlign: 'justify' ,color: 'darkblue', '@media (pointer: coarse)': {marginLeft: '3%', marginRight: '3%'}}}>
            Снегът е валеж под формата на множество ледени кристали (снежинки), които падат от облаците на Земята. Образуването на снежинките започва високо в атмосферата, където температурите са много ниски. Водните пари кондензират около микроскопични частици, създавайки малки ледени кристали. Тези кристали се съединяват, образувайки снежинки, които могат да имат различни форми и размери. 
            </Typography>

            <Typography variant="subtitle1" color="text.primary" component="div" sx={{textAlign: 'center', marginTop: '10px',fontWeight: 'bold', color: '#009F58', textDecoration: 'underline', fontSize: '20px', '@media (pointer: coarse)': {fontSize: '18px'} }}>
            Какво да правим при снеговалеж?
            </Typography>

            <Typography variant="subtitle1" color="text.primary" component="div" sx={{textAlign: 'justify', marginRight: '2%', '@media (pointer: coarse)': {marginRight: '3%'}}}>
            <ol>
                <li><span style={{fontWeight: 'bold'}}>Останете на закрито:</span> Ако е възможно, останете вкъщи и избягвайте ненужни пътувания.</li>
                <li><span style={{fontWeight: 'bold'}}>Проверете отоплителните си източници:</span> Уверете се, че имате достатъчно ресури за отопление, и използвайте безопасни методи за отопление.</li>
                <li><span style={{fontWeight: 'bold'}}>Облечете се топло:</span> Носете подходящи дрехи, включително топли обувки, шапка, ръкавици и шал.</li>
                <li><span style={{fontWeight: 'bold'}}>Слушайте новини и предупреждения:</span> Следете локалните новини и съобщения за времето за актуализации и предупреждения.</li>
                <li><span style={{fontWeight: 'bold'}}>Бъдете внимателни на пътя:</span> Ако е наложително да шофирате или вече го правите, правете го бавно и внимателно. Спазвайте по-голяма дистанция между автомобилите и използвайте ниска предавка при изкачване и спускане по хълмове.</li>
            </ol>
            </Typography>

        </Paper>



        <Paper 
         key={"avalanche"}
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
                <ImageSrc style={{ backgroundImage: `url(/src/assets/images/categories/METEOROLOGICAL_CONDITIONS/avalanche.jpg)`,  backgroundPosition: 'center 60%'  }} />
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
                    Лавина
                    </Typography>
                </Image>
                </ImageButton>
            }
            </Box>

            <Typography variant="subtitle1" color="text.primary" component="div" sx={{marginLeft: '2%', marginRight: '2%',textAlign: 'justify' ,color: '#E50000', '@media (pointer: coarse)': {marginLeft: '3%', marginRight: '3%'}}}>
            Лавината е внезапно, бързо свличане на снежна маса надолу по планински склон.  Това е опасно природно явление, което може да причини значителни щети и да застраши живота на хората. Причина за появата ѝ могат да бъдат както природни условия, така и човешка дейност. Обикновено се формират в планинските терени. Мощните лавини притежават способността да завлекат със себе си лед, отломки от скали, дървета и други материали по склона.
            </Typography>

            <Typography variant="subtitle1" color="text.primary" component="div" sx={{textAlign: 'center', marginTop: '10px',fontWeight: 'bold', color: '#009F58', textDecoration: 'underline', fontSize: '20px', '@media (pointer: coarse)': {fontSize: '18px'} }}>
            Какво да правим при лавина?
            </Typography>

            <Typography variant="subtitle1" color="text.primary" component="div" sx={{textAlign: 'justify', marginRight: '2%', '@media (pointer: coarse)': {marginRight: '3%'}}}>
            <ol>
                <li><span style={{fontWeight: 'bold'}}>Останете спокойни:</span> Паниката може да намали способността ви да мислите и да реагирате бързо. Опитайте се да останете спокойни и да се фокусирате върху действията, които трябва да предприемете.</li>
                <li><span style={{fontWeight: 'bold'}}>Изхвърлете тежкото оборудване:</span> Ако носите тежка екипировка, като раница или ски, и имате възможност, изхвърлете ги, за да увеличите шансовете си да се движите по-бързо и по-леко.</li>
                <li><span style={{fontWeight: 'bold'}}>Опитайте се да останете на повърхността:</span> Правете плувателни движения, за да се задържите на повърхността на снега. Това може да ви помогне да избегнете затрупване под дълбокия сняг.</li>
                <li><span style={{fontWeight: 'bold'}}>Защитете лицето си:</span> Сложете ръцете си пред лицето, за да създадете въздушен джоб, който да ви позволи да дишате, ако бъдете затрупани. Опитайте се да оформите пространство около устата и носа си, което ще ви помогне да дишате по-лесно.</li>
                <li><span style={{fontWeight: 'bold'}}>Опитайте се да сигнализирате:</span> Ако сте затрупани, опитайте се да издадете звук или да използвате лавинен маяк, ако разполагате с такъв. Това може да помогне на спасителите да ви намерят по-бързо.</li>
            </ol>
            </Typography>

        </Paper>



        <Paper 
         key={"hail"}
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
                <ImageSrc style={{ backgroundImage: `url(/src/assets/images/categories/METEOROLOGICAL_CONDITIONS/hail.jpg)` }} />
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
                    Градушка
                    </Typography>
                </Image>
                </ImageButton>
            }
            </Box>

            <Typography variant="subtitle1" color="text.primary" component="div" sx={{marginLeft: '2%', marginRight: '2%',textAlign: 'justify' ,color: '#E50000', '@media (pointer: coarse)': {marginLeft: '3%', marginRight: '3%'}}}>
            Градушката (или град) е вид атмосферен валеж, състоящ се от сферични частици или късчета лед с размери от 5 до 55 mm, а понякога и повече (наблюдавани са градоносни зърна с размери до 130 mm и маса около 1 kg). Те се образуват в буреносните облаци, когато водните капки се издигат нагоре в атмосферата и се замразяват. Този процес продължава, докато ледените късове станат прекалено тежки за възходящите течения и започнат да падат на земята.
            </Typography>

            <Typography variant="subtitle1" color="text.primary" component="div" sx={{textAlign: 'center', marginTop: '10px',fontWeight: 'bold', color: '#009F58', textDecoration: 'underline', fontSize: '20px', '@media (pointer: coarse)': {fontSize: '18px'} }}>
            Какво да правим при градушка?
            </Typography>

            <Typography variant="subtitle1" color="text.primary" component="div" sx={{textAlign: 'justify', marginRight: '2%', '@media (pointer: coarse)': {marginRight: '3%'}}}>
            <ol>
                <li><span style={{fontWeight: 'bold'}}>Стойте на закрито:</span> Най-сигурното място по време на градушка е вътре в сграда. Избягвайте да бъдете навън.</li>
                <li><span style={{fontWeight: 'bold'}}>Отдалечете се от прозорците:</span> Ледените зърна могат да счупят стъклата и да причинят наранявания. Затворете всички прозорци и врати.</li>
                <li><span style={{fontWeight: 'bold'}}>Изключете електрическите уреди:</span> Ако градушката е придружена от гръмотевици, изключете електрическите уреди, за да предотвратите повреди от електрически разряди.</li>
                <li><span style={{fontWeight: 'bold'}}>Защитете домашните си любимци:</span> Ако имате домашни любимци, уверете се, че и те са на сигурно място вътре.</li>
                <li><span style={{fontWeight: 'bold'}}>Избягвайте дървета и открити места:</span> Дърветата и откритите места не са безопасни по време на градушка, тъй като ледът може да падне с висока скорост и да ви нарани.</li>
            </ol>
            </Typography>

        </Paper>



        <Paper 
         key={"wind"}
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
                <ImageSrc style={{ backgroundImage: `url(/src/assets/images/categories/METEOROLOGICAL_CONDITIONS/wind.jpg)`,  backgroundPosition: 'center 70%'  }} />
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
                    Вятър
                    </Typography>
                </Image>
                </ImageButton>
            }
            </Box>

            <Typography variant="subtitle1" color="text.primary" component="div" sx={{marginLeft: '2%', marginRight: '2%',textAlign: 'justify' ,color: 'darkblue', '@media (pointer: coarse)': {marginLeft: '3%', marginRight: '3%'}}}>
            Вятърът представлява движение на въздушните маси от места с високо към места с ниско атмосферно налягане. При вятър въздухът се движи в две направления спрямо земята – хоризонтално и вертикално. В България ветровете са предимно хоризонтални поради географските особености на района.
            </Typography>

            <Typography variant="subtitle1" color="text.primary" component="div" sx={{textAlign: 'center', marginTop: '10px',fontWeight: 'bold', color: '#009F58', textDecoration: 'underline', fontSize: '20px', '@media (pointer: coarse)': {fontSize: '18px'} }}>
            Какво да правим при силен вятър?
            </Typography>

            <Typography variant="subtitle1" color="text.primary" component="div" sx={{textAlign: 'justify', marginRight: '2%', '@media (pointer: coarse)': {marginRight: '3%'}}}>
            <ol>                
                <li><span style={{fontWeight: 'bold'}}>Стойте на закрито:</span> Най-сигурното място по време на силен вятър е вътре в сграда. Избягвайте да бъдете навън.</li>
                <li><span style={{fontWeight: 'bold'}}>Закрийте прозорците и вратите:</span> Затворете и, ако е необходимо, укрепете прозорците и вратите, за да предотвратите счупване и наранявания от летящи стъкла или предмети.</li>
                <li><span style={{fontWeight: 'bold'}}>Запасете се с храна и вода:</span> Уверете се, че имате достатъчно запаси от храна и вода за няколко дни.</li>
                <li><span style={{fontWeight: 'bold'}}>Следете прогнозите за времето:</span> Редовно проверявайте прогнозата за времето и предупрежденията за силен вятър във вашия район.</li>
                <li><span style={{fontWeight: 'bold'}}>Избягвайте открити пространства:</span> Не оставайте на открити пространства, където вятърът може да ви удари с пълна сила.</li>
            </ol>
            </Typography>

        </Paper>



        <Paper 
         key={"hurricane"}
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
                <ImageSrc style={{ backgroundImage: `url(/src/assets/images/categories/METEOROLOGICAL_CONDITIONS/hurricane.jpg)`,  backgroundPosition: 'center 75%'  }} />
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
                    Ураган
                    </Typography>
                </Image>
                </ImageButton>
            }
            </Box>

            <Typography variant="subtitle1" color="text.primary" component="div" sx={{marginLeft: '2%', marginRight: '2%',textAlign: 'justify' ,color: '#E50000', '@media (pointer: coarse)': {marginLeft: '3%', marginRight: '3%'}}}>
            Ураганът е природно явление, което се характеризира като мощна тропическа циклонна буря с изключителна скорост на вятъра. Най-често ураганът наподобява сбор от въздушни течения под формата на фуния, която е перпендикулярна на земната повърхност и засмуква всичко около себе си, в зависимост от диаметъра си. В България това е рядко срещано явление.
            </Typography>

            <Typography variant="subtitle1" color="text.primary" component="div" sx={{textAlign: 'center', marginTop: '10px',fontWeight: 'bold', color: '#009F58', textDecoration: 'underline', fontSize: '20px', '@media (pointer: coarse)': {fontSize: '18px'} }}>
            Какво да правим при ураган?
            </Typography>

            <Typography variant="subtitle1" color="text.primary" component="div" sx={{textAlign: 'justify', marginRight: '2%', '@media (pointer: coarse)': {marginRight: '3%'}}}>
            <ol>
                <li><span style={{fontWeight: 'bold'}}>Останете спокойни:</span> Опитайте се да запазите спокойствие. Паниката може да влоши ситуацията.</li>
                <li><span style={{fontWeight: 'bold'}}>Намерете прикритие:</span> Не излизайте навън по време на ураган. Намерете най-безопасното място в дома си, далеч от прозорци и външни стени. Мазета и подземни помещения са за предпочитане.</li>
                <li><span style={{fontWeight: 'bold'}}>Бъдете подготвени за евакуация:</span> Ако местните власти издадат заповед за евакуация, следвайте инструкциите и напуснете дома си незабавно.</li>
                <li><span style={{fontWeight: 'bold'}}>Бъдете информирани:</span> Следете локалните новини и съобщения за времето за актуализации и предупреждения.</li>                
                <li><span style={{fontWeight: 'bold'}}>Изчакайте официално разрешение:</span> Не излизайте навън, докато властите не обявят, че е безопасно.</li>
            </ol>
            </Typography>

        </Paper>



        <Paper 
         key={"smerch"}
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
                <ImageSrc style={{ backgroundImage: `url(/src/assets/images/categories/METEOROLOGICAL_CONDITIONS/smerch.png)`,  backgroundPosition: 'center 40%'  }} />
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
                    Смерч
                    </Typography>
                </Image>
                </ImageButton>
            }
            </Box>

            <Typography variant="subtitle1" color="text.primary" component="div" sx={{marginLeft: '2%', marginRight: '2%',textAlign: 'justify' ,color: '#E50000', '@media (pointer: coarse)': {marginLeft: '3%', marginRight: '3%'}}}>
            Смерчът, е изключително силен и разрушителен въртящ се вихър, който се спуска от буреносен облак и достига до земната повърхност. Той представлява вертикална колона (фуния) от въздух, която се върти с висока скорост около своята ос. Вятърът във вътрешността на смерча може да достигне скорости над 300 км/ч, което го прави изключително разрушителен. За разлика от урагана, смерчът обикновено трае няколко минути и диаметърът му е значително по-малък. Въпреки това, смерчовете са често срещано явление в България, но биват рядко документирани, поради своята краткотрайност.
            </Typography>

            <Typography variant="subtitle1" color="text.primary" component="div" sx={{textAlign: 'center', marginTop: '10px',fontWeight: 'bold', color: '#009F58', textDecoration: 'underline', fontSize: '20px', '@media (pointer: coarse)': {fontSize: '18px'} }}>
            Какво да правим при смерч?
            </Typography>

            <Typography variant="subtitle1" color="text.primary" component="div" sx={{textAlign: 'justify', marginRight: '2%', '@media (pointer: coarse)': {marginRight: '3%'}}}>
            <ol>
                <li><span style={{fontWeight: 'bold'}}>Останете спокойни:</span> Опитайте се да запазите спокойствие. Паниката може да влоши ситуацията.</li>
                <li><span style={{fontWeight: 'bold'}}>Намерете прикритие:</span> Не излизайте навън по време на смерч. Намерете най-безопасното място в дома си, далеч от прозорци и външни стени. Мазета и подземни помещения са за предпочитане.</li>
                <li><span style={{fontWeight: 'bold'}}>Бъдете подготвени за евакуация:</span> Ако местните власти издадат заповед за евакуация, следвайте инструкциите и напуснете дома си незабавно.</li>
                <li><span style={{fontWeight: 'bold'}}>Бъдете информирани:</span> Следете локалните новини и съобщения за времето за актуализации и предупреждения.</li>                
                <li><span style={{fontWeight: 'bold'}}>Изчакайте официално разрешение:</span> Не излизайте навън, докато властите не обявят, че е безопасно.</li>
            </ol>
            </Typography>

        </Paper>



        <Paper 
         key={"fog"}
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
                <ImageSrc style={{ backgroundImage: `url(/src/assets/images/categories/METEOROLOGICAL_CONDITIONS/fog.jpg)`,  backgroundPosition: 'center 85%'  }} />
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
                    Мъгла
                    </Typography>
                </Image>
                </ImageButton>
            }
            </Box>

            <Typography variant="subtitle1" color="text.primary" component="div" sx={{marginLeft: '2%', marginRight: '2%',textAlign: 'justify' ,color: 'darkblue', '@media (pointer: coarse)': {marginLeft: '3%', marginRight: '3%'}}}>
            Мъглата представлява кондензирала водна пара. С други думи, тя е облак, който започва от земната повърхност и намалява видимостта значително. Мъгли се образуват и при изпарение от топла и влажна повърхност в студен приземен въздух. Тези мъгли са характерни главно за преходните сезони (пролет и есен) и се наблюдават в райони, богати на реки, езера и блата.
            </Typography>

            <Typography variant="subtitle1" color="text.primary" component="div" sx={{textAlign: 'center', marginTop: '10px',fontWeight: 'bold', color: '#009F58', textDecoration: 'underline', fontSize: '20px', '@media (pointer: coarse)': {fontSize: '18px'} }}>
            Какво да правим при мъгла?
            </Typography>

            <Typography variant="subtitle1" color="text.primary" component="div" sx={{textAlign: 'justify', marginRight: '2%', '@media (pointer: coarse)': {marginRight: '3%'}}}>
            <ol>
                <li><span style={{fontWeight: 'bold'}}>Бъдете видими:</span> Носете светлоотразителни дрехи или аксесоари, за да бъдете видими за шофьорите.</li>
                <li><span style={{fontWeight: 'bold'}}>Следете за движение:</span> Внимавайте за автомобили и други превозни средства, тъй като те може да не ви видят навреме.</li>
                <li><span style={{fontWeight: 'bold'}}>Намалете скоростта:</span> Шофирайте по-бавно, за да имате време за реакция при намалена видимост.</li>
                <li><span style={{fontWeight: 'bold'}}>Използвайте маркировките на пътя:</span> Следете пътната маркировка, за да се ориентирате по-лесно.</li>                
                <li><span style={{fontWeight: 'bold'}}>Спиране при необходимост:</span> Ако видимостта е изключително ниска, спрете на безопасно място извън пътното платно и изчакайте мъглата да се разсее.</li>
            </ol>
            </Typography>

        </Paper>



        <Paper 
         key={"storm"}
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
                <ImageSrc style={{ backgroundImage: `url(/src/assets/images/categories/METEOROLOGICAL_CONDITIONS/storm.jpg)`,  backgroundPosition: 'center 85%'  }} />
                <ImageBackdrop className="MuiImageBackdrop-root" opacity={0.2} />
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
                    Буря
                    </Typography>
                </Image>
                </ImageButton>
            }
            </Box>

            <Typography variant="subtitle1" color="text.primary" component="div" sx={{marginLeft: '2%', marginRight: '2%',textAlign: 'justify' ,color: '#E50000', '@media (pointer: coarse)': {marginLeft: '3%', marginRight: '3%'}}}>
            Бурята е метеорологично явление, свързано със силно раздвижване на атмосферата, засягащо земната повърхност. То може да включва силен вятър, гръмотевици и светкавици, силни валежи, снеговалежи, градушка или различни материали, носени от вятъра (пясъчна буря, снежна буря и други).
            </Typography>

            <Typography variant="subtitle1" color="text.primary" component="div" sx={{textAlign: 'center', marginTop: '10px',fontWeight: 'bold', color: '#009F58', textDecoration: 'underline', fontSize: '20px', '@media (pointer: coarse)': {fontSize: '18px'} }}>
            Какво да правим при буря?
            </Typography>

            <Typography variant="subtitle1" color="text.primary" component="div" sx={{textAlign: 'justify', marginRight: '2%', '@media (pointer: coarse)': {marginRight: '3%'}}}>
            <ol>
                <li><span style={{fontWeight: 'bold'}}>Стойте на закрито:</span> Най-сигурното място по време на буря е вътре в сграда. Избягвайте да бъдете навън.</li>
                <li><span style={{fontWeight: 'bold'}}>Закрийте прозорците и вратите:</span> Затворете и, ако е необходимо, укрепете прозорците и вратите, за да предотвратите счупване и наранявания от летящи стъкла или предмети.</li>
                <li><span style={{fontWeight: 'bold'}}>Запасете се с храна и вода:</span> Уверете се, че имате достатъчно запаси от храна и вода за няколко дни.</li>
                <li><span style={{fontWeight: 'bold'}}>Следете прогнозите за времето:</span> Редовно проверявайте прогнозата за времето и предупрежденията за бури във вашия район.</li>
                <li><span style={{fontWeight: 'bold'}}>Избягвайте открити пространства:</span> Не оставайте на открити пространства, където бурята може да застраши живота и здравето ви.</li>
            </ol>
            </Typography>

        </Paper>


        
        <Paper 
         key={"thunderstorm"}
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
                <ImageSrc style={{ backgroundImage: `url(/src/assets/images/categories/METEOROLOGICAL_CONDITIONS/thunderstorm.jpg)`,  backgroundPosition: 'center 40%'  }} />
                <ImageBackdrop className="MuiImageBackdrop-root" opacity={0.2} />
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
                    Гръмотевична буря
                    </Typography>
                </Image>
                </ImageButton>
            }
            </Box>

            <Typography variant="subtitle1" color="text.primary" component="div" sx={{marginLeft: '2%', marginRight: '2%',textAlign: 'justify' ,color: '#E50000', '@media (pointer: coarse)': {marginLeft: '3%', marginRight: '3%'}}}>
            Гръмотевичната буря е буря, която се характеризира с наличието на мълнии и придружаващите ги гръмотевици. Гръмотевичните бури се образуват в купесто-дъждовни облаци. Те обикновено са придружавани от силни ветрове и обилен валеж (дъжд, понякога сняг, суграшица или градушка), макар да е възможно гръмотевичните бури да са напълно сухи.
            </Typography>

            <Typography variant="subtitle1" color="text.primary" component="div" sx={{textAlign: 'center', marginTop: '10px',fontWeight: 'bold', color: '#009F58', textDecoration: 'underline', fontSize: '20px', '@media (pointer: coarse)': {fontSize: '18px'} }}>
            Какво да правим при гръмотевична буря?
            </Typography>

            <Typography variant="subtitle1" color="text.primary" component="div" sx={{textAlign: 'justify', marginRight: '2%', '@media (pointer: coarse)': {marginRight: '3%'}}}>
            <ol>
                <li><span style={{fontWeight: 'bold'}}>Стойте на закрито:</span> Най-сигурното място по време на гръмотевична буря е вътре в сграда. Избягвайте да бъдете навън.</li>
                <li><span style={{fontWeight: 'bold'}}>Закрийте прозорците и вратите:</span> Затворете и, ако е необходимо, укрепете прозорците и вратите, за да предотвратите счупване и наранявания от летящи стъкла или предмети.</li>
                <li><span style={{fontWeight: 'bold'}}>Запасете се с храна и вода:</span> Уверете се, че имате достатъчно запаси от храна и вода за няколко дни.</li>
                <li><span style={{fontWeight: 'bold'}}>Следете прогнозите за времето:</span> Редовно проверявайте прогнозата за времето и предупрежденията за гръмотевични бури във вашия район.</li>
                <li><span style={{fontWeight: 'bold'}}>Избягвайте открити пространства:</span> Не оставайте на открити пространства, където мълнии могат да ви ударят.</li>
            </ol>
            </Typography>

        </Paper>



        <Paper 
         key={"low_temperatures"}
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
                <ImageSrc style={{ backgroundImage: `url(/src/assets/images/categories/METEOROLOGICAL_CONDITIONS/low_temperatures.jpg)`,  backgroundPosition: 'center 60%'  }} />
                <ImageBackdrop className="MuiImageBackdrop-root" opacity={0.2} />
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
                    Ниски температури
                    </Typography>
                </Image>
                </ImageButton>
            }
            </Box>

            <Typography variant="subtitle1" color="text.primary" component="div" sx={{marginLeft: '2%', marginRight: '2%',textAlign: 'justify' ,color: '#E50000', '@media (pointer: coarse)': {marginLeft: '3%', marginRight: '3%'}}}>
            Ниските температури в България обикновенно са характерни за зимния сезон, но в планинските райони обичайно се запазват и през останалата част от годината. Нощното застудяване също е фактор. Обикновено спадовете идват през нощта, когато слънцето отсъства и земната повърхност излъчва топлина обратно в космоса, което води до понижаване на температурата на въздуха.
            </Typography>

            <Typography variant="subtitle1" color="text.primary" component="div" sx={{textAlign: 'center', marginTop: '10px',fontWeight: 'bold', color: '#009F58', textDecoration: 'underline', fontSize: '20px', '@media (pointer: coarse)': {fontSize: '18px'} }}>
            Какво да правим при ниски температури?
            </Typography>

            <Typography variant="subtitle1" color="text.primary" component="div" sx={{textAlign: 'justify', marginRight: '2%', '@media (pointer: coarse)': {marginRight: '3%'}}}>
            <ol>
                <li><span style={{fontWeight: 'bold'}}>Останете сухи:</span> Влагата отвежда топлината от тялото ви много по-бързо от въздуха.  Преоблечете се със сухи дрехи, ако се намокрят.</li>
                <li><span style={{fontWeight: 'bold'}}>Пазете крайниците и главата:</span> Главата, ръцете и краката губят топлина по-бързо от останалата част на тялото ви. Носете шапка, ръкавици и чорапи, които са топли и водоустойчиви.</li>
                <li><span style={{fontWeight: 'bold'}}>Движете се умерено:</span> Лекото движение ще ви помогне да се затоплите, но избягвайте прекомерното изпотяване, тъй като това може да доведе до загуба на топлина.</li>
                <li><span style={{fontWeight: 'bold'}}>Яжте и пийте:</span> Тялото ви се нуждае от енергия, за да произвежда топлина. Яжте хранителни храни и пийте топли напитки, за да поддържате вътрешната си температура.</li>
                <li><span style={{fontWeight: 'bold'}}>Избягвайте открити пространства:</span> Не оставайте на открити пространства, където студът може да окаже влияние върху вашето здраве.</li>
            </ol>
            </Typography>

        </Paper>



        <Paper 
         key={"high_temperatures"}
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
                <ImageSrc style={{ backgroundImage: `url(/src/assets/images/categories/METEOROLOGICAL_CONDITIONS/high_temperatures.jpg)`,  backgroundPosition: 'center 45%'  }} />
                <ImageBackdrop className="MuiImageBackdrop-root" opacity={0.2} />
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
                    Високи температури
                    </Typography>
                </Image>
                </ImageButton>
            }
            </Box>

            <Typography variant="subtitle1" color="text.primary" component="div" sx={{marginLeft: '2%', marginRight: '2%',textAlign: 'justify' ,color: '#E50000', '@media (pointer: coarse)': {marginLeft: '3%', marginRight: '3%'}}}>
            Високите температури в България обикновенно са характерни за лятото. Колкото повече слънчева светлина достига до земната повърхност, толкова по-висока става температурата на въздуха. Влажността влияе върху това колко комфортно се усеща дадена температура. По-високата влажност може да направи горещото време да се чувства още по-горещо.
            </Typography>

            <Typography variant="subtitle1" color="text.primary" component="div" sx={{textAlign: 'center', marginTop: '10px',fontWeight: 'bold', color: '#009F58', textDecoration: 'underline', fontSize: '20px', '@media (pointer: coarse)': {fontSize: '18px'} }}>
            Какво да правим при високи температури?
            </Typography>

            <Typography variant="subtitle1" color="text.primary" component="div" sx={{textAlign: 'justify', marginRight: '2%', '@media (pointer: coarse)': {marginRight: '3%'}}}>
            <ol>
                <li><span style={{fontWeight: 'bold'}}>Останете хидратирани:</span> Пийте много вода през целия ден, дори ако не чувствате жажда. Водата е от решаващо значение за регулиране на телесната температура.</li>
                <li><span style={{fontWeight: 'bold'}}>Облечете се леко и прохладно:</span> Избирайте светли, свободни дрехи от естествени материи като памук или лен. Тези материали позволяват на въздуха да циркулира и ще ви помогнат да се чувствате по-прохладни.</li>
                <li><span style={{fontWeight: 'bold'}}>Потърсете сянка:</span> Ограничете времето си на пряка слънчева светлина, особено през най-горещите часове на деня (обикновено между 10:00 и 16:00 часа). Потърсете сянка под дървета, чадър или навес.</li>
                <li><span style={{fontWeight: 'bold'}}>Вземете хладък душ или вана:</span> Понижаването на телесната температура за кратко време може да ви помогне да се чувствате по-добре в горещо време.</li>
                <li><span style={{fontWeight: 'bold'}}>Носете шапка и слънцезащитен крем:</span> Защитете главата и кожата си от вредните UV лъчи на слънцето. Носете шапка с широка периферия и слънцезащитен крем.</li>
            </ol>
            </Typography>

        </Paper>



        <Paper 
         key={"polluted_air"}
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
                <ImageSrc style={{ backgroundImage: `url(/src/assets/images/categories/METEOROLOGICAL_CONDITIONS/POLLUTED_AIR.jpg)`,  backgroundPosition: 'center 40%'  }} />
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
                    Замърсен въздух
                    </Typography>
                </Image>
                </ImageButton>
            }
            </Box>

            <Typography variant="subtitle1" color="text.primary" component="div" sx={{marginLeft: '2%', marginRight: '2%',textAlign: 'justify' ,color: '#E50000', '@media (pointer: coarse)': {marginLeft: '3%', marginRight: '3%'}}}>
            Замърсяването на въздуха е общ термин за състояние, при което във въздуха са внесени химически и биологични вещества, които не влизат в естествения му състав, или количеството на съставка, съдържаща се в естествения му състав е прекомерно високо. Замърсеният въздух може да предизвика здравословни проблеми, така че е важно да вземете мерки, за да се предпазите.
            </Typography>

            <Typography variant="subtitle1" color="text.primary" component="div" sx={{textAlign: 'center', marginTop: '10px',fontWeight: 'bold', color: '#009F58', textDecoration: 'underline', fontSize: '20px', '@media (pointer: coarse)': {fontSize: '18px'} }}>
            Какво да правим при замърсен въздух?
            </Typography>

            <Typography variant="subtitle1" color="text.primary" component="div" sx={{textAlign: 'justify', marginRight: '2%', '@media (pointer: coarse)': {marginRight: '3%'}}}>
            <ol>
                <li><span style={{fontWeight: 'bold'}}>Следете за качеството на въздуха:</span> Проверявайте прогнозите за качеството на въздуха, за да знаете колко замърсен е въздухът навън. </li>
                <li><span style={{fontWeight: 'bold'}}>Ограничете времето си на открито:</span> Когато качеството на въздуха е лошо, по възможност останете на закрито.</li>
                <li><span style={{fontWeight: 'bold'}}>Носете маска за лице:</span> Носенето на маска може да помогне за филтриране на някои от замърсителите във въздуха.  Имайте предвид, че не всички маски са еднакви, а някои модели може да са по-ефективни от други.</li>
                <li><span style={{fontWeight: 'bold'}}>Пречистете въздуха в дома си:</span> Инвестирайте в пречиствател за въздух, който може да помогне за премахване на замърсителите от въздуха в дома ви.  Използвайте го особено когато прекарвате повече време на закрито.</li>
                <li><span style={{fontWeight: 'bold'}}>Поддържайте добра имунна система:</span> Яжте здравословна храна, пийте достатъчно вода и се наспивайте добре.  Поддържането на силна имунна система може да ви помогне да се предпазите от здравословни проблеми, причинени от замърсен въздух.</li>
            </ol>
            </Typography>

        </Paper>
        
    </div>
  );
};