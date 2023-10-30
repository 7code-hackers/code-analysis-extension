import axios from "axios";
import type { PlasmoCSConfig } from "plasmo";
import { useEffect } from "react";
import { useStorage } from "@plasmohq/storage/hook";

export const config: PlasmoCSConfig = {
  matches: ["http://localhost:3000/*"]
}

function receiveSession() {
  const [currentSession, setCurrentSession] = useStorage("currentSession", null)
  useEffect(() => {
    
    console.log("current cookies " + document.cookie)
    //get the session from next-auth api
    axios.get(`http://localhost:3000/api/auth/session`).then((res) => {
      console.log("fetched api res")
      console.log(res.data)
      setCurrentSession(res.data)
    })
  }, [])
  console.log(document.cookie)
  console.log(currentSession)

  return <div></div>
}

export default receiveSession