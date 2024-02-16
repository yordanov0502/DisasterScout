import { useState } from "react";

export const useLoginRateLimit = (maxAttempts = 10, suspensionDuration = 10 * 60 * 1000) => {
  const [loginAttempts, setLoginAttempts] = useState(0);
  const [suspensionStart, setSuspensionStart] = useState(0);

  const isSuspended = () => {
    const now = Date.now();
    if (loginAttempts >= maxAttempts && now - suspensionStart < suspensionDuration) 
    { 
      return true; // Suspended
    } 
    else if (loginAttempts >= maxAttempts && now - suspensionStart >= suspensionDuration) 
    {
      // Suspension time passed, so reset(clear) suspension 
      resetSuspension();
      return false;
    }
    return false; // Nor suspended, neither suspension time passed
  };

  const incrementLoginAttempts = () => {
    setLoginAttempts((prevLoginAttempts) => prevLoginAttempts + 1);
    if (loginAttempts === maxAttempts - 1) // The suspension logic is initiated on the 9th attempt (preparing for suspension), but the actual suspension effect (preventing further actions) is enforced after the 10th attempt
    { 
      setSuspensionStart(Date.now());
    }
  };

  const resetSuspension = () => {
    setLoginAttempts(0);
    setSuspensionStart(0);
  };

  return { isSuspended, incrementLoginAttempts, resetSuspension };
};
