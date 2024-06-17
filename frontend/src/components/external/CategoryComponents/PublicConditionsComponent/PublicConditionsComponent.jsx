import { Box, ButtonBase, Paper, Typography, styled } from "@mui/material";
import './public_conditions_component.scss';

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




export const PublicConditionsComponent = () => {


  return (
    <div className="public_conditions_component">

       <Paper 
        key={"no_water_supply"}
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
                <ImageSrc style={{ backgroundImage: `url(/src/assets/images/categories/PUBLIC_CONDITIONS/no_water_supply.jpg)`,  backgroundPosition: 'center 40%' }}/>
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
                    Прекъснато водоснабдяване
                    </Typography>
                </Image>
                </ImageButton>
            }
            </Box>

            <Typography variant="subtitle1" color="text.primary" component="div" sx={{marginLeft: '2%', marginRight: '2%',textAlign: 'justify' ,color: '#E50000', '@media (pointer: coarse)': {marginLeft: '3%', marginRight: '3%'}}}>
            Прекъснатото водоснабдяване представлява ситуация, при която водоснабдителната услуга в даден район или за дадено домакинство не е налична. Това може да се случи по различни причини, включително: планирани ремонти и поддръжка, природни бедствия и аварии, недостиг на вода, сезонни фактори и други.
            </Typography>

            <Typography variant="subtitle1" color="text.primary" component="div" sx={{textAlign: 'center', marginTop: '10px',fontWeight: 'bold', color: '#009F58', textDecoration: 'underline', fontSize: '20px', '@media (pointer: coarse)': {fontSize: '18px'} }}>
            Какво да правим при прекъснато водоснабдяване?
            </Typography>

            <Typography variant="subtitle1" color="text.primary" component="div" sx={{textAlign: 'justify', marginRight: '2%', '@media (pointer: coarse)': {marginRight: '3%'}}}>
            <ol>
                <li><span style={{fontWeight: 'bold'}}>Проверете дали прекъсването е планирано или аварийно:</span> Свържете се с местната водоснабдителна компания или проверете уебсайта им за информация относно прекъсването.</li>
                <li><span style={{fontWeight: 'bold'}}>Запасете се с достатъчно вода за основни нужди:</span> Напълнете всички налични съдове, като бутилки, кани, кофи и вани с вода. Разделете водата за пиене и готвене от тази за хигиенни нужди.</li> 
                <li><span style={{fontWeight: 'bold'}}>Ограничете използването на вода до абсолютно необходимото:</span> Избягвайте миене на съдове, пране и други дейности, които изискват много вода.</li>
                <li><span style={{fontWeight: 'bold'}}>Намерете алтернативни източници на вода и начини за хигиена:</span> Ако прекъсването ще бъде продължително, помислете за закупуване на бутилирана вода или вземане на вода от обществени чешми проверени от РЗИ.</li>
                <li><span style={{fontWeight: 'bold'}}>Поддържайте контакт със съседите и координирайте действията си:</span> Организирайте съвместно усилия за съхранение и разпределение на вода, ако е необходимо.</li>
            </ol>
            </Typography>

        </Paper>

        <Paper 
         key={"no_power_supply"}
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
                <ImageSrc style={{ backgroundImage: `url(/src/assets/images/categories/PUBLIC_CONDITIONS/no_power_supply.jpg)`,  backgroundPosition: 'center 85%' }} />
                <ImageBackdrop className="MuiImageBackdrop-root" opacity={0.6} />
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
                    Прекъснато електрозахранване
                    </Typography>
                </Image>
                </ImageButton>
            }
            </Box>

            <Typography variant="subtitle1" color="text.primary" component="div" sx={{marginLeft: '2%', marginRight: '2%',textAlign: 'justify' ,color: '#E50000', '@media (pointer: coarse)': {marginLeft: '3%', marginRight: '3%'}}}>
            Прекъснатото електрозахранване представлява ситуация, при която доставката на електрическа енергия към даден район или обект е временно спряна. Това може да се случи по различни причини и може да варира по продължителност и честота. Прекъсванията на електрозахранването могат да бъдат планирани или непланирани (аварийни).
            </Typography>

            <Typography variant="subtitle1" color="text.primary" component="div" sx={{textAlign: 'center', marginTop: '10px',fontWeight: 'bold', color: '#009F58', textDecoration: 'underline', fontSize: '20px', '@media (pointer: coarse)': {fontSize: '18px'} }}>
            Какво да правим при прекъснато електрозахранване?
            </Typography>

            <Typography variant="subtitle1" color="text.primary" component="div" sx={{textAlign: 'justify', marginRight: '2%', '@media (pointer: coarse)': {marginRight: '3%'}}}>
            <ol>
                <li><span style={{fontWeight: 'bold'}}>Проверете причината за прекъсването:</span> Свържете се с доставчика на електроенергия или проверете уебсайта му за информация относно прекъсването.</li>
                <li><span style={{fontWeight: 'bold'}}>Използвайте алтернативни източници на светлина и енергия:</span> Подгответе се с фенери, свещи, резервни батерии и захранвания.</li>
                <li><span style={{fontWeight: 'bold'}}>Изключете електроуредите:</span> За да предпазите уредите си от възможни повреди при възстановяване на захранването, изключете ги от електрическата мрежа.</li>
                <li><span style={{fontWeight: 'bold'}}>Поддържайте топлина:</span> При студено време използвайте одеяла и топли дрехи, за да се поддържате топли.</li>
                <li><span style={{fontWeight: 'bold'}}>Информирайте се за продължителността на прекъсването:</span> Опитайте се да разберете колко дълго ще продължи прекъсването, за да планирате адекватно действията си.</li>
            </ol>
            </Typography>

        </Paper>


        <Paper 
         key={"no_communications"}
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
                <ImageSrc style={{ backgroundImage: `url(/src/assets/images/categories/PUBLIC_CONDITIONS/no_communications.jpg)`,  backgroundPosition: 'center 60%'  }} />
                <ImageBackdrop className="MuiImageBackdrop-root" opacity={0.5} />
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
                    Прекъснати комуникации
                    </Typography>
                </Image>
                </ImageButton>
            }
            </Box>

            <Typography variant="subtitle1" color="text.primary" component="div" sx={{marginLeft: '2%', marginRight: '2%',textAlign: 'justify' ,color: '#E50000', '@media (pointer: coarse)': {marginLeft: '3%', marginRight: '3%'}}}>
            Прекъснатите комуникации представляват ситуация, при която обичайните средства за комуникация са временно недостъпни или нефункциониращи. Това може да включва прекъсвания в телефонните линии, интернет връзките, радиосигналите или други форми на комуникация. Причините за прекъсвания на комуникациите могат да бъдат разнообразни и да варират по продължителност и тежест.
            </Typography>

            <Typography variant="subtitle1" color="text.primary" component="div" sx={{textAlign: 'center', marginTop: '10px',fontWeight: 'bold', color: '#009F58', textDecoration: 'underline', fontSize: '20px', '@media (pointer: coarse)': {fontSize: '18px'} }}>
            Какво да правим при прекъснати комуникации?
            </Typography>

            <Typography variant="subtitle1" color="text.primary" component="div" sx={{textAlign: 'justify', marginRight: '2%', '@media (pointer: coarse)': {marginRight: '3%'}}}>
            <ol>
                <li><span style={{fontWeight: 'bold'}}>Идентифицирайте проблема:</span> Опитайте се да установите причината за прекъсването и дали е локално или широко разпространено.</li>
                <li><span style={{fontWeight: 'bold'}}>Запазете спокойствие:</span> Прекъсването на комуникациите може да бъде стресиращо, но е важно да запазите спокойствие.</li>
                <li><span style={{fontWeight: 'bold'}}>Намерете алтернативни начини за комуникация:</span> Ако е възможно, опитайте да се свържете с другите по алтернативни начини. Това може да включва използване на радио с къси вълни, сателитен телефон или дори димни сигнали (ако е безопасно).</li>
                <li><span style={{fontWeight: 'bold'}}>Погрижете се за основните си нужди:</span> Уверете се, че имате запаси от храна, вода и лекарства, които да ви стигнат за няколко дни.</li>
                <li><span style={{fontWeight: 'bold'}}>Помогнете на другите:</span> Проверете съседите си, особено възрастните или хората с увреждания.  Предложете им помощ и се опитайте да работите заедно като общност, за да преодолеете ситуацията.</li>
            </ol>
            </Typography>

        </Paper>



        <Paper 
         key={"epidemic"}
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
                <ImageSrc style={{ backgroundImage: `url(/src/assets/images/categories/PUBLIC_CONDITIONS/epidemic.jpg)`,  backgroundPosition: 'center 50%'  }} />
                <ImageBackdrop className="MuiImageBackdrop-root" opacity={0.5} />
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
                    Епидемия
                    </Typography>
                </Image>
                </ImageButton>
            }
            </Box>

            <Typography variant="subtitle1" color="text.primary" component="div" sx={{marginLeft: '2%', marginRight: '2%',textAlign: 'justify' ,color: '#E50000', '@media (pointer: coarse)': {marginLeft: '3%', marginRight: '3%'}}}>
            Епидемия e налице, когато нови случаи на определено заболяване, при определена популация и през определен период, значително надхвърлят обичайното и очакваното, и е налице масово разпространение на заболяването. Епидемията се отнася до локално разпространение (в рамките на една държава). Най-често причинителят на епидемията е инфекциозен агент, така че става дума за инфекциозно (заразно) заболяване. Епидемичният процес се характеризира с непрекъснато предаване на възбудителя на инфекцията (заразата) между хората. За възникването му са необходими 3 фактора – източник на зараза, механизъм за предаване и възприемчиви към заболяването хора.
            </Typography>

            <Typography variant="subtitle1" color="text.primary" component="div" sx={{textAlign: 'center', marginTop: '10px',fontWeight: 'bold', color: '#009F58', textDecoration: 'underline', fontSize: '20px', '@media (pointer: coarse)': {fontSize: '18px'} }}>
            Какво да правим при епидемия?
            </Typography>

            <Typography variant="subtitle1" color="text.primary" component="div" sx={{textAlign: 'justify', marginRight: '2%', '@media (pointer: coarse)': {marginRight: '3%'}}}>
            <ol>
                <li><span style={{fontWeight: 'bold'}}>Поддържайте висока степен на хигиена:</span> Мийте редовно ръцете си със сапун и вода. Използвайте дезинфектант за ръце с поне 60% съдържание на алкохол, ако няма сапун и вода. Избягвайте да докосвате лицето си, особено очите, носа и устата, с немити ръце.</li>
                <li><span style={{fontWeight: 'bold'}}>Ограничете физическия контакт с други хора:</span> Избягвайте събирания на големи групи и присъствие на обществени места, където е трудно да се поддържа разстояние. Стойте на разстояние поне 1-2 метра от други хора, особено ако са болни или проявяват симптоми на заболяването.</li>
                <li><span style={{fontWeight: 'bold'}}>Носете защитни средства:</span> Носете маска, която покрива носа и устата ви, когато сте на обществени места или в близост до други хора.</li>
                <li><span style={{fontWeight: 'bold'}}>Бъдете информирани:</span> Спазвайте препоръките и указанията на здравните власти относно изолация, карантина и други предпазни мерки.</li>
                <li><span style={{fontWeight: 'bold'}}>Поддържайте здравословен начин на живот:</span> Хранете се балансирано с много плодове и зеленчуци, за да подсилите имунната си система. Спете достатъчно и избягвайте стреса. </li>
            </ol>
            </Typography>

        </Paper>



        <Paper 
         key={"nuclear_accident"}
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
                <ImageSrc style={{ backgroundImage: `url(/src/assets/images/categories/PUBLIC_CONDITIONS/nuclear_accident.jpg)`,  backgroundPosition: 'center 34%'  }} />
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
                    Ядрена авария
                    </Typography>
                </Image>
                </ImageButton>
            }
            </Box>

            <Typography variant="subtitle1" color="text.primary" component="div" sx={{marginLeft: '2%', marginRight: '2%',textAlign: 'justify' ,color: '#E50000', '@media (pointer: coarse)': {marginLeft: '3%', marginRight: '3%'}}}>
            Ядрената авария представлява сериозен инцидент в ядрена електроцентрала или друг обект, който използва ядрени материали, при който се изпускат значителни количества радиоактивни вещества в околната среда. Тези инциденти могат да имат тежки последствия за човешкото здраве, околната среда и икономиката. Ядрените аварии могат да бъдат причинени от различни фактори, включително технически повреди, човешка грешка, природни бедствия или злонамерени действия.
            </Typography>

            <Typography variant="subtitle1" color="text.primary" component="div" sx={{textAlign: 'center', marginTop: '10px',fontWeight: 'bold', color: '#009F58', textDecoration: 'underline', fontSize: '20px', '@media (pointer: coarse)': {fontSize: '18px'} }}>
            Какво да правим при ядрена авария?
            </Typography>

            <Typography variant="subtitle1" color="text.primary" component="div" sx={{textAlign: 'justify', marginRight: '2%', '@media (pointer: coarse)': {marginRight: '3%'}}}>
            <ol>
                <li><span style={{fontWeight: 'bold'}}>Запазете спокойствие:</span> Паниката може да доведе до грешки. Опитайте се да запазите спокойствие.</li>
                <li><span style={{fontWeight: 'bold'}}>Вземете защитни мерки:</span> Ако сте на закрито, останете вътре и запечатайте помещенията, за да предотвратите навлизането на радиация.</li>
                <li><span style={{fontWeight: 'bold'}}>Ограничете излагането на външна радиация:</span> Ако сте на открито по време на аварията, опитайте се да се приберете възможно най-бързо. Покрийте устата и носа си с маска или кърпа. Свалете външните дрехи, след като се приберете на закрито.</li>
                <li><span style={{fontWeight: 'bold'}}>Подгответе се за евакуация:</span> Бъдете готови да се евакуирате, ако местните власти издадат такова нареждане. Подгответе аварийна чанта с основни неща като вода, храна, лекарства, документи, фенерче и радио с батерии.</li>
                <li><span style={{fontWeight: 'bold'}}>Следвайте инструкциите на властите:</span> Слушайте местните радиостанции и други комуникационни канали за актуална информация и инструкции.</li>
            </ol>
            </Typography>

        </Paper>



        <Paper 
         key={"radiation_leak"}
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
                <ImageSrc style={{ backgroundImage: `url(/src/assets/images/categories/PUBLIC_CONDITIONS/radiation_leak.jpg)`,  backgroundPosition: 'center 10%'  }} />
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
                    Изтичане на радиация
                    </Typography>
                </Image>
                </ImageButton>
            }
            </Box>

            <Typography variant="subtitle1" color="text.primary" component="div" sx={{marginLeft: '2%', marginRight: '2%',textAlign: 'justify' ,color: '#E50000', '@media (pointer: coarse)': {marginLeft: '3%', marginRight: '3%'}}}>
            Изтичането на радиация представлява освобождаване на радиоактивни вещества в околната среда. Това може да се случи при различни обстоятелства, освен в атомна електроцентрала, и да доведе до значителни рискове за здравето на хората и околната среда. Когато радиоактивни материали изтекат в околната среда, те могат да замърсят въздуха, водата, почвата и живите организми. Изтичането на радиация може да причини остри и хронични здравни проблеми, включително радиационни изгаряния, рак и генетични мутации. 
            </Typography>

            <Typography variant="subtitle1" color="text.primary" component="div" sx={{textAlign: 'center', marginTop: '10px',fontWeight: 'bold', color: '#009F58', textDecoration: 'underline', fontSize: '20px', '@media (pointer: coarse)': {fontSize: '18px'} }}>
            Какво да правим при изтичане на радиация?
            </Typography>

            <Typography variant="subtitle1" color="text.primary" component="div" sx={{textAlign: 'justify', marginRight: '2%', '@media (pointer: coarse)': {marginRight: '3%'}}}>
            <ol>
                <li><span style={{fontWeight: 'bold'}}>Запазете спокойствие:</span> Паниката може да доведе до грешки. Опитайте се да запазите спокойствие.</li>
                <li><span style={{fontWeight: 'bold'}}>Вземете защитни мерки:</span> Ако сте на закрито, останете вътре и запечатайте помещенията, за да предотвратите навлизането на радиация.</li>
                <li><span style={{fontWeight: 'bold'}}>Ограничете излагането на външна радиация:</span> Ако сте на открито, се опитайте да се приберете възможно най-бързо. Покрийте устата и носа си с маска или кърпа. Свалете външните дрехи, след като се приберете на закрито.</li>
                <li><span style={{fontWeight: 'bold'}}>Подгответе се за евакуация:</span> Бъдете готови да се евакуирате, ако местните власти издадат такова нареждане. Подгответе аварийна чанта с основни неща като вода, храна, лекарства, документи, фенерче и радио с батерии.</li>
                <li><span style={{fontWeight: 'bold'}}>Следвайте инструкциите на властите:</span> Слушайте местните радиостанции и други комуникационни канали за актуална информация и инструкции.</li>    
            </ol>
            </Typography>

        </Paper>



        <Paper 
         key={"chemical_spill"}
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
                <ImageSrc style={{ backgroundImage: `url(/src/assets/images/categories/PUBLIC_CONDITIONS/chemical_spill.jpg)`,  backgroundPosition: 'center 40%'  }} />
                <ImageBackdrop className="MuiImageBackdrop-root" opacity={0.6} />
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
                    Химическо изтичане
                    </Typography>
                </Image>
                </ImageButton>
            }
            </Box>

            <Typography variant="subtitle1" color="text.primary" component="div" sx={{marginLeft: '2%', marginRight: '2%',textAlign: 'justify' ,color: '#E50000', '@media (pointer: coarse)': {marginLeft: '3%', marginRight: '3%'}}}>
            Химическото изтичане представлява неволно освобождаване на опасни химически вещества в околната среда. Това може да включва течни, газообразни или твърди химикали, които могат да бъдат вредни за хората, животните и околната среда. Изтичането на химически вещества може да доведе до замърсяване на въздуха, водата и почвата, както и до остри или хронични здравни проблеми за хората, изложени на тези вещества.
            </Typography>

            <Typography variant="subtitle1" color="text.primary" component="div" sx={{textAlign: 'center', marginTop: '10px',fontWeight: 'bold', color: '#009F58', textDecoration: 'underline', fontSize: '20px', '@media (pointer: coarse)': {fontSize: '18px'} }}>
            Какво да правим при химическо изтичане?
            </Typography>

            <Typography variant="subtitle1" color="text.primary" component="div" sx={{textAlign: 'justify', marginRight: '2%', '@media (pointer: coarse)': {marginRight: '3%'}}}>
            <ol>
                <li><span style={{fontWeight: 'bold'}}>Напуснете замърсената зона:</span> Ако сте на открито, се отдалечете от източника на изтичането възможно най-бързо. Ако сте на закрито, останете вътре и затворете всички врати и прозорци.</li>
                <li><span style={{fontWeight: 'bold'}}>Запазете спокойствие:</span> Опитайте се да останете спокойни и събрани. Дишайте дълбоко и се опитайте да не изпадате в паника.</li>
                <li><span style={{fontWeight: 'bold'}}>Използвайте защитни средства:</span> Ако имате достъп до маска или друг вид респираторна защита, използвайте ги. Покрийте устата и носа си с влажна кърпа, ако нямате маска.</li>
                <li><span style={{fontWeight: 'bold'}}>Избягвайте контакт с химикалите:</span> Не докосвайте разляти химикали и не вдишвайте изпаренията. Ако сте били изложени на химикали, измийте се обилно със сапун и вода и свалете замърсените дрехи.</li>
                <li><span style={{fontWeight: 'bold'}}>Потърсете медицинска помощ:</span> Ако изпитвате симптоми на отравяне или имате съмнение за излагане на химикали, потърсете незабавно медицинска помощ.</li>
            </ol>
            </Typography>

        </Paper>



        <Paper 
         key={"bacteriological_contamination"}
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
                <ImageSrc style={{ backgroundImage: `url(/src/assets/images/categories/PUBLIC_CONDITIONS/bacteriological_contamination.jpg)`,  backgroundPosition: 'center 40%'  }} />
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
                    Бактериологично заразяване
                    </Typography>
                </Image>
                </ImageButton>
            }
            </Box>

            <Typography variant="subtitle1" color="text.primary" component="div" sx={{marginLeft: '2%', marginRight: '2%',textAlign: 'justify' ,color: '#E50000', '@media (pointer: coarse)': {marginLeft: '3%', marginRight: '3%'}}}>
            Бактериологичното заразяване представлява разпространение на вредни бактерии сред хората и околната среда, което може да доведе до сериозни заболявания и екологични проблеми. Бактериите са микроскопични организми, които могат да причинят инфекции, ако навлязат в тялото или замърсят околната среда.
            </Typography>

            <Typography variant="subtitle1" color="text.primary" component="div" sx={{textAlign: 'center', marginTop: '10px',fontWeight: 'bold', color: '#009F58', textDecoration: 'underline', fontSize: '20px', '@media (pointer: coarse)': {fontSize: '18px'} }}>
            Какво да правим при разпространено бактериологично заразяване?
            </Typography>

            <Typography variant="subtitle1" color="text.primary" component="div" sx={{textAlign: 'justify', marginRight: '2%', '@media (pointer: coarse)': {marginRight: '3%'}}}>
            <ol>
                <li><span style={{fontWeight: 'bold'}}>Спазвайте строга хигиена:</span> Редовно мийте ръцете си със сапун и вода. Използвайте дезинфектанти за ръце при липса на вода и сапун.</li>
                <li><span style={{fontWeight: 'bold'}}>Използвайте защитни средства:</span> Ако имате достъп до маска или друг вид респираторна защита, използвайте ги. Покрийте устата и носа си с влажна кърпа, ако нямате маска.</li>
                <li><span style={{fontWeight: 'bold'}}>Ограничете физическия контакт с други хора:</span> Избягвайте събирания на големи групи и присъствие на обществени места, където е трудно да се поддържа разстояние. Стойте на разстояние поне 1-2 метра от други хора, особено ако са болни или проявяват симптоми.</li>
                <li><span style={{fontWeight: 'bold'}}>Проверете качеството на водата, която използвате:</span> Уверете се, че водата за пиене и готвене е безопасна и чиста. Избягвайте контакт със замърсени водоизточници.</li>
                <li><span style={{fontWeight: 'bold'}}>Потърсете медицинска помощ при симптоми на инфекция:</span> При поява на симптоми като треска, диария, повръщане, болки и други, незабавно потърсете медицинска помощ.</li>
            </ol>
            </Typography>

        </Paper>



        <Paper 
         key={"protest"}
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
                <ImageSrc style={{ backgroundImage: `url(/src/assets/images/categories/PUBLIC_CONDITIONS/protest.jpg)`,  backgroundPosition: 'center 45%'  }} />
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
                    Протест
                    </Typography>
                </Image>
                </ImageButton>
            }
            </Box>

            <Typography variant="subtitle1" color="text.primary" component="div" sx={{marginLeft: '2%', marginRight: '2%',textAlign: 'justify' ,color: '#E50000', '@media (pointer: coarse)': {marginLeft: '3%', marginRight: '3%'}}}>
            Протестът е публичен израз на възражение, неодобрение или несъгласие срещу идея или действие, обикновено политически. Протестите могат да приемат най-различни форми – от отделни изявления до масови демонстрации. Протестиращите могат да организират протест като начин публично да изразят мнението си в опит да повлияят на общественото мнение или правителствената политика, или могат да предприемат директни действия в опит да наложат желаните промени сами, често предизвиквайки безредици и хаос.
            </Typography>

            <Typography variant="subtitle1" color="text.primary" component="div" sx={{textAlign: 'center', marginTop: '10px',fontWeight: 'bold', color: '#009F58', textDecoration: 'underline', fontSize: '20px', '@media (pointer: coarse)': {fontSize: '18px'} }}>
            Какво да правим в ситуация на протест и безредици?
            </Typography>

            <Typography variant="subtitle1" color="text.primary" component="div" sx={{textAlign: 'justify', marginRight: '2%', '@media (pointer: coarse)': {marginRight: '3%'}}}>
            <ol>
                <li><span style={{fontWeight: 'bold'}}>Запазете спокойствие:</span> Опитайте се да запазите спокойствие и да останете хлъднокръвни.</li>
                <li><span style={{fontWeight: 'bold'}}>Избягвайте рисковите зони:</span> Стойте далеч от местата на сблъсъци, демонстрации и други зони с високо ниво на насилие.</li>
                <li><span style={{fontWeight: 'bold'}}>Намерете безопасно място:</span> Потърсете подслон в сгради и помещения далеч от епицентъра на събитията.</li>
                <li><span style={{fontWeight: 'bold'}}>Останете на закрито:</span> Ако сте на безопасно място, останете там и не излизайте навън, освен ако не е абсолютно необходимо.</li>
                <li><span style={{fontWeight: 'bold'}}>Следвайте инструкциите на властите:</span> Слушайте местните радиостанции и други комуникационни канали за актуална информация и инструкции.</li>
            </ol>
            </Typography>

        </Paper>



        <Paper 
         key={"explosion"}
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
                <ImageSrc style={{ backgroundImage: `url(/src/assets/images/categories/PUBLIC_CONDITIONS/explosion.jpg)`,  backgroundPosition: 'center 50%'  }} />
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
                    Експлозия
                    </Typography>
                </Image>
                </ImageButton>
            }
            </Box>

            <Typography variant="subtitle1" color="text.primary" component="div" sx={{marginLeft: '2%', marginRight: '2%',textAlign: 'justify' ,color: '#E50000', '@media (pointer: coarse)': {marginLeft: '3%', marginRight: '3%'}}}>
            Експлозия се нарича внезапно и драстично увеличаване на обем и освобождаване на енергия, обикновено съпроводени с високи температури и отделяне на газове. Експлозиите предизвикват ударни вълни, като първата се дължи на отделените при изгарянето на взривното вещество газове и зависи от диаметъра му, а втората се поражда от изместения от първата въздух.
            </Typography>

            <Typography variant="subtitle1" color="text.primary" component="div" sx={{textAlign: 'center', marginTop: '10px',fontWeight: 'bold', color: '#009F58', textDecoration: 'underline', fontSize: '20px', '@media (pointer: coarse)': {fontSize: '18px'} }}>
            Какво да правим при експлозия?
            </Typography>

            <Typography variant="subtitle1" color="text.primary" component="div" sx={{textAlign: 'justify', marginRight: '2%', '@media (pointer: coarse)': {marginRight: '3%'}}}>
            <ol>
                <li><span style={{fontWeight: 'bold'}}>Потърсете незабавно прикритие:</span> Ако сте на закрито, скрийте се под здрава мебел (например под маса или бюро) или застанете до вътрешна стена, далеч от прозорци и външни стени. Ако сте на открито, паднете на земята и покрийте главата си с ръце. Потърсете прикритие зад здрави структури, ако има такива наблизо.</li>
                <li><span style={{fontWeight: 'bold'}}>Останете на място, ако е безопасно</span> Ако се намирате на закрито останете на място, докато ситуацията не се изясни.</li>
                <li><span style={{fontWeight: 'bold'}}>Излезте ако е необходимо:</span> Ако сте на закрито и помещението е повредено, гори или има риск от срутване, евакуирайте се възможно най-бързо и безопасно.</li>
                <li><span style={{fontWeight: 'bold'}}>Уведомете властите и потърсете помощ:</span> След като сте на безопасно място, уведомете властите за случилото се и потърсете медицинска помощ, ако е необходимо.</li>
                <li><span style={{fontWeight: 'bold'}}>Следвайте указанията на властите:</span> Останете далеч от мястото на експлозията и следвайте инструкциите на властите.</li>
            </ol>
            </Typography>

        </Paper>
        
    </div>
  );
};