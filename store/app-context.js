import React from 'react';

const AppContext = React.createContext({
  userInfo: {},
  selectedRoom: {},
  roomList: [],
  systemSetting: {},
});

export const AppContextProvider = props => {
  return (
    <AppContext.Provider
      value={{
        userInfo: {},
        selectedRoom: {},
        roomList: [],
        systemSetting: {
          fontSize: 15,
          fontWeight: 'normal',
        },
        // systemSetting: {},
      }}>
      {props.children}
    </AppContext.Provider>
  );
};

const useAppContext = () => React.useContext(AppContext);
export default useAppContext;
