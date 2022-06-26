import React from 'react';

const AppContext = React.createContext({
  userInfo: {},
  selectedRoom: {},
});

export const AppContextProvider = props => {
  return (
    <AppContext.Provider
      value={{
        userInfo: {},
        selectedRoom: {},
      }}>
      {props.children}
    </AppContext.Provider>
  );
};

const useAppContext = () => React.useContext(AppContext);
export default useAppContext;
