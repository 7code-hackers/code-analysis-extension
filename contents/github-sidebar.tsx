import cssText from "data-text:~/contents/github-sidebar.css";
import type { PlasmoCSConfig } from "plasmo";
import { useEffect } from "react";

import { useStorage } from "@plasmohq/storage/hook";

// Inject to the webpage itself
import "./github-sidebar-base.css";

export const config: PlasmoCSConfig = {
  matches: ["https://github.com/*"]
}

// Inject into the ShadowDOM
export const getStyle = () => {
  const style = document.createElement("style")
  style.textContent = cssText
  return style
}

export const getShadowHostId = () => "plasmo-sidebar"

const Sidebar = () => {
  const [shown, setShown] = useStorage("shown", (v) => v === undefined ? false : v);
  const [currentCode] = useStorage("currentCode");
  const testAPI = async () => {
    debugger
    const response = await fetch(`http://localhost:3000/api/users`, {
      method: 'GET',
      credentials: 'include'
    });
    const data = await response.json();
  }
  function keyDownHandler(e) {
    e.stopPropagation()
  }
  useEffect(() => {
    document.body.classList.toggle("plasmo-sidebar-show", shown)
  }, [shown])

  return (
    <div id="sidebar" className={shown ? "open" : "closed"}>
      <p>Code</p>
      <div>{currentCode}</div>
      <p>Leave a comment</p>
      <button onClick={testAPI}> testtt </button>

      <br></br>
      <input data-componet="input" role="combobox" type="textarea" onKeyDown={keyDownHandler} ></input>
      <br></br>
      <button onClick={() => setShown(false)}>close</button>
    </div>
  )
}

export default Sidebar
