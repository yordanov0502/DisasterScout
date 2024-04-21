// export const mapIdsToZones = (zoneIds) => {

//     const IdToZoneMapping = {
//       "st1": "Благоевград",
//       "st2": "Бургас",
//       "st3": "Варна",
//       "st4": "Велико Търново",
//       "st5": "Видин",
//       "st6": "Враца",
//       "st7": "Габрово",
//       "st8": "Добрич",
//       "st9": "Кърджали",
//       "st10": "Кюстендил",
//       "st11": "Ловеч",
//       "st12": "Монтана",
//       "st13": "Пазарджик",
//       "st14": "Перник",
//       "st15": "Плевен",
//       "st16": "Пловдив",
//       "st17": "Разград",
//       "st18": "Русе",
//       "st19": "Силистра",
//       "st20": "Сливен",
//       "st21": "Смолян",
//       "st22": "Софийска област",
//       "st23": "София-град",
//       "st24": "Стара Загора",
//       "st25": "Търговище",
//       "st26": "Хасково",
//       "st27": "Шумен",
//       "st28": "Ямбол",
//     };
  
//     const zoneNames = zoneIds.map(zoneId => IdToZoneMapping[zoneId]).filter(zone => zone !== undefined);
  
//     return zoneNames.length > 1 ? zoneNames.join(', ') : zoneNames.join('');
//   }
  
     
export const getAllZones = () => {

 return [
      { label: "Благоевград", zoneId: "st1" },
      { label: "Бургас", zoneId: "st2" },
      { label: "Варна", zoneId: "st3" },
      { label: "Велико Търново", zoneId: "st4" },
      { label: "Видин", zoneId: "st5" },
      { label: "Враца", zoneId: "st6" },
      { label: "Габрово", zoneId: "st7" },
      { label: "Добрич", zoneId: "st8" },
      { label: "Кърджали", zoneId: "st9" },
      { label: "Кюстендил", zoneId: "st10" },
      { label: "Ловеч", zoneId: "st11" },
      { label: "Монтана", zoneId: "st12" },
      { label: "Пазарджик", zoneId: "st13" },
      { label: "Перник", zoneId: "st14" },
      { label: "Плевен", zoneId: "st15" },
      { label: "Пловдив", zoneId: "st16" },
      { label: "Разград", zoneId: "st17" },
      { label: "Русе", zoneId: "st18" },
      { label: "Силистра", zoneId: "st19" },
      { label: "Сливен", zoneId: "st20" },
      { label: "Смолян", zoneId: "st21" },
      { label: "Софийска област", zoneId: "st22" },
      { label: "София-град", zoneId: "st23" },
      { label: "Стара Загора", zoneId: "st24" },
      { label: "Търговище", zoneId: "st25" },
      { label: "Хасково", zoneId: "st26" },
      { label: "Шумен", zoneId: "st27" },
      { label: "Ямбол", zoneId: "st28" },
    ];
}