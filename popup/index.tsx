import axios from "axios"
import { useEffect, useState } from "react"

import { useStorage } from "@plasmohq/storage/hook"

import SignIn from "./sign-in"

function IndexPopup() {
  const defaulUser = {
    id: "1214",
    name: "user1214",
    password: "$2b$10$1TTJ/9hOd3W0t8d4vEqXvezWLKdlW31Pr.KwMIfCk8VFk0MgpZZ2.",
    email: "user1214@email.com",
    createdAt: "2023-12-15T01:04:50.000Z",
    updatedAt: "2023-12-15T01:04:50.000Z"
  }
  const [currentSession] = useStorage("currentSession")
  const [currentUser, setCurrentUser] = useStorage("currentUser", defaulUser)
  const [users, setUsers] = useState([])
  console.log(currentSession)
  console.log(JSON.stringify(currentSession) === "{}")

  useEffect(() => {
    // const savedSession = JSON.parse(localStorage.getItem("currentSession"))
    // console.log("current session " + savedSession)
    axios
      .get(`${process.env.PLASMO_PUBLIC_BACKEND_URL}users`, {
        withCredentials: true
      })
      .then((res) => {
        console.log(res)
        setUsers(res.data)
      })
      .catch(function (error) {
        console.log(error.config)
      })
  }, [])
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        padding: 16,
        width: 340
      }}>
      {!currentSession || JSON.stringify(currentSession) === "{}" ? (
        <div>
          <h2>please sign in</h2>
          <a href={process.env.PLASMO_PUBLIC_FRONTEND_URL} target="_blank">
            Sign In
          </a>
        </div>
      ) : (
        <div>
          <h2>Hello {currentSession.user.name}</h2>
          <a href={process.env.PLASMO_PUBLIC_FRONTEND_URL} target="_blank">
            Dashboard
          </a>
          <br></br>
          <div>current user: {currentUser.name}</div>
          <br></br>
          <div>{users.map((user)=><div onClick={()=>{setCurrentUser(user)}}>{user.name}</div>)}</div>
        </div>
      )}
    </div>
  )
}

export default IndexPopup
