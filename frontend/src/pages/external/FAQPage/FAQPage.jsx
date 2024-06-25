import { useEffect } from "react";
import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import './faq_page.scss';

export const FAQPage = () => {

  //? Cleanup effect to reset scroll position when component unmounts
  useEffect(() => {
    return () => {
      window.scroll({ top: 0, behavior: 'auto' });
    };
  }, []);

    return (
      <div className="faq_page">
        
        <div className="faq_page__title">
        Често задавани въпроси
        </div>

        <div className="faq_page__accordion-container"> 
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon sx={{ color: 'white' }}/>}
          aria-controls="panel1-content"
          id="panel1-header"
          sx={{backgroundColor: '#009F58', color: 'white'}}
        >
          Какво представлява Disaster Scout ?
        </AccordionSummary>
        <AccordionDetails sx={{backgroundColor: '#ffe6e6'}}>
          Disaster Scout е уеб приложение за докладване и следене на природни бедствия и аварии на територията на Република България.
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon sx={{ color: 'white' }}/>}
          aria-controls="panel2-content"
          id="panel2-header"
          sx={{backgroundColor: '#009F58', color: 'white'}}
        >
          Каква е целта на Disaster Scout ?
        </AccordionSummary>
        <AccordionDetails sx={{backgroundColor: '#ffe6e6'}}>
          Целта на Disaster Scout е да предостави единна, общодостъпна платформа за търсене и споделяне на информация за природни бедствия и аварии, в помощ на българските граждани.
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon sx={{ color: 'white' }}/>}
          aria-controls="panel3-content"
          id="panel3-header"
          sx={{backgroundColor: '#009F58', color: 'white'}}
        >
          Откъде Disaster Scout получава информация за актуалните природни бедствия и аварии ?
        </AccordionSummary>
        <AccordionDetails sx={{backgroundColor: '#ffe6e6'}}>
          Системата Disaster Scout е проектирана да получава информация за природни бедствия и аварии от всеки един български гражданин, който желае да информира обществото за актуалнта обстановка около себе си.
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon sx={{ color: 'white' }}/>}
          aria-controls="panel4-content"
          id="panel4-header"
          sx={{backgroundColor: '#009F58', color: 'white'}}
        >
          По какъв начин се гарантира достоверността на предоставената информация ?
        </AccordionSummary>
        <AccordionDetails sx={{backgroundColor: '#ffe6e6'}}>
          Disaster Scout разполага с диспечери, които се грижат за правилното функциониране на системата. 
          Задачата на диспечерите е да обработват и доказват достоверността на подадените доклади за природни бедствия и аварии.
          Това се случва чрез съгласуване с различни частни и държавни институции, социални мрежи, медии, новини и др.
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon sx={{ color: 'white' }}/>}
          aria-controls="panel5-content"
          id="panel5-header"
          sx={{backgroundColor: '#009F58', color: 'white'}}
        >
          Какво представлява докладът ?
        </AccordionSummary>
        <AccordionDetails sx={{backgroundColor: '#ffe6e6'}}>
          Докладът представлява систематизирана информация за природно бедствие или авария. 
          Тази информация включва : 
          <div className="faq5-row1">-тип на бедствието или аварията</div>
          <div className="faq5-row2">-ниво на опасност</div>
          <div className="faq5-row3">-дата и час на изпращане на доклада</div>
          <div className="faq5-row4">-дата и час, до когато докладът е актуален</div>
          <div className="faq5-row5">-област</div>
          <div className="faq5-row6">-район</div>
          <div className="faq5-row7">-координати или линк към точното местополжение в Google Maps</div>
          <div className="faq5-row8">-подробно описание</div>
          <div className="faq5-row9">-изображение (не винаги е налично)</div>
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon sx={{ color: 'white' }}/>}
          aria-controls="panel6-content"
          id="panel6-header"
          sx={{backgroundColor: '#009F58', color: 'white'}}
        >
          Задължително ли е прикачването на изображение при изпращане на доклад ?
        </AccordionSummary>
        <AccordionDetails sx={{backgroundColor: '#ffe6e6'}}>
          Изображенията не са задължителни, но са желателни, защото внасят повече яснота и помагат на диспечерите в оценката и доказване на достоверността на докладите.
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon sx={{ color: 'white' }}/>}
          aria-controls="panel7-content"
          id="panel7-header"
          sx={{backgroundColor: '#009F58', color: 'white'}}
        >
          Защо е нужно предоставянето на лични данни при изпращане на доклад ?
        </AccordionSummary>
        <AccordionDetails sx={{backgroundColor: '#ffe6e6'}}>
          Личните данни предоставени при изпращането на доклад, помагат на диспечерите да осъществят обратна връзка с лице подало доклада, за изясняване на подробностите.
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon sx={{ color: 'white' }}/>}
          aria-controls="panel8-content"
          id="panel8-header"
          sx={{backgroundColor: '#009F58', color: 'white'}}
        >
          Кога и защо един доклад може да бъде отхвърлен ?
        </AccordionSummary>
        <AccordionDetails sx={{backgroundColor: '#ffe6e6'}}>
          Преди един доклад да стане публично достъпен за всички, диспечера който го обработва е длъжен да се свърже с лицето изпратило доклада. Ако диспечера не може да се свърже с лицето в рамките на 3 телефонни прозвънявания, докладът бива отхвърлен.
          Също така, дори докалдът да е напълно изряден, ако достоверността му не бъде потвърдена, той бива отхвърлен.        
        </AccordionDetails>
      </Accordion>


      
    </div>

  </div>
  
  );
  
};