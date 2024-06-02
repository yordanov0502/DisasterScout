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
  
  const expectedDurationHoursForRevaluationAndFresh = [
    { label: "-", hours: -1},
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

  const issuesWithEnglishCategories = [
    { label: "Всички", issue: "ALL" ,category: "ALL" },

    { label: "Всички", issue: "ALL" ,category: "SEISMIC_ACTIVITY" },
    { label: "земетресение", issue: "EARTHQUAKE", category: "SEISMIC_ACTIVITY"},
    { label: "цунами", issue: "TSUNAMI", category: "SEISMIC_ACTIVITY"},
    { label: "свлачище", issue: "LANDSLIDE", category: "SEISMIC_ACTIVITY"},

    { label: "Всички", issue: "ALL" ,category: "METEOROLOGICAL_CONDITIONS" },
    { label: "пожар", issue: "FIRE", category: "METEOROLOGICAL_CONDITIONS"},
    { label: "наводнение", issue: "FLOOD", category: "METEOROLOGICAL_CONDITIONS"},
    { label: "дъжд", issue: "RAIN", category: "METEOROLOGICAL_CONDITIONS"},
    { label: "сняг", issue: "SNOW", category: "METEOROLOGICAL_CONDITIONS"},
    { label: "лавина", issue: "AVALANCHE", category: "METEOROLOGICAL_CONDITIONS"},
    { label: "градушка", issue: "HAIL", category: "METEOROLOGICAL_CONDITIONS"},
    { label: "вятър", issue: "WIND", category: "METEOROLOGICAL_CONDITIONS"},
    { label: "ураган", issue: "HURRICANE", category: "METEOROLOGICAL_CONDITIONS"},
    { label: "смерч", issue: "SMERCH", category: "METEOROLOGICAL_CONDITIONS"},
    { label: "мъгла", issue: "FOG", category: "METEOROLOGICAL_CONDITIONS"},
    { label: "буря", issue: "STORM", category: "METEOROLOGICAL_CONDITIONS"},
    { label: "гръмотевична буря", issue: "THUNDERSTORM", category: "METEOROLOGICAL_CONDITIONS"},
    { label: "ниски температури", issue: "LOW_TEMPERATURES", category: "METEOROLOGICAL_CONDITIONS"},
    { label: "високи температури", issue: "HIGH_TEMPERATURES", category: "METEOROLOGICAL_CONDITIONS"},
    { label: "замърсен въздух", issue: "POLLUTED_AIR", category: "METEOROLOGICAL_CONDITIONS"},

    { label: "Всички", issue: "ALL" ,category: "PUBLIC_CONDITIONS" },
    { label: "прекъснато водоснабдяване", issue: "NO_WATER_SUPPLY", category: "PUBLIC_CONDITIONS"},
    { label: "прекъснато електрозахранване", issue: "NO_POWER_SUPPLY", category: "PUBLIC_CONDITIONS"},
    { label: "прекъснати комуникации", issue: "NO_COMMUNICATIONS", category: "PUBLIC_CONDITIONS"},
    { label: "епидемия", issue: "EPIDEMIC", category: "PUBLIC_CONDITIONS"},
    { label: "ядрена авария", issue: "NUCLEAR_ACCIDENT", category: "PUBLIC_CONDITIONS"},
    { label: "изтичане на радиация", issue: "RADIATION_LEAK", category: "PUBLIC_CONDITIONS"},
    { label: "химическо изтичане", issue: "CHEMICAL_SPILL", category: "PUBLIC_CONDITIONS"},
    { label: "бактериологичното заразяване", issue: "BACTERIOLOGICAL_CONTAMINATION", category: "PUBLIC_CONDITIONS"},
    { label: "протест", issue: "PROTEST", category: "PUBLIC_CONDITIONS"},
    { label: "експлозия", issue: "EXPLOSION", category: "PUBLIC_CONDITIONS"},

    { label: "Всички", issue: "ALL" ,category: "ROAD_CONDITIONS" },
    { label: "затворен път", issue: "CLOSED_ROAD", category: "ROAD_CONDITIONS"},
    { label: "ПТП", issue: "ROAD_ACCIDENT", category: "ROAD_CONDITIONS"},
    { label: "затруднени условия", issue: "DIFFICULT_ROAD_CONDITIONS", category: "ROAD_CONDITIONS"},
    { label: "ремонтни дейности", issue: "ROADWORKS", category: "ROAD_CONDITIONS"},
    { label: "поледица", issue: "ICY_ROAD", category: "ROAD_CONDITIONS"},

    { label: "Всички", issue: "ALL" ,category: "MILITARY_CONDITIONS" },
    { label: "сухоземно нападение", issue: "INFANTRY_ATTACK", category: "MILITARY_CONDITIONS"},
    { label: "въздушно нападение", issue: "AIR_ATTACK", category: "MILITARY_CONDITIONS"},
    { label: "морско нападение", issue: "NAVAL_ATTACK", category: "MILITARY_CONDITIONS"},
    { label: "бомба", issue: "BOMB", category: "MILITARY_CONDITIONS"},
    { label: "гражданска война", issue: "CIVIL_WAR", category: "MILITARY_CONDITIONS"},
    { label: "заложническа криза", issue: "HOSTAGE_CRISIS", category: "MILITARY_CONDITIONS"},
    { label: "преврат", issue: "COUP", category: "MILITARY_CONDITIONS"},
    { label: "атентат", issue: "ASSASSINATION", category: "MILITARY_CONDITIONS"},
    { label: "тероризъм", issue: "TERRORISM", category: "MILITARY_CONDITIONS"},

    { label: "Всички", issue: "ALL" ,category: "SPACE_PHENOMENON" },
    { label: "метеоритен удар", issue: "METEORITE_IMPACT", category: "SPACE_PHENOMENON"},
    { label: "метеоритен дъжд", issue: "METEOR_RAIN", category: "SPACE_PHENOMENON"},
    { label: "слънчеви бури", issue: "SOLAR_STORMS", category: "SPACE_PHENOMENON"},
  ];

  const categories = [
    { label: "Всички", category: "ALL" },

    { label: "Сеизмична активност", category: "SEISMIC_ACTIVITY" },
    { label: "Метеорологични условия",  category: "METEOROLOGICAL_CONDITIONS" },
    { label: "Обществени условия",  category: "PUBLIC_CONDITIONS"},
    { label: "Пътни условия", category: "ROAD_CONDITIONS"},
    { label: "Военни условия",  category: "MILITARY_CONDITIONS"},
    { label: "Космическо явление",  category: "SPACE_PHENOMENON"},
  ];

  const reportStates = [
    { label: "Изчакващи", type: "PENDING" },
    { label: "Активни", type: "FRESH" },
    { label: "За преоценка", type: "FOR_REVALUATION" },
    { label: "Изтекли", type: "INACTIVE" },
  ];

  //////////////////////////////////////////////////////////////////////////////////////////////
  //! Used for validation of search params
  export const validStates = ['PENDING', 'FOR_REVALUATION', 'FRESH', 'INACTIVE'];
  export const validSeverityTypes = ['ALL', 'CRITICAL', 'HIGH', 'MEDIUM', 'LOW'];
  export const validZoneIds = ['st1', 'st2', 'st3', 'st4', 'st5', 'st6', 'st7', 'st8', 'st9', 'st10', 'st11', 'st12', 'st13', 'st14', 'st15', 'st16', 'st17', 'st18', 'st19', 'st20', 'st21', 'st22', 'st23', 'st24', 'st25', 'st26', 'st27', 'st28'];
  export const validCategories = ['ALL', 'SEISMIC_ACTIVITY', 'METEOROLOGICAL_CONDITIONS', 'PUBLIC_CONDITIONS', 'ROAD_CONDITIONS', 'MILITARY_CONDITIONS', 'SPACE_PHENOMENON'];
  export const validIssues = ['ALL', 'EARTHQUAKE', 'TSUNAMI', 'LANDSLIDE', 'FIRE', 'FLOOD', 'RAIN', 'SNOW', 'AVALANCHE', 'HAIL', 'WIND', 'HURRICANE', 'SMERCH', 'FOG', 'STORM', 'THUNDERSTORM', 'LOW_TEMPERATURES', 'HIGH_TEMPERATURES', 'POLLUTED_AIR', 'NO_WATER_SUPPLY', 'NO_POWER_SUPPLY', 'NO_COMMUNICATIONS', 'EPIDEMIC', 'NUCLEAR_ACCIDENT', 'RADIATION_LEAK', 'CHEMICAL_SPILL', 'BACTERIOLOGICAL_CONTAMINATION', 'PROTEST', 'EXPLOSION', 'CLOSED_ROAD', 'ROAD_ACCIDENT', 'DIFFICULT_ROAD_CONDITIONS', 'ROADWORKS', 'ICY_ROAD', 'INFANTRY_ATTACK', 'AIR_ATTACK', 'NAVAL_ATTACK', 'BOMB', 'CIVIL_WAR', 'HOSTAGE_CRISIS', 'COUP', 'ASSASSINATION', 'TERRORISM', 'METEORITE_IMPACT', 'METEOR_RAIN', 'SOLAR_STORMS'];
          
  export const validSeismicActivityIssues = ['ALL', 'EARTHQUAKE', 'TSUNAMI', 'LANDSLIDE'];
  export const validMeteorologicalConditionsIssues = ['ALL', 'FIRE', 'FLOOD', 'RAIN', 'SNOW', 'AVALANCHE', 'HAIL', 'WIND', 'HURRICANE', 'SMERCH', 'FOG', 'STORM', 'THUNDERSTORM', 'LOW_TEMPERATURES', 'HIGH_TEMPERATURES', 'POLLUTED_AIR']
  export const validPublicConditionsIssues = ['ALL', 'NO_WATER_SUPPLY', 'NO_POWER_SUPPLY', 'NO_COMMUNICATIONS', 'EPIDEMIC', 'NUCLEAR_ACCIDENT', 'RADIATION_LEAK', 'CHEMICAL_SPILL', 'BACTERIOLOGICAL_CONTAMINATION', 'PROTEST', 'EXPLOSION'];
  export const validRoadConditionsIssues = ['ALL', 'CLOSED_ROAD', 'ROAD_ACCIDENT', 'DIFFICULT_ROAD_CONDITIONS', 'ROADWORKS', 'ICY_ROAD'];
  export const validMilitaryConditionsIssues = ['ALL', 'INFANTRY_ATTACK', 'AIR_ATTACK', 'NAVAL_ATTACK', 'BOMB', 'CIVIL_WAR', 'HOSTAGE_CRISIS', 'COUP', 'ASSASSINATION', 'TERRORISM'];
  export const validSpacePhenomenonIssues = ['ALL', 'METEORITE_IMPACT', 'METEOR_RAIN', 'SOLAR_STORMS'];
  //////////////////////////////////////////////////////////////////////////////////////////////






  //? Returns state (label)
  export const getReportStateByType = (type) => { 
    const reportState = reportStates.find(r => r.type === type);
    return reportState ? reportState.label : null;
  }

    
  export const getExpectedDurationHours = () => {return expectedDurationHours;}

  export const getExpectedDurationHoursForRevaluationAndFresh = () => {return expectedDurationHoursForRevaluationAndFresh;}

  //? Returns whole expectedDurationHoursObject (label,hours)
  export const getFullExpectedDurationObjectByExpectedDurationForRevaluationAndFresh = (hours) => { 
    const expectedDuration = expectedDurationHoursForRevaluationAndFresh.find(h => h.hours === hours);
    return expectedDuration ? expectedDuration : null;
  }

    //? Returns whole expectedDurationHoursObject (label,hours)
    export const getFullExpectedDurationObjectByExpectedDuration = (hours) => { 
      const expectedDuration = expectedDurationHours.find(h => h.hours === hours);
      return expectedDuration ? expectedDuration : null;
    }

  export const getAllIssues = () => {return issues;}

  export const getAllCategories = () => {return categories;}

  export const getLabelOfIssue = (issueArg) => {
    const issue = issues.find((item) => item.issue === issueArg);
    return issue ? issue.label : "";
  };

  //? Returns whole category (label,category)
  export const getFullCategoryObjectByCategory = (categoryArg) => { 
    const category = categories.find(c => c.category === categoryArg);
    return category ? category : null;
  }

  ////////////////////////////////////////////////////////////////////////////
  //!!! Here issesWithEnglishCategories is used, because the english version is needed for category comparison rather than the bulgarian one

  //? Returns whole issue (label,issue,category)
  export const getFullIssueObjectByIssue = (issueArg) => { 
    const issue = issuesWithEnglishCategories.find(i => i.issue === issueArg);
    return issue ? issue : null;
  }

  //? Returns array of issues relating to a specific category (label,issue,category)
  export const getAllIssuesByCategory = (categoryArg) => { 
    return issuesWithEnglishCategories.filter((issue) => issue.category === categoryArg);
  }
  ////////////////////////////////////////////////////////////////////////////


  export const submitReportRequest = (requestBody) => {
    return axiosInstanceWithCredentials.post("/external/reports/submit",requestBody);
  };

  export const getReportCardsFromPageRequest = (pageNumber,state,severityType,zoneId,area,category,issue) => {
    return axiosInstanceWithCredentials.get(`/internal/dispatcher/reports?page=${pageNumber}&state=${state}&severityType=${severityType}&zoneId=${zoneId}&area=${area}&category=${category}&issue=${issue}`);
  };

  export const getReportForCMS = (reportId,state,severityType,zoneId,area,category,issue) => {
    return axiosInstanceWithCredentials.get(`/internal/dispatcher/reports/get?reportId=${reportId}&state=${state}&severityType=${severityType}&zoneId=${zoneId}&area=${area}&category=${category}&issue=${issue}`);
  };

  export const acceptReportRequest = ({urlParams, requestBody}) => {

    const {reportId,state,severityType,zoneId,area,category,issue} = urlParams;

    return axiosInstanceWithCredentials.put(`/internal/dispatcher/reports/accept?reportId=${reportId}&state=${state}&severityType=${severityType}&zoneId=${zoneId}&area=${area}&category=${category}&issue=${issue}`,requestBody);
  };

  export const rejectReportRequest = ({urlParams}) => {

    const {reportId,state,severityType,zoneId,area,category,issue} = urlParams;

    return axiosInstanceWithCredentials.delete(`/internal/dispatcher/reports/reject?reportId=${reportId}&state=${state}&severityType=${severityType}&zoneId=${zoneId}&area=${area}&category=${category}&issue=${issue}`);
  };

  export const revaluateReportRequest = ({urlParams, requestBody}) => {

    const {reportId,state,severityType,zoneId,area,category,issue} = urlParams;

    return axiosInstanceWithCredentials.put(`/internal/dispatcher/reports/revaluate?reportId=${reportId}&state=${state}&severityType=${severityType}&zoneId=${zoneId}&area=${area}&category=${category}&issue=${issue}`,requestBody);
  };

  export const terminateReportRequest = ({urlParams,requestBody}) => {

    const {reportId,state,severityType,zoneId,area,category,issue} = urlParams;

    return axiosInstanceWithCredentials.put(`/internal/dispatcher/reports/terminate?reportId=${reportId}&state=${state}&severityType=${severityType}&zoneId=${zoneId}&area=${area}&category=${category}&issue=${issue}`,requestBody);
  };