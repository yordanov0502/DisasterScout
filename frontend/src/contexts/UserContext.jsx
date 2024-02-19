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

  return (
    <UserContext.Provider value={{ authenticatedUser, updateUserContext, clearUserContext }}>
      {children}
    </UserContext.Provider>
  );
};
