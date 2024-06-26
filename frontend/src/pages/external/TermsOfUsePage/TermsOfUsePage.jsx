import { useEffect } from "react";
import './terms_of_use_page.scss';

export const TermsOfUsePage = () => {

  //? Cleanup effect to reset scroll position when component unmounts
  useEffect(() => {
    return () => {
      window.scroll({ top: 0, behavior: 'auto' });
    };
  }, []);

    return (
      <div className="terms_of_use_page">
        
        <div className="terms_of_use_page__title">
          Общи условия за ползване на услугите на 
          <span className="terms_of_use_page__title--disaster">DISASTER</span>
          <span className="terms_of_use_page__title--scout">SCOUT</span>
        </div>

        <div className="terms_of_use_page__info-container"> 
           <div className="terms_of_use_page__info-container--p">ВНИМАНИЕ! Внимателно прочетете тези условия, преди да използвате това уеб приложение. Ако използвате това уеб приложение се счита, че приемате и сте съгласни с тези условия. Ако НЕ ПРИЕМАТЕ тези условия, не използвайте това уеб приложение!</div>
        
           <div className="terms_of_use_page__info-container--p">Настоящите ОБЩИ УСЛОВИЯ уреждат взаимоотношенията между уеб приложението от една страна и потребителите на електронни (Интернет) страници и услуги, които са част от Disaster Scout.</div>
        
           <div className="terms_of_use_page__info-container--p">Тези условия обвързват всички потребители. С натискането на всеки един обект, линк или бутон, разположени на страниците на Disaster Scout (с изключение на линка към настоящите Общи условия), потребителят се съгласява, изцяло приема и се задължава да спазва настоящите Общи условия.</div>
        
           







           <div className="terms_of_use_page__info-container--p">
           <span className="terms_of_use_page__info-container--p--bolditalic">{"I. ПРЕАМБЮЛ - "}</span> 
           изброените по-долу понятия се използват в настоящите Общи условия със следния смисъл:
           </div>

           <div className="terms_of_use_page__info-container--p">
           <span className="terms_of_use_page__info-container--p--bold">{"1. „Потребител“ - "}</span> 
           всички дееспособни физически (на/над 18 годишна възраст) и/или юридически лица, както и неперсонифицирани обединения, които достъпват уеб приложението Disaster Scout и се възползват от предлаганите услуги и функционалности, в това число и потребители, попадащи под закрилата на ЗЗП.
           </div>

           <div className="terms_of_use_page__info-container--p">
           <span className="terms_of_use_page__info-container--p--bold">{"2. „Потребител, попадащ под закрилата на ЗЗП“ - "}</span> 
           е всяко физическо лице, което придобива стоки или ползва услуги, които не са предназначени за извършване на търговска или професионална дейност, и всяко физическо лице, което като страна по договор по този закон действа извън рамките на своята търговска или професионална дейност.
           </div>

           <div className="terms_of_use_page__info-container--p">
           <span className="terms_of_use_page__info-container--p--bold">{"3. „Регистриран потребител“ - "}</span> 
           всеки потребител, който има достъп до системата за управление на съдържанието на Disaster Scout. Такъв потребител може да се възприема и като служител, отговарящ за качеството и достоверността на предоставената информация в уеб приложението.  Ролята на такъв потребител може да бъде диспечер или администратор.
           </div>

           <div className="terms_of_use_page__info-container--p">
           <span className="terms_of_use_page__info-container--p--bold">{"4. „Доклад“ - "}</span> 
            това е информация за прирородно бедствие или авария, систематизирана под формата на обява, съдъражаща типа бедствие или авария, подробно описание, ниво на опасност, изображение, дати и часове описващи времевия период на валидност, област, район и координати или линк към точно местоположение в Google Maps.
           </div>

           <div className="terms_of_use_page__info-container--p">
           <span className="terms_of_use_page__info-container--p--bold">{"5. „Област“ - "}</span> 
            това понятие отговаря на площ от територията на Република България, която граничи с други области, държави, море или реки.
           </div>

           <div className="terms_of_use_page__info-container--p">
           <span className="terms_of_use_page__info-container--p--bold">{"6. „Предупреждение за опасност“ - "}</span> 
            това е информация за събитие или явление с негативен характер, което предстои да случи, случва се или е възможно да се случи на територията на една или повече области на Република България.
           </div>

           <div className="terms_of_use_page__info-container--p">
           <span className="terms_of_use_page__info-container--p--bold">{"7. „Обработване на лични данни“ - "}</span> 
            това е всяко действие или съвкупност от действия, които могат да се извършват по отношение на личните данни с автоматични или други средства, като събиране, записване, организиране, съхраняване, адаптиране или изменение, възстановяване, консултиране, употреба, разкриване чрез предаване, разпространяване, предоставяне, актуализиране или комбиниране, блокиране, заличаване или унищожаване.
           </div>







           <div className="terms_of_use_page__info-container--p">
           <span className="terms_of_use_page__info-container--p--bolditalic">{"II. ПРЕДМЕТ НА ОБЩИТЕ УСЛОВИЯ"}</span> 
           </div>

           <div className="terms_of_use_page__info-container--p">
           <ol>
                <li>С настоящите Общи условия се уреждат условията и редът за предоставяне уеб услуги и функционалности, извършвани от Disaster Scout,  при стриктно спазване от страна на Потребителя на изискванията, посочени в настоящите Общи условия.</li>
                <li>Disaster Scout не носи отговорност за каквито и да са смущения или технически проблеми, осуетяващи възможността за използване на уеб услуги, в резултат от експлоатирането на каквото и да било компютърно оборудване от Потребителя.</li>
                <li>При извършване на промени в Общите условия, Disaster Scout се задължава да публикува в уеб приложението актуалния текст на измененията.</li>
                <li>Чрез приемането на тези Общи условия, Потребителят се съгласява да ги спазва без никакви изключения.</li>
            </ol>
           </div>






           <div className="terms_of_use_page__info-container--p">
           <span className="terms_of_use_page__info-container--p--bolditalic">{"III. ПРАВО НА ИНТЕЛЕКТУАЛНА СОБСТВЕНОСТ"}</span> 
           </div>

           <div className="terms_of_use_page__info-container--p">
           <ol>
                <li>Потребителят няма право да използва уеб приложението за изпращане или предаване на каквито и да е материали с противозаконно, заплашително, невярно, подвеждащо, оскърбително, малтретиращо, опозоряващо, оклеветяващо, вулгарно, неприлично, скандално, подстрекаващо, порнографско или религиозно некоректно съдържание, или каквито и да е материали, които установяват или окуражават поведение, което би било сметнато за криминално престъпление, би довело до гражданска или наказателна отговорност или по друг начин би нарушило закона.</li>
                <li>Цялото съдържание на Уеб приложението включително текстова част, рисунки, графики, снимки, бази данни, дизайн, видео, марки, софтуерни програми, лого, слогани и друга информация, представляват обект на авторско право по смисъла на Закона за авторското право и сродните му права и са притежание на Disaster Scout и/или неговите партньори, клиенти или на потребители, предоставили за публикуване съответните материали.</li>
            </ol>
           </div>







           <div className="terms_of_use_page__info-container--p">
           <span className="terms_of_use_page__info-container--p--bolditalic">{"IV. ИЗПОЛЗВАНЕ НА УЕБСАЙТА"}</span> 
           </div>

           <div className="terms_of_use_page__info-container--p">
           <ol>
                <li>При изпращане на Доклад, Потребителят попълва форма, в която въвежда следната информация: тип бедствие / авария, ниво на опасност, времетраене, подробно описание, област, район, адрес (не е задължително), координати или линк към местоположение в Google Maps, име, фамилия, телефонен номер, изображение (не е задължително).</li>
                <li>За използването на Уеб приложението Disaster Scout, Потребителят се задължава да предоставя вярна, точна и актуална информация. Disaster Scout не носи отговорност за некоректно попълнени от Потребителя данни при изпращане на доклад за природно бедствие или авария.</li>
                <li>След успешно изпращане на доклад за природно бедствие или авария, потребителят получава прозвъняване от диспечер на предоставеният телефонен номер, за уточняване на подробности.</li>
                <li>Disaster Scout не носи отговорност за каквито и да е щети и загуби, възникнали поради неспазване на разпоредбите на настоящия раздел.</li>
            </ol>
           </div>





           <div className="terms_of_use_page__info-container--p">
           <span className="terms_of_use_page__info-container--p--bolditalic">{"V. ЗАЩИТА НА ЛИЧНИТЕ ДАННИ. КОНФИДЕНЦИАЛНОСТ"}</span> 
           </div>

           <div className="terms_of_use_page__info-container--p">
              <ol>
                <li>Информацията, чрез която Потребителят може да бъде идентифициран, може да включва: име, фамилия, телефонен номер, както и всяка друга информация, която същият предоставя доброволно при изпращането на доклад за природно бедствие или авария.</li>
                <li>Disaster Scout гарантира на своите Потребители конфиденциалността на предоставените лични данни. Те няма да бъдат използвани, предоставяни или довеждани до знанието на трети лица, извън случаите и при условия, посочени в тези Общи условия.</li>          
                <li>Съгласно Европейския Регламент /ЕС/ 2016/679 – GDPR за защита на личните данни, който влезе в сила на 25.05.2018 год., Потребителят, в качеството си на Субект на лични данни, има следните права: на достъп до личните си данни; на коригиране (ако данните са неточни); на изтриване (право „да бъде забравен“); на ограничаване на обработването; на преносимост на личните му данни между отделни администратори; на възражение срещу обработването на личните му данни; на жалба до надзорен орган; да не бъде обект на решение, основаващо се единствено на автоматизирано обработ-ване, включващо профилиране, което поражда правни последствия за него като субект на данните или по подобен начин го засяга в значителна степен; на защита по съдебен или административен ред, в случай че правата му на субект на данни са били нарушени.</li>
                <li>Потребител, който е изпратил доклад за природно бедствие или авария автоматично се съгласява предоставените от него лични данни да бъдат обработвани от Disaster Scout по електронен път.</li>
                <li>При спазване на действащото законодателство и клаузите на тези Общи условия, Disaster Scout може да използва личните данни на Потребител единствено и само за целта, за която те са предоставени. Всякакви други цели, за които могат да се използват данните, ще бъдат съобразени със законодателството, приложи-мите международни актове, Интернет етикета, правилата на морала и добрите нрави. Disaster Scout изрично уведомява, че предоставените от Потребителя лични данни не се предоставят на трети лица за рекламни или маркетингови цели.</li>
                <li>Disaster Scout има право да разкрива лични данни, в случаите когато информацията е изискана от държавни органи или длъжностни лица, които според действащото законодателство са оправомощени да изискват и събират такава информация. В тези случаи информацията се предоставя по силата на закона – единствено и само за целта, за която са предоставени.</li>
                <li>Достъпът и ползването от потребителите на социалните мрежи – Facebook, Instagram,  и др. изискват регистрация и приемане на общите условия на съответните интернет страници и Disaster Scout не носи отговорност за защита на личните данни при приемане условията на тези сайтове.</li>
              </ol>
           </div>






           <div className="terms_of_use_page__info-container--p">
           <span className="terms_of_use_page__info-container--p--bolditalic">{"VI. ДРУГИ"}</span> 
           </div>

           <div className="terms_of_use_page__info-container--p">
              <ol>
                <li>Disaster Scout има право да променя технологията и дизайна на уеб приложението без предварително известяване.</li>
              </ol>
           </div>







           <div className="terms_of_use_page__info-container--p">
           <span className="terms_of_use_page__info-container--p--bolditalic">{"VII. ОТГОВОРНОСТ"}</span> 
           </div>

           <div className="terms_of_use_page__info-container--p">
              <ol>
                <li>Disaster Scout се стреми да поддържа актуална информация от източници, които счита за достоверни, но не гарантира, че те са такива, както и че страницата не съдържа грешки и че достъпът до нея е непрекъсваем.</li>
                <li>Всякакъв тип информация, предоставена в уеб приложението, изразяваща се в съвети, насоки и препоръки, засягащи здравето и живота на потребителите и не само, не следва да се тълкува като „лекарска препоръка“ или „медицински съвет“.</li>
                <li>Disaster Scout може по всяко време по своя преценка да премахне всеки доклад, изпратен от потребители.</li>
                <li>Disaster Scout не носи отговорност за качеството и състоянието на връзките към интернет, както и за изправността на устройствата, които ги осигуряват, от потребителски компютър до сървъра, върху който е разположено уеб приложението.</li>
                <li>Disaster Scout не носи отговорност за каквито и да е загуби – преки, непреки или последващи вреди, пропуснати ползи, произтичащи от или свързани с достъпа на потребителите до ползването на уеб приложението.</li>
                <li>Възможно е конкретно съдържание, предоставяно чрез Disaster Scout  да съдържа материали от трети лица. Уеб приложението може да съдържа връзки към уебсайтове управлявани от трети лица, които са собственост или се оперират от трети лица, не от Disaster Scout. Тези връзки са предоста-вени само за Ваше удобство. Disaster Scout няма контрол и не носи отговорност за съдържанието, политиките за защита на личната информация или сигурността на такива сайтове. Потребителят е отговорен за запознаването си с Общите условия и политики на тези сайтове, преди да се възползва от техните услуги. При възникване на, обвинения или въпроси от страна на Потребителя, то следва те да бъдат насочени към съответните трети лица.</li>
                
                <li><span className="terms_of_use_page__info-container--p--bolditalic">{"Бисквитки"}</span> - файловете “Бисквитки” са компютърни данни и по-специално – текстови файлове, съхранявани на крайното устройство на Потребителя, предназначени за използване на уеб страници. Тези файлове позволяват идентифицирането на устройството на Потребителя и правилното показване на уеб страницата, предназ-начена за неговите индивидуални предпочитания. “Бисквитките” обикновено съдържат името на уебсайта, от който са дошли, времето на тяхното съхранение на крайното устройство и уникален номер.</li>
              </ol>
           </div>






           <div className="terms_of_use_page__info-container--p">
           <span className="terms_of_use_page__info-container--p--bolditalic">{"За какво се използват файловете Cookies “Бисквитки” ?"}</span> 
           </div>

           <div className="terms_of_use_page__info-container--p">
           “Бисквитките” се съдържат в HTTP протокола, използван за свързване на интернет сървъра с браузъра. Всяка бисквитка се състои от: ключа, дефиниращ името на стойностите, стойнос-тите и жизнения цикъл, след който браузърът трябва да премахне бисквитката. Функциите на бисквитките са предназначени за настройки на браузъра. “Бисквитките” се използват, за автентикация и удостоверяване на Регистрираните потребители или още наричани служители на Disaster Scout (диспечери и администратори).
           </div>





           <div className="terms_of_use_page__info-container--p">
           <span className="terms_of_use_page__info-container--p--bolditalic">{"Какви файлове Cookies “Бисквитки” използваме ние?"}</span> 
           </div>

           <div className="terms_of_use_page__info-container--p">
           Има два стандартни вида файлове с “Бисквитки” – „сесийни“ и „постоянни“. Първите са временни файлове, които остават на устройството на потребителя, докато излезе от уебсайта или изключи софтуера (уеб браузърa на Потребителя). „Постоянните“ файлове остават на устройството на Потребителя за времето, посочено в параметрите на файловете с “Бисквитки” или докато не бъдат ръчно изтрити от Потребителя. Уеб приложението използва “постоянни бисквитки” за автентикация и удостоверяване на Регистрираните потребители или още наричани служители на Disaster Scout (диспечери и администратори).
           </div>






           <div className="terms_of_use_page__info-container--p">
           <span className="terms_of_use_page__info-container--p--bolditalic">{"VIII. ПРИЛОЖИМО ПРАВО"}</span> 
           </div>

           <div className="terms_of_use_page__info-container--p">
              <ol>
                <li>За всички неуредени в тези Общи условия въпроси се прилагат разпоредбите на действащото българско законодателство.</li>
                <li>Всички спорове, отнасящи се до тези Общи условия, които страните не са успели да решат чрез преговори и/или по взаимно съгласие, се отнасят за решаване пред компетентните български съдилища.</li>
              </ol>
           </div>


        </div>

  </div>
  
  );
  
};