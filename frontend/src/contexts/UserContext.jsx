import { createContext, useState } from 'react';

export const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
  const [authenticatedUser, setAuthenticatedUser] = useState({
    firstName: null,
    lastName: null,
    email: null,
    username: null,
    role: null,
    availableZones: null,
  });

  const updateUserContext = (newData) => {
    setAuthenticatedUser((previousData) => ({...previousData,...newData}));
  };

  const clearUserContext = () => {
    setAuthenticatedUser({
      firstName: null,
      lastName: null,
      email: null,
      username: null,
      role: null,
      availableZones: null,
    });
  };

  //? This function returns true if any of the properties of authenticatedUser is null, 
  //? which means the context is considered "empty" if it's not fully populated. 
  //? It will return false only when all properties have been set to non-null values, indicating that 
  //? the context is fully populated.
  const isUserContextEmpty = () => {
    return Object.values(authenticatedUser).some(value => value === null);
  };
  

  return (
    <UserContext.Provider value={{ authenticatedUser, updateUserContext, clearUserContext, isUserContextEmpty }}>
      {children}
    </UserContext.Provider>
  );
};
