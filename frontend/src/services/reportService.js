import { axiosInstanceWithCredentials } from "../utils/axiosInstances";

const expectedDurationHours = [
    { label: "не знам", hours: -1},
    { label: "1 час", hours: 1},
    { label: "2 часа", hours: 2},
    { label: "3 часа", hours: 3},
    { label: "4 часа", hours: 4},
    { label: "5 часа", hours: 5},
    { label: "6 часа", hours: 6},
    { label: "7 часа", hours: 7},
    { label: "8 часа", hours: 8},
    { label: "9 часа", hours: 9},
    { label: "10 часа", hours: 10},
    { label: "11 часа", hours: 11},
    { label: "12 часа", hours: 12},
    { label: "13 часа", hours: 13},
    { label: "14 часа", hours: 14},
    { label: "15 часа", hours: 15},
    { label: "16 часа", hours: 16},
    { label: "17 часа", hours: 17},
    { label: "18 часа", hours: 18},
    { label: "19 часа", hours: 19},
    { label: "20 часа", hours: 20},
    { label: "21 часа", hours: 21},
    { label: "22 часа", hours: 22},
    { label: "23 часа", hours: 23},
    { label: "24 часа", hours: 24},
    { label: "48 часа", hours: 48},
    { label: "72 часа", hours: 72}
  ];

  const issues = [
    { label: "земетресение", issue: "EARTHQUAKE", category: "Сеизмична активност"},
    { label: "цунами", issue: "TSUNAMI", category: "Сеизмична активност"},
    { label: "свлачище", issue: "LANDSLIDE", category: "Сеизмична активност"},

    { label: "пожар", issue: "FIRE", category: "Метеорологични условия"},
    { label: "наводнение", issue: "FLOOD", category: "Метеорологични условия"},
    { label: "дъжд", issue: "RAIN", category: "Метеорологични условия"},
    { label: "сняг", issue: "SNOW", category: "Метеорологични условия"},
    { label: "лавина", issue: "AVALANCHE", category: "Метеорологични условия"},
    { label: "градушка", issue: "HAIL", category: "Метеорологични условия"},
    { label: "вятър", issue: "WIND", category: "Метеорологични условия"},
    { label: "ураган", issue: "HURRICANE", category: "Метеорологични условия"},
    { label: "смерч", issue: "SMERCH", category: "Метеорологични условия"},
    { label: "мъгла", issue: "FOG", category: "Метеорологични условия"},
    { label: "буря", issue: "STORM", category: "Метеорологични условия"},
    { label: "гръмотевична буря", issue: "THUNDERSTORM", category: "Метеорологични условия"},
    { label: "ниски температури", issue: "LOW_TEMPERATURES", category: "Метеорологични условия"},
    { label: "високи температури", issue: "HIGH_TEMPERATURES", category: "Метеорологични условия"},
    { label: "замърсен въздух", issue: "POLLUTED_AIR", category: "Метеорологични условия"},

    { label: "прекъснато водоснабдяване", issue: "NO_WATER_SUPPLY", category: "Обществени условия"},
    { label: "прекъснато електрозахранване", issue: "NO_POWER_SUPPLY", category: "Обществени условия"},
    { label: "прекъснати комуникации", issue: "NO_COMMUNICATIONS", category: "Обществени условия"},
    { label: "епидемия", issue: "EPIDEMIC", category: "Обществени условия"},
    { label: "ядрена авария", issue: "NUCLEAR_ACCIDENT", category: "Обществени условия"},
    { label: "изтичане на радиация", issue: "RADIATION_LEAK", category: "Обществени условия"},
    { label: "химическо изтичане", issue: "CHEMICAL_SPILL", category: "Обществени условия"},
    { label: "бактериологичното заразяване", issue: "BACTERIOLOGICAL_CONTAMINATION", category: "Обществени условия"},
    { label: "протест", issue: "PROTEST", category: "Обществени условия"},
    { label: "експлозия", issue: "EXPLOSION", category: "Обществени условия"},

    { label: "затворен път", issue: "CLOSED_ROAD", category: "Пътни условия"},
    { label: "ПТП", issue: "ROAD_ACCIDENT", category: "Пътни условия"},
    { label: "затруднени условия", issue: "DIFFICULT_ROAD_CONDITIONS", category: "Пътни условия"},
    { label: "ремонтни дейности", issue: "ROADWORKS", category: "Пътни условия"},
    { label: "поледица", issue: "ICY_ROAD", category: "Пътни условия"},

    { label: "сухоземно нападение", issue: "INFANTRY_ATTACK", category: "Военни условия"},
    { label: "въздушно нападение", issue: "AIR_ATTACK", category: "Военни условия"},
    { label: "морско нападение", issue: "NAVAL_ATTACK", category: "Военни условия"},
    { label: "бомба", issue: "BOMB", category: "Военни условия"},
    { label: "гражданска война", issue: "CIVIL_WAR", category: "Военни условия"},
    { label: "заложническа криза", issue: "HOSTAGE_CRISIS", category: "Военни условия"},
    { label: "преврат", issue: "COUP", category: "Военни условия"},
    { label: "атентат", issue: "ASSASSINATION", category: "Военни условия"},
    { label: "тероризъм", issue: "TERRORISM", category: "Военни условия"},

    { label: "метеоритен удар", issue: "METEORITE_IMPACT", category: "Космическо явление"},
    { label: "метеоритен дъжд", issue: "METEOR_RAIN", category: "Космическо явление"},
    { label: "слънчеви бури", issue: "SOLAR_STORMS", category: "Космическо явление"},
  ];

    
  export const getExpectedDurationHours = () => {return expectedDurationHours;}

  export const getAllIssues = () => {return issues;}








  export const submitReportRequest = (requestBody) => {
    return axiosInstanceWithCredentials.post("/external/reports/submit",requestBody);
  };