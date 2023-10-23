import type { PlasmoCSConfig } from "plasmo"
import { useEffect } from "react"

import { useStorage } from "@plasmohq/storage/hook"

export const config: PlasmoCSConfig = {
  matches: ["http://localhost:3000/*"]
}

function receiveSession() {
  const [currentSession, setCurrentSession] = useStorage("currentSession", null)
  useEffect(() => {
    const savedSession = JSON.parse(localStorage.getItem("currentSession"))
    console.log("current session eff" + JSON.stringify(savedSession))
    setCurrentSession(savedSession)
  }, [currentSession])
  console.log(currentSession)

  return <div></div>
}

export default receiveSession
