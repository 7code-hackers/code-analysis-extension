import cssText from "data-text:~/contents/github-sidebar.css"
import type { PlasmoCSConfig } from "plasmo"
import { useEffect, useState } from "react"

import { useStorage } from "@plasmohq/storage/hook"

// Inject to the webpage itself
import "./github-sidebar-base.css"

import axios from "axios"
import CommentForm from "~components/comment-form"
import ExplanationForm from "~components/explanation-form"

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
  const [shown, setShown] = useStorage("shown", (v) =>
    v === undefined ? false : v
  )
  const [currentCode] = useStorage("currentCode")
  const [commentsList, setCommentsList] = useState([])
  
  const [explanation, setExpanation] = useState(" ")
  const [explanationId, setexplanationId] = useState("")
  const currentUrl = window.location.href
  //console.log("cur loca " + currentUrl)

  function keyDownHandler(e) {
    e.stopPropagation()
  }

  useEffect(() => {
    document.body.classList.toggle("plasmo-sidebar-show", shown)
    setCommentsList([])
  }, [shown])

  return (
    <div
      id="sidebar"
      className={(shown ? "open" : "closed") + " overflow-auto "}>
      <p>Code</p>
      <br></br>
      <div>{currentCode}</div>
      <br></br>
      <p>Generate Explanation</p>
      <br></br>
      <ExplanationForm shown={shown} setexplanationId={setexplanationId}></ExplanationForm>
      <br></br>
      <p>Leave a comment</p>

      <br></br>

      <CommentForm
        explanationId={explanationId}
        commentsList={commentsList}
        setCommentsList={setCommentsList}></CommentForm>
      <button
        type="button"
        onClick={() => setShown(false)}
        className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
        <span className="sr-only">Close menu</span>
        {/* <!-- Heroicon name: outline/x --> */}
        <svg
          className="h-6 w-6"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </div>
  )
}

export default Sidebar
