import { useEffect, useState } from 'react'
import type { User } from '../types/types'
import { fetchUser } from '../services/UserServices'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const [user, setUser] = useState<User>()

  //get user from http://localhost:8080/user
  useEffect( () => {
      const getData = async () => {
      await fetchUser().then((user) => {
        setUser(user)
      })
    }
    getData();
  }, [])

  return (
    <div className="App">
        <h1>{user?.name + " " +user?.email}</h1>
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
    </div>
  )
}

export default App
