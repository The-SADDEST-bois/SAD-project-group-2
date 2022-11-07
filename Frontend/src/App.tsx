import { useEffect, useState } from 'react'
import { IUser } from '../types/types'
import { fetchUser } from '../services/UserServices'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const [user, setUser] = useState<IUser[]>()

  //get user from http://localhost:8080/user
  useEffect( () => {
      const getData = async () => {
      await fetchUser().then((user) => {
        console.log(user)
        setUser(user)
      })
    }
    getData();
  }, [])

  return (
    <div className="App">
        <h1>{user?.at(0)?.name + " " +user?.at(0)?.email}</h1>
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
    </div>
  )
}

export default App
