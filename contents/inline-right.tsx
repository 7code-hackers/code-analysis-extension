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

  //console.log(currentString);
  function showCommentHandler(e) {
    //open the side bar and pass the current code to the sidebar
    setShowSidebar(!showSidebar)
    setCurrentCode(currentString)
  }

  function mouseEnterHandler(e) {
    //the highlight color
    anchorElement.style.backgroundColor = "powderblue"
  }

  function mouseLeaveHandler(e) {
    anchorElement.style.backgroundColor = "white"
  }

  return (
    <div style={{ pointerEvents: "auto" }} className="mr-4">
      <button
        type="button"
        onClick={showCommentHandler}
        onMouseEnter={mouseEnterHandler}
        onMouseLeave={mouseLeaveHandler}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className="w-5 h-5">
          <path
            fillRule="evenodd"
            d="M3 4.25A2.25 2.25 0 015.25 2h5.5A2.25 2.25 0 0113 4.25v2a.75.75 0 01-1.5 0v-2a.75.75 0 00-.75-.75h-5.5a.75.75 0 00-.75.75v11.5c0 .414.336.75.75.75h5.5a.75.75 0 00.75-.75v-2a.75.75 0 011.5 0v2A2.25 2.25 0 0110.75 18h-5.5A2.25 2.25 0 013 15.75V4.25z"
            clipRule="evenodd"
          />
          <path
            fillRule="evenodd"
            d="M6 10a.75.75 0 01.75-.75h9.546l-1.048-.943a.75.75 0 111.004-1.114l2.5 2.25a.75.75 0 010 1.114l-2.5 2.25a.75.75 0 11-1.004-1.114l1.048-.943H6.75A.75.75 0 016 10z"
            clipRule="evenodd"
          />
        </svg>
      </button>
    </div>
  )
}

export default InlineRight
