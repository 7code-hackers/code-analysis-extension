import cssText from "data-text:~style.css"
import type { PlasmoCSConfig, PlasmoGetInlineAnchor  } from "plasmo"
import { useState } from "react"

//tailwind css
export const getStyle = () => {
  const style = document.createElement("style")
  style.textContent = cssText
  return style
}

export const config: PlasmoCSConfig = {
  matches: ["https://github.com/*"]
}

export const getInlineAnchor: PlasmoGetInlineAnchor  = () =>
  document.querySelector(
    `#repo-content-pjax-container > react-app > div > div > div.Box-sc-g0xbh4-0.fSWWem > div > div > main > div.Box-sc-g0xbh4-0.hlUAHL > div > div:nth-child(3) > div.Box-sc-g0xbh4-0.kLxXov`
  )

// Use this to optimize unmount lookups
//export const getShadowHostId = () => "plasmo-inline-example-unique-id"

const PlasmoInline = () => {
  const [showComment, setShowComment] = useState(false)
  function showCommentHandler() {
    setShowComment(!showComment)
  }
  return (
    <div>
      <button
        type="button"
        onClick={showCommentHandler}
        className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto">
        comment3
      </button>
      {showComment && (
        <div>
          <ul role="list" className="divide-y divide-gray-100">
            <li className="flex justify-between gap-x-6 py-5">c123456</li>
            <li className="flex justify-between gap-x-6 py-5">c223456789</li>
          </ul>
        </div>
      )}
    </div>
  )
}

export default PlasmoInline
