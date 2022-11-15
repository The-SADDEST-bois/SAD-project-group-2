import React,{ createContext, useContext,useState } from 'react'


interface IUsersContext {
  setUsersData: (data: any) => void;
  }
  
  const UsersContext = createContext({} as IUsersContext)
  
  const UsersProvider = ({ children }: any) => {

  const [usersData,setUsersData] = useState()
  
    return (
      <UsersContext.Provider value={{ setUsersData }}>
        {children}
      </UsersContext.Provider>
    )
  }
  
  const useUsers = () => {
    return useContext(UsersContext)
  }
  
  export { UsersProvider, useUsers }