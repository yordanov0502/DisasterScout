import { useState } from 'react';

//? This custom hook is created with the intention to be used inside different pages/components
//? to prevent the user from sending same request multiple times while waiting for a response.

export const useIsRequestSent = () => {
  const [isRequestSent, setIsRequestSent] = useState(false);

 return { isRequestSent, setIsRequestSent };
};
