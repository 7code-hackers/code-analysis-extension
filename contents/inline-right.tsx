import button4 from "data-base64:~assets/button4.png"
import cssText from "data-text:~style.css"
import type { PlasmoCSConfig, PlasmoGetInlineAnchorList } from "plasmo"

import { useStorage } from "@plasmohq/storage/hook"

//tailwind css
export const getStyle = () => {
  const style = document.createElement("style")
  style.textContent = cssText
  return style
}

export const config: PlasmoCSConfig = {
  matches: ["https://github.com/*"]
}

export const getInlineAnchorList: PlasmoGetInlineAnchorList = async () =>
  document.querySelectorAll(`[class="react-code-lines"]>div>div`)

// Use this to optimize unmount lookups
//export const getShadowHostId = () => "plasmo-inline-example-unique-id"

const InlineRight = (prop) => {
  const [showSidebar, setShowSidebar] = useStorage("shown", false)
  const [currentCode, setCurrentCode] = useStorage("currentCode", "")
  const [currentCodeLine, setCurrentCodeLine] = useStorage(
    "currentCodeLine",
    -1
  )
  const [lineStartList] = useStorage("lineStartList")
  //console.log(prop.anchor.element)

  //get the anchor element and the code in that line
  const anchorElement = prop.anchor.element
  let currentString = ""
  const spanElements = anchorElement.getElementsByTagName("span")

  for (let j = 0; j < spanElements.length; j++) {
    const spanElement = spanElements[j]
    const dataCodeTextValue = spanElement.getAttribute("data-code-text")
    currentString += dataCodeTextValue
  }

  //get the current line
  const divElement = anchorElement.firstChild
  //console.log(divElement)
  const currentLine = divElement.getAttribute("data-line-number")
  //console.log(currentLine)
  //console.log(currentString);

  function showCommentHandler(e) {
    //open the side bar and pass the current code and line number to the sidebar
    setShowSidebar(!showSidebar)
    setCurrentCode(currentString)
    setCurrentCodeLine(currentLine)
  }

  function mouseEnterHandler(e) {
    //the highlight color
    anchorElement.style.backgroundColor = "powderblue"
  }

  function mouseLeaveHandler(e) {
    anchorElement.style.backgroundColor = "initial"
  }

  return (
    <div style={{ pointerEvents: "auto" }} className="mr-4">
      <button
        className={
          "opacity-0 text-xxs hover:opacity-100 transition ease-in-out delay-50  "
        }
        type="button"
        onClick={showCommentHandler}
        onMouseEnter={mouseEnterHandler}
        onMouseLeave={mouseLeaveHandler}>
        <img src={button4} alt="button 4" width="20" />
      </button>
    </div>
  )
}

export default InlineRight
