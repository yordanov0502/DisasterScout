const severities = [
    { label: "Ниско", type: "LOW", color: 'yellow', colorOnHover: '#fafa70' },
    { label: "Средно", type: "MEDIUM", color: 'orange', colorOnHover: '#fcc23a'},
    { label: "Високо", type: "HIGH", color: 'red', colorOnHover: '#fc3535' },
    { label: "Критично", type: "CRITICAL", color: '#717a40', colorOnHover: '#909c52' }
  ];
    
  export const getAllSeverities = () => {return severities;}

  export const getLabelOfSeverityType = (severityType) => {
    const severity = severities.find((item) => item.type === severityType);
    return severity ? severity.label : "LOW";
  };

  export const getColorOfSeverityType = (severityType) => {
    const severity = severities.find((item) => item.type === severityType);
    return severity ? (severity.color==='yellow' ? "#dbdb02" : severity.color ) : "#dbdb02";
  };

  export const getBackgroundColorBySeverityColor = (severityColor) => {
    if(severityColor === '#dbdb02') {return '#ffff4d';}
    else if(severityColor === 'orange') {return '#ffc266';}
    else if(severityColor === 'red') {return '#ff6666';}
    else if(severityColor === '#717a40') {return '#a4b05d';}
    else {return 'white';}
  };

  //? Returns whole issue (label,type,color,colorOnHover)
  export const getFullSeverityObjectBySeverity = (severityType) => { 
    const severity = severities.find(s => s.type === severityType);
    return severity ? severity : null;
  }

  export const getSeverityByColor = (zoneColor) => {
    if(zoneColor === 'yellow') {return { label: "Ниско", type: "LOW", color: 'yellow', colorOnHover: '#fafa70' };}
    else if(zoneColor === 'orange') {return { label: "Средно", type: "MEDIUM", color: 'orange', colorOnHover: '#fcc23a'};}
    else if(zoneColor === '#E50000') {return { label: "Високо", type: "HIGH", color: 'red', colorOnHover: '#fc3535' };}
    else if(zoneColor === '#303515') {return  { label: "Критично", type: "CRITICAL", color: '#717a40', colorOnHover: '#909c52' };}
    else return null;
  }

  export const getColorBySeverityType = (severityType) => {
    if(severityType === 'LOW') {return "#e6e600";}
    else if(severityType === 'MEDIUM') {return "orange";}
    else if(severityType === 'HIGH') {return "#E50000";}
    else if(severityType === 'CRITICAL') {return "#303515";}
    else return "#009F58";
  }