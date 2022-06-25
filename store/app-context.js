import React from 'react';

const AppContext = React.createContext({
  userInfo: {},
});

export const AppContextProvider = props => {
  return (
    <AppContext.Provider
      value={{
        userInfo: {},
      }}>
      {props.children}
    </AppContext.Provider>
  );
};

export default AppContext;
