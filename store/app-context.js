import React from 'react';

const AppContext = React.createContext({
  userInfo: {},
  selectedRoom: {},
  roomList: [],
});

export const AppContextProvider = props => {
  return (
    <AppContext.Provider
      value={{
        userInfo: {},
        selectedRoom: {},
        roomList: [],
      }}>
      {props.children}
    </AppContext.Provider>
  );
};

const useAppContext = () => React.useContext(AppContext);
export default useAppContext;
