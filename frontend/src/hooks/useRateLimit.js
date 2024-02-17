import { useState } from "react";

//? This custom hook is created with the intention to be used inside different pages/components
//? to set a certain rate limit to the user's actions

//! These arguments' values are default and can be overridden by the component using this hook accordingly
export const useRateLimit = (maxAttempts = 10, suspensionDuration = 10 * 60 * 1000) => {
  const [attempts, setAttempts] = useState(0);
  const [suspensionStart, setSuspensionStart] = useState(0);

  const isSuspended = () => {
    const now = Date.now();
    if (attempts >= maxAttempts && now - suspensionStart < suspensionDuration) 
    { 
      return true; // Suspended
    } 
    else if (attempts >= maxAttempts && now - suspensionStart >= suspensionDuration) 
    {
      // Suspension time passed, so reset(clear) suspension 
      resetSuspension();
      return false;
    }
    return false; // Nor suspended, neither suspension time passed
  };

  const incrementAttempts = () => {
    setAttempts((prevAttempts) => prevAttempts + 1);
    if (attempts === maxAttempts - 1) // The suspension logic is initiated on the 9th attempt (preparing for suspension), but the actual suspension effect (preventing further actions) is enforced after the 10th attempt (IF DEFAULT VALUES OF HOOK ARGUMENTS ARE USED)
    { 
      setSuspensionStart(Date.now());
    }
  };

  const resetSuspension = () => {
    setAttempts(0);
    setSuspensionStart(0);
  };

  return { isSuspended, incrementAttempts, resetSuspension };
};
