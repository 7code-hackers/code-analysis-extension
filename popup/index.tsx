import { useEffect } from "react"

import { useStorage } from "@plasmohq/storage/hook"

import SignIn from "./sign-in"

function IndexPopup() {
  const [currentSession] = useStorage("currentSession")
  console.log(currentSession)
  const testAPI = async () => {
    debugger
    const response = await fetch(`http://localhost:3000/api/users`, {
      method: 'GET',
      credentials: 'include'
    });
    const data = await response.json();
  }

  // you can directly call dashboard next-auth session api to extract login status info
  const testSession = async () => {
    const response = await fetch(`http://localhost:8080/api/auth/session`, {
      method: 'GET',
      credentials: 'include'
    });
    debugger
    const data = await response.json();
    console.log(data)
  }


  useEffect(() => {
    // const savedSession = JSON.parse(localStorage.getItem("currentSession"))
    // console.log("current session " + savedSession)
  }, [])
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        padding: 16,
        width: 340,
      }}>
      <h2
        style={{
          width: 340
        }}>
        Welcome to your
        <a href="https://www.plasmo.com" target="_blank">
          {" "}
          Plasmo
        </a>{" "}
        Extension!
      </h2>
      <div onClick={testAPI}> test </div>
      <div onClick={testSession}> session </div>
      {currentSession ? (
        <div>Hello {currentSession.user.name}</div>
      ) : (
        <div>
          <h2>please sign in</h2>
          <a href="http://localhost:8080/" target="_blank">
            Sign In
          </a>
        </div>
      )}
    </div>
  )
}

export default IndexPopup
