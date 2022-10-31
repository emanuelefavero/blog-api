import React, { useState, createContext } from 'react'
import axios from 'axios'

// INTERFACES
interface UserInterface {
  _id: string
  username: string
  password: string
  role: string
}

// CONTEXT
const UserContext = createContext({
  user: {} as UserInterface | null,
  registerUsername: '',
  setRegisterUsername: (username: string) => {},
  registerPassword: '',
  setRegisterPassword: (password: string) => {},

  loginUsername: '',
  setLoginUsername: (username: string) => {},
  loginPassword: '',
  setLoginPassword: (password: string) => {},

  register: () => {},
  login: () => {},
  logout: () => {},
  getUser: () => {},
})

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserInterface | null>(null)

  const [registerUsername, setRegisterUsername] = useState('')
  const [registerPassword, setRegisterPassword] = useState('')

  const [loginUsername, setLoginUsername] = useState('')
  const [loginPassword, setLoginPassword] = useState('')

  const register = async () => {
    try {
      axios({
        method: 'POST',
        data: {
          username: registerUsername,
          password: registerPassword,
        },
        withCredentials: true,
        url: 'http://localhost:4000/api/register',
      }).then((res) => {
        console.log(res.data)
      })
    } catch (error) {
      console.error(error)
    }
  }

  const login = async () => {
    await axios({
      method: 'POST',
      data: {
        username: loginUsername,
        password: loginPassword,
      },
      withCredentials: true,
      url: 'http://localhost:4000/api/login',
    }).then((res) => {
      console.log(res.data)
    })
  }

  const logout = async () => {
    axios({
      method: 'GET',
      withCredentials: true,
      url: 'http://localhost:4000/api/logout',
    }).then((res) => {
      setUser(null)
      console.log(res.data)
    })
  }

  // GET user from localStorage
  const getUser = async () => {
    await axios({
      method: 'GET',
      withCredentials: true,
      url: 'http://localhost:4000/api/user',
    }).then((res) => {
      if (res.data) {
        setUser(res.data)
      } else {
        setUser(null)
      }
    })
  }

  return (
    <UserContext.Provider
      value={{
        user,
        registerUsername,
        setRegisterUsername,
        registerPassword,
        setRegisterPassword,

        loginUsername,
        setLoginUsername,
        loginPassword,
        setLoginPassword,

        register,
        login,
        logout,
        getUser,
      }}
    >
      {children}
    </UserContext.Provider>
  )
}

export default UserContext
