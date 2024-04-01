export const mapIdsToZones = (zoneIds) => {

    const IdToZoneMapping = {
      "st1": "Благоевград",
      "st2": "Бургас",
      "st3": "Варна",
      "st4": "Велико Търново",
      "st5": "Видин",
      "st6": "Враца",
      "st7": "Габрово",
      "st8": "Добрич",
      "st9": "Кърджали",
      "st10": "Кюстендил",
      "st11": "Ловеч",
      "st12": "Монтана",
      "st13": "Пазарджик",
      "st14": "Перник",
      "st15": "Плевен",
      "st16": "Пловдив",
      "st17": "Разград",
      "st18": "Русе",
      "st19": "Силистра",
      "st20": "Сливен",
      "st21": "Смолян",
      "st22": "Софийска област",
      "st23": "София-град",
      "st24": "Стара Загора",
      "st25": "Търговище",
      "st26": "Хасково",
      "st27": "Шумен",
      "st28": "Ямбол",
    };
  
    const zoneNames = zoneIds.map(zoneId => IdToZoneMapping[zoneId]).filter(zone => zone !== undefined);
  
    return zoneNames.length > 1 ? zoneNames.join(', ') : zoneNames.join('');
  }
  