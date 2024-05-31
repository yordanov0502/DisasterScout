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

  //? Returns whole issue (label,type,color,colorOnHover)
  export const getFullSeverityObjectBySeverity = (severityType) => { 
    const severity = severities.find(s => s.type === severityType);
    return severity ? severity : null;
  }