import { Box, ButtonBase, Paper, Typography, styled } from "@mui/material";
import './military_conditions_component.scss';

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




export const MilitaryConditionsComponent = () => {


  return (
    <div className="military_conditions_component">

       <Paper 
        key={"infantry_attack"}
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
                <ImageSrc style={{ backgroundImage: `url(/src/assets/images/categories/MILITARY_CONDITIONS/infantry_attack.jpg)` }}/>
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
                    Сухоземно нападение
                    </Typography>
                </Image>
                </ImageButton>
            }
            </Box>

            <Typography variant="subtitle1" color="text.primary" component="div" sx={{marginLeft: '2%', marginRight: '2%',textAlign: 'justify' ,color: '#E50000', '@media (pointer: coarse)': {marginLeft: '3%', marginRight: '3%'}}}>
            Военното нападение по суша представлява организирано и координирано военно действие, при което въоръжени сили настъпват и атакуват противника на територията, контролирана от него. Такова нападение може да включва различни видове войски и оборудване, както и множество тактически и стратегически елементи.
            </Typography>

            <Typography variant="subtitle1" color="text.primary" component="div" sx={{textAlign: 'center', marginTop: '10px',fontWeight: 'bold', color: '#009F58', textDecoration: 'underline', fontSize: '20px', '@media (pointer: coarse)': {fontSize: '18px'} }}>
            Какво да правим при сухоземно нападение?
            </Typography>

            <Typography variant="subtitle1" color="text.primary" component="div" sx={{textAlign: 'justify', marginRight: '2%', '@media (pointer: coarse)': {marginRight: '3%'}}}>
            <ol>
                <li><span style={{fontWeight: 'bold'}}>Запазете спокойствие:</span> Опитайте се да запазите спокойствие и да останете хлъднокръвни. Паниката може да доведе до неадекватни действия и грешки.</li>
                <li><span style={{fontWeight: 'bold'}}>Потърсете убежище:</span> Ако сте в сграда, намерете вътрешно помещение, далеч от прозорци и външни стени. Подземни помещения като мазета са за предпочитане.</li> 
                <li><span style={{fontWeight: 'bold'}}>Избягвайте открити пространства:</span> Ако сте навън, опитайте се да намерите прикритие бързо – зад стени, в окопи или други защитени места.</li>
                <li><span style={{fontWeight: 'bold'}}>Следвайте инструкциите на властите:</span> Ако има официални съобщения и инструкции от властите, следвайте ги стриктно.</li>
                <li><span style={{fontWeight: 'bold'}}>Поддържайте връзка:</span> Опитайте се да останете в контакт с близките си и ги информирайте за своето местоположение и състояние.</li>
            </ol>
            </Typography>

        </Paper>

        <Paper 
         key={"air_attack"}
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
                <ImageSrc style={{ backgroundImage: `url(/src/assets/images/categories/MILITARY_CONDITIONS/air_attack.jpg)`,  backgroundPosition: 'center 75%' }} />
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
                    Въздушно нападение
                    </Typography>
                </Image>
                </ImageButton>
            }
            </Box>

            <Typography variant="subtitle1" color="text.primary" component="div" sx={{marginLeft: '2%', marginRight: '2%',textAlign: 'justify' ,color: '#E50000', '@media (pointer: coarse)': {marginLeft: '3%', marginRight: '3%'}}}>
            Военното нападение по въздух представлява организирано и координирано военно действие, при което въздушни сили атакуват цели на противника от въздуха. Това включва различни видове летателни апарати като самолети, хеликоптери, бомбардировачи и безпилотни летателни апарати (дронове), както и различни тактики и стратегии.
            </Typography>

            <Typography variant="subtitle1" color="text.primary" component="div" sx={{textAlign: 'center', marginTop: '10px',fontWeight: 'bold', color: '#009F58', textDecoration: 'underline', fontSize: '20px', '@media (pointer: coarse)': {fontSize: '18px'} }}>
            Какво да правим при въздушно нападение?
            </Typography>

            <Typography variant="subtitle1" color="text.primary" component="div" sx={{textAlign: 'justify', marginRight: '2%', '@media (pointer: coarse)': {marginRight: '3%'}}}>
            <ol>
                <li><span style={{fontWeight: 'bold'}}>Потърсете прикритие:</span> Ако чуете сирени или предупреждения за въздушна атака, незабавно намерете най-близкото убежище или подслон. Подземни помещения като мазета или специално изградени бомбоубежища са за предпочитане.</li>
                <li><span style={{fontWeight: 'bold'}}>Избягвайте прозорци и външни стени:</span> Стойте далеч от прозорци и външни стени, които могат да се счупят и да причинят наранявания.</li>
                <li><span style={{fontWeight: 'bold'}}>Обезопасете заобикалящите ви уреди:</span> Ако имате време, изключете газопроводите и електричеството, за да предотвратите пожари и експлозии.</li>
                <li><span style={{fontWeight: 'bold'}}>Следвайте инструкциите на властите:</span> Слушайте местните радиостанции и други комуникационни канали за актуална информация и инструкции.</li>
                
                <li><span style={{fontWeight: 'bold'}}>Останете на безопасно място:</span> Не напускайте безопасното си място, докато не получите официално разрешение от властите.</li>
            </ol>
            </Typography>

        </Paper>


        <Paper 
         key={"naval_attack"}
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
                <ImageSrc style={{ backgroundImage: `url(/src/assets/images/categories/MILITARY_CONDITIONS/naval_attack.jpg)`,  backgroundPosition: 'center 57%'  }} />
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
                    Морско нападение
                    </Typography>
                </Image>
                </ImageButton>
            }
            </Box>

            <Typography variant="subtitle1" color="text.primary" component="div" sx={{marginLeft: '2%', marginRight: '2%',textAlign: 'justify' ,color: '#E50000', '@media (pointer: coarse)': {marginLeft: '3%', marginRight: '3%'}}}>
            Военното нападение по вода представлява организирано и координирано военно действие, при което военноморските сили атакуват вражески цели по море и крайбрежни области. Това включва използване на различни видове кораби, подводници, амфибийни превозни средства и авиация.
            </Typography>

            <Typography variant="subtitle1" color="text.primary" component="div" sx={{textAlign: 'center', marginTop: '10px',fontWeight: 'bold', color: '#009F58', textDecoration: 'underline', fontSize: '20px', '@media (pointer: coarse)': {fontSize: '18px'} }}>
            Какво да правим при морско нападение?
            </Typography>

            <Typography variant="subtitle1" color="text.primary" component="div" sx={{textAlign: 'justify', marginRight: '2%', '@media (pointer: coarse)': {marginRight: '3%'}}}>
            <ol>
                <li><span style={{fontWeight: 'bold'}}>Запазете спокойствие:</span> Паниката може да доведе до грешки. Опитайте се да запазите спокойствие и следвайте плана за евакуация на властите.</li>
                <li><span style={{fontWeight: 'bold'}}>Слушайте предупрежденията:</span> Ако чуете сирени или други предупреждения за морско нападение, незабавно следвайте инструкциите на властите.</li>
                <li><span style={{fontWeight: 'bold'}}>Избягвайте крайбрежните зони:</span> Ако сте близо до морето или река, незабавно се отдалечете и потърсете по-високо и безопасно място.</li>
                <li><span style={{fontWeight: 'bold'}}>Потърсете подслон:</span> Ако сте на лодка или кораб, опитайте се да се отдалечите от зоната на конфликт и да намерите безопасно пристанище. Ако сте на брега, намерете сигурно убежище, далеч от видими морски обекти.</li>
                <li><span style={{fontWeight: 'bold'}}>Останете на безопасно място:</span> Не напускайте безопасното си място, докато не получите официално разрешение от властите.</li>
            </ol>
            </Typography>

        </Paper>



        <Paper 
         key={"bomb"}
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
                <ImageSrc style={{ backgroundImage: `url(/src/assets/images/categories/MILITARY_CONDITIONS/bomb.jpg)`,  backgroundPosition: 'center 50%'  }} />
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
                    Бомба
                    </Typography>
                </Image>
                </ImageButton>
            }
            </Box>

            <Typography variant="subtitle1" color="text.primary" component="div" sx={{marginLeft: '2%', marginRight: '2%',textAlign: 'justify' ,color: '#E50000', '@media (pointer: coarse)': {marginLeft: '3%', marginRight: '3%'}}}>
            Нападението с бомба представлява използване на експлозивно устройство за нанасяне на щети от огромен мащаб. Целите на нападението с бомба са най-често военни обекти, мостове, пътища, железопътни линии, енергийни съоражения, градски зони, търговски центрове, жилищни сгради и най-вече човешки животи.
            </Typography>

            <Typography variant="subtitle1" color="text.primary" component="div" sx={{textAlign: 'center', marginTop: '10px',fontWeight: 'bold', color: '#009F58', textDecoration: 'underline', fontSize: '20px', '@media (pointer: coarse)': {fontSize: '18px'} }}>
            Какво да правим при сигнал за бомба?
            </Typography>

            <Typography variant="subtitle1" color="text.primary" component="div" sx={{textAlign: 'justify', marginRight: '2%', '@media (pointer: coarse)': {marginRight: '3%'}}}>
            <ol>
                <li><span style={{fontWeight: 'bold'}}>Запазете спокойствие:</span> Паниката може да доведе до грешки. Опитайте се да запазите спокойствие и следвайте плана за евакуация на властите.</li>
                <li><span style={{fontWeight: 'bold'}}>Намерете прикритие:</span> Ако чуете сирени или предупреждения за бомбардировка, веднага потърсете най-близкото убежище. Подземни помещения като мазета или специално изградени бомбоубежища са за предпочитане.</li>
                <li><span style={{fontWeight: 'bold'}}>Заемете защитна поза:</span> Ако нямате време да достигнете безопасно място, паднете на земята, покрийте главата и шията си с ръце и останете на това място до преминаване на опасността.</li>
                <li><span style={{fontWeight: 'bold'}}>Следвайте инструкциите на властите:</span> Слушайте местните радиостанции и други комуникационни канали за актуална информация и инструкции.</li>
                <li><span style={{fontWeight: 'bold'}}>Докладвайте за щети и опасности:</span> Докладвайте за всякакви сериозни щети, загуби или останали опасности като неексплодирали боеприпаси.</li>
            </ol>
            </Typography>

        </Paper>



        <Paper 
         key={"civil_war"}
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
                <ImageSrc style={{ backgroundImage: `url(/src/assets/images/categories/MILITARY_CONDITIONS/civil_war.jpg)`,  backgroundPosition: 'center 60%'  }} />
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
                    Гражданска война
                    </Typography>
                </Image>
                </ImageButton>
            }
            </Box>

            <Typography variant="subtitle1" color="text.primary" component="div" sx={{marginLeft: '2%', marginRight: '2%',textAlign: 'justify' ,color: '#E50000', '@media (pointer: coarse)': {marginLeft: '3%', marginRight: '3%'}}}>
            Гражданската война е война, в която враждуващите страни принадлежат на една и съща държава. Целта на едната страна може да бъде установяване на контрол над държавата или над определена област, постигането на независимост на отделна област или промяна на държавната политика. Гражданските войни са организирани и широкомащабни, като често и двете страни използват редовна армия.
            </Typography>

            <Typography variant="subtitle1" color="text.primary" component="div" sx={{textAlign: 'center', marginTop: '10px',fontWeight: 'bold', color: '#009F58', textDecoration: 'underline', fontSize: '20px', '@media (pointer: coarse)': {fontSize: '18px'} }}>
            Какво да правим при гражданска война?
            </Typography>

            <Typography variant="subtitle1" color="text.primary" component="div" sx={{textAlign: 'justify', marginRight: '2%', '@media (pointer: coarse)': {marginRight: '3%'}}}>
            <ol>
                <li><span style={{fontWeight: 'bold'}}>Запазете спокойствие:</span> Паниката може да доведе до грешки. Опитайте се да запазите спокойствие и следвайте плана за евакуация на властите.</li>
                <li><span style={{fontWeight: 'bold'}}>Избягвайте рисковите зони:</span> Стойте далеч от местата на сблъсъци, демонстрации и други зони с високо ниво на насилие.</li>
                <li><span style={{fontWeight: 'bold'}}>Намерете безопасно място:</span> Потърсете подслон в здрави сгради или специално подготвени убежища.</li>
                <li><span style={{fontWeight: 'bold'}}>Останете на закрито:</span> Ако сте на безопасно място, останете там и не излизайте навън, освен ако не е абсолютно необходимо.</li>
                <li><span style={{fontWeight: 'bold'}}>Следвайте инструкциите на властите:</span> Слушайте местните радиостанции и други комуникационни канали за актуална информация и инструкции.</li>
            </ol>
            </Typography>

        </Paper>



        <Paper 
         key={"hostage_crisis"}
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
                <ImageSrc style={{ backgroundImage: `url(/src/assets/images/categories/MILITARY_CONDITIONS/hostage_crisis.jpg)`,  backgroundPosition: 'center 40%'  }} />
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
                    Заложническа криза
                    </Typography>
                </Image>
                </ImageButton>
            }
            </Box>

            <Typography variant="subtitle1" color="text.primary" component="div" sx={{marginLeft: '2%', marginRight: '2%',textAlign: 'justify' ,color: '#E50000', '@media (pointer: coarse)': {marginLeft: '3%', marginRight: '3%'}}}>
            Заложническата криза представлява ситуация, при която едно или повече лица (наричани заложници) се държат против волята им от въоръжено лице или група (наричани похитители) с цел да се постигнат определени искания. Тези искания могат да бъдат политически, финансови или други и обикновено са насочени към властите или трети страни.
            </Typography>

            <Typography variant="subtitle1" color="text.primary" component="div" sx={{textAlign: 'center', marginTop: '10px',fontWeight: 'bold', color: '#009F58', textDecoration: 'underline', fontSize: '20px', '@media (pointer: coarse)': {fontSize: '18px'} }}>
            Какво да правим ако сме част от заложническа криза?
            </Typography>

            <Typography variant="subtitle1" color="text.primary" component="div" sx={{textAlign: 'justify', marginRight: '2%', '@media (pointer: coarse)': {marginRight: '3%'}}}>
            <ol>
                <li><span style={{fontWeight: 'bold'}}>Запазете спокойствие:</span> Опитайте се да останете спокойни и събрани. Дишайте дълбоко и се опитайте да не изпадате в паника.</li>
                <li><span style={{fontWeight: 'bold'}}>Слушайте и следвайте инструкциите:</span> Внимателно слушайте какво казват похитителите. Следвайте техните инструкции без да ги оспорвате или да се противопоставяте.</li>
                <li><span style={{fontWeight: 'bold'}}>Избягвайте провокиращи действия:</span> Не правете резки движения, които могат да се възприемат като заплаха.</li>
                <li><span style={{fontWeight: 'bold'}}>Бъдете внимателни с думите:</span> Говорете спокойно и учтиво. Избягвайте конфронтационен тон.</li>
                <li><span style={{fontWeight: 'bold'}}>Изчакайте помощта:</span> Доверете се на органите на реда и изчакайте те да действат. Специализираните екипи знаят как да се справят с подобни ситуации.</li>
            </ol>
            </Typography>

        </Paper>



        <Paper 
         key={"coup"}
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
                <ImageSrc style={{ backgroundImage: `url(/src/assets/images/categories/MILITARY_CONDITIONS/coup.jpg)`,  backgroundPosition: 'center 40%'  }} />
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
                    Преврат
                    </Typography>
                </Image>
                </ImageButton>
            }
            </Box>

            <Typography variant="subtitle1" color="text.primary" component="div" sx={{marginLeft: '2%', marginRight: '2%',textAlign: 'justify' ,color: '#E50000', '@media (pointer: coarse)': {marginLeft: '3%', marginRight: '3%'}}}>
            Превратът е насилствено завземане на властта в държавата чрез неконституционни средства от страна на участници в държавни структури. Извършва се чрез нарушаване на действащите към дадения момент конституционни и правови форми, като целта е превземане на центровете за управление и физическо отстраняване (чрез арест или ликвидиране) на ключови политически фигури от предния режим. Често се извършва чрез военен метеж, но превратът може да бъде и ненасилствен.
            </Typography>

            <Typography variant="subtitle1" color="text.primary" component="div" sx={{textAlign: 'center', marginTop: '10px',fontWeight: 'bold', color: '#009F58', textDecoration: 'underline', fontSize: '20px', '@media (pointer: coarse)': {fontSize: '18px'} }}>
            Какво да правим по време на преврат?
            </Typography>

            <Typography variant="subtitle1" color="text.primary" component="div" sx={{textAlign: 'justify', marginRight: '2%', '@media (pointer: coarse)': {marginRight: '3%'}}}>
            <ol>
                <li><span style={{fontWeight: 'bold'}}>Запазете спокойствие:</span> Опитайте се да останете спокойни и събрани. Дишайте дълбоко и се опитайте да не изпадате в паника.</li>
                <li><span style={{fontWeight: 'bold'}}>Избягвайте рисковите зони:</span> Стойте далеч от правителствени сгради, военни обекти, централни площади и други потенциални зони на сблъсъци и насилие.</li>
                <li><span style={{fontWeight: 'bold'}}>Намерете безопасно място:</span> Потърсете подслон в здрави сгради или специално подготвени убежища.</li>
                <li><span style={{fontWeight: 'bold'}}>Останете на закрито:</span> Ако сте на безопасно място, останете там и не излизайте навън, освен ако не е абсолютно необходимо.</li>
                <li><span style={{fontWeight: 'bold'}}>Запасете се с храна и вода:</span> Уверете се, че имате достатъчно запаси от храна и вода за няколко дни.</li>
            </ol>
            </Typography>

        </Paper>



        <Paper 
         key={"assassination"}
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
                <ImageSrc style={{ backgroundImage: `url(/src/assets/images/categories/MILITARY_CONDITIONS/assassination.jpg)`,  backgroundPosition: 'center 40%'  }} />
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
                    Атентат
                    </Typography>
                </Image>
                </ImageButton>
            }
            </Box>

            <Typography variant="subtitle1" color="text.primary" component="div" sx={{marginLeft: '2%', marginRight: '2%',textAlign: 'justify' ,color: '#E50000', '@media (pointer: coarse)': {marginLeft: '3%', marginRight: '3%'}}}>
            Атентатът представлява планирано и насилствено нападение с цел убийство или сериозно нараняване на конкретно лице или група хора, обикновено с политически, идеологически или лични мотиви. Атентатите могат да бъдат извършени чрез различни средства, като оръжия, взривни устройства, отрови или други методи. Основната цел на атентата често е да се предизвика страх, паника или да се привлече внимание към дадена кауза или проблем.
            </Typography>

            <Typography variant="subtitle1" color="text.primary" component="div" sx={{textAlign: 'center', marginTop: '10px',fontWeight: 'bold', color: '#009F58', textDecoration: 'underline', fontSize: '20px', '@media (pointer: coarse)': {fontSize: '18px'} }}>
            Какво да правим при атентат?
            </Typography>

            <Typography variant="subtitle1" color="text.primary" component="div" sx={{textAlign: 'justify', marginRight: '2%', '@media (pointer: coarse)': {marginRight: '3%'}}}>
            <ol>
                <li><span style={{fontWeight: 'bold'}}>Останете спокойни и наблюдателни:</span> Опитайте се да запазите спокойствие. Паниката може да влоши ситуацията.</li>
                <li><span style={{fontWeight: 'bold'}}>Намерете прикритие:</span> Потърсете безопасно място, където можете да се скриете. Това може да бъде зад стена, колона, или друг солиден обект.</li>
                <li><span style={{fontWeight: 'bold'}}>Бягайте, ако е безопасно:</span> Ако имате възможност да избягате безопасно, направете го.</li>
                <li><span style={{fontWeight: 'bold'}}>Помогнете на пострадалите, ако можете:</span> Ако сте в безопасност и имате знания по оказване на първа помощ, помогнете на ранените, доколкото можете.</li>
                <li><span style={{fontWeight: 'bold'}}>Сигнализирайте за помощ:</span> Веднага щом сте в безопасност, се обадете на спешните служби (полиция, бърза помощ) и дайте възможно най-точна информация за случващото се (местоположение, описание на нападателя, използвани оръжия и т.н.).</li>
            </ol>
            </Typography>

        </Paper>



        <Paper 
         key={"terrorism"}
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
                <ImageSrc style={{ backgroundImage: `url(/src/assets/images/categories/MILITARY_CONDITIONS/terrorism.jpg)`,  backgroundPosition: 'center 40%'  }} />
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
                    Тероризъм
                    </Typography>
                </Image>
                </ImageButton>
            }
            </Box>

            <Typography variant="subtitle1" color="text.primary" component="div" sx={{marginLeft: '2%', marginRight: '2%',textAlign: 'justify' ,color: '#E50000', '@media (pointer: coarse)': {marginLeft: '3%', marginRight: '3%'}}}>
            Тероризмът е използването на брутално насилие с цел постигане на политически, религиозни или идеологически цели. Обикновено терористичните актове са насочени към цивилното население или към висши длъжностни лица и се извършват с цел да се предизвика страх, терор и несигурност. Терористичните актове могат да бъдат извършени от отделни хора, от групировки, или дори от държави.
            </Typography>

            <Typography variant="subtitle1" color="text.primary" component="div" sx={{textAlign: 'center', marginTop: '10px',fontWeight: 'bold', color: '#009F58', textDecoration: 'underline', fontSize: '20px', '@media (pointer: coarse)': {fontSize: '18px'} }}>
            Какво да правим при тероризъм?
            </Typography>

            <Typography variant="subtitle1" color="text.primary" component="div" sx={{textAlign: 'justify', marginRight: '2%', '@media (pointer: coarse)': {marginRight: '3%'}}}>
            <ol>
                <li><span style={{fontWeight: 'bold'}}>Запазете спокойствие:</span> Опитайте се да останете спокойни и да не изпадате в паника, тъй като това ще ви помогне да мислите по-ясно и да вземете правилни решения.</li>
                <li><span style={{fontWeight: 'bold'}}>Бъдете наясно с обстановката:</span> Наблюдавайте околната среда и се ориентирайте къде се намират изходите и потенциалните места за укритие.</li>
                <li><span style={{fontWeight: 'bold'}}>Намерете безопасно място:</span> Ако сте в непосредствена опасност, опитайте се да се скриете зад солидни препятствия, като бетонни стени или здрави мебели. Избягвайте стъкла и големи открити пространства.</li>
                <li><span style={{fontWeight: 'bold'}}>Избягвайте използването на мобилни устройства:</span> Използвайте телефона си само ако е абсолютно необходимо. Линиите могат да бъдат претоварени, а прекомерната употреба може да разкрие местоположението ви.</li>
                <li><span style={{fontWeight: 'bold'}}>Помогнете на другите, ако можете:</span> Ако е безопасно, помогнете на други хора в беда. Организирайте се с останалите и действайте заедно, за да увеличите шансовете си за оцеляване.</li>
            </ol>
            </Typography>

        </Paper>
        
    </div>
  );
};