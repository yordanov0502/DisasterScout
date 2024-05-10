import { createContext, useState } from 'react';

export const ResponsiveContext = createContext();

export const ResponsiveContextProvider = ({ children }) => {
    const [isTouchScreen, setIsTouchScreen] = useState(null);

  return (
    <ResponsiveContext.Provider value={{ isTouchScreen, setIsTouchScreen }}>
      {children}
    </ResponsiveContext.Provider>
  );
};
