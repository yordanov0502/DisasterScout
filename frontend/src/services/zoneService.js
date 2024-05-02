const zones = [
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
  
export const getAllZones = () => {return zones;}

export const getZoneById = (zoneId) => {
  const zone = zones.find(z => z.zoneId === zoneId);
  return zone ? zone.label : null;
}

export const getNonMatchingZones = (zoneIds) => {
   //? Filters the zones to find those whose zoneId is not included in the zoneIds array
   const nonMatchingZones = zones.filter(zone => !zoneIds.includes(zone.zoneId));

   //? Maps the filtered zones to their ids
   return nonMatchingZones.map(zone => zone.zoneId);
}