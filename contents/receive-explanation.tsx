import axios from "axios";
import type { PlasmoCSConfig } from "plasmo";
import { useEffect } from "react";



import { useStorage } from "@plasmohq/storage/hook";





export const config: PlasmoCSConfig = {
  matches: ["https://github.com/*"]
}

function receiveExplanation() {
  // const [explanationList, setExpanationList] = useStorage("explanationList", [
  //   {}
  // ])
  const [lineStartList, setLineStartList] = useStorage("lineStartList",[])
  const currentUrl = encodeURIComponent(window.location.href)
  const param = encodeURIComponent(currentUrl)

  useEffect(() => {
    axios
      .get(
        `${process.env.PLASMO_PUBLIC_BACKEND_URL}explanations/file/${currentUrl}`,
        {
          withCredentials: true
        }
      )
      .then((res) => {
        console.log("fetched api res")
        const resList = []
        res.data.forEach((explanation)=>{
          resList.push(explanation.lineStart)
        })
        setLineStartList(resList)
        console.log(res)
        console.log(resList)
      })
      .catch(function (error) {
        console.log(error.config)
      })
  }, [])

  return <div></div>
}

export default receiveExplanation