import { useEffect } from "react"

import { useStorage } from "@plasmohq/storage/hook"

import SignIn from "./sign-in"

function IndexPopup() {
  const [currentSession] = useStorage("currentSession")
  console.log(currentSession)
  console.log(JSON.stringify(currentSession) === "{}")

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
        width: 340
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
      {!currentSession || JSON.stringify(currentSession) === "{}" ? (
        <div>
          <h2>please sign in</h2>
          <a href={process.env.PLASMO_PUBLIC_FRONTEND_URL} target="_blank">
            Sign In
          </a>
        </div>
      ) : (
        <div>
          <div>Hello {currentSession.user.name}</div>
          <a href={process.env.PLASMO_PUBLIC_FRONTEND_URL} target="_blank">
            Dashboard
          </a>
        </div>
      )}
    </div>
  )
}

export default IndexPopup
