const severities = [
    { label: "Ниско", type: "LOW", color: 'yellow', colorOnHover: '#fafa70' },
    { label: "Средно", type: "MEDIUM", color: 'orange', colorOnHover: '#fcc23a'},
    { label: "Високо", type: "HIGH", color: 'red', colorOnHover: '#fc3535' },
    { label: "Критично", type: "CRITICAL", color: '#717a40', colorOnHover: '#909c52' }
  ];
    
  export const getAllSeverities = () => {return severities;}