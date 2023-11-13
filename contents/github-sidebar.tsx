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
  // const [commentsList, setCommentsList] = useState([])
  const [explanationId, setexplanationId] = useState("")
  const [showComments, setShowComments] = useState(false)
  //console.log("cur loca " + currentUrl)
  const [currentExplanationList, setCurrentExplanationList] = useState([])
  const currentUrl = window.location.href
  const [currentCodeLine] = useStorage("currentCodeLine")
  const [explanationIndex, setExplanationIndex] = useState(0)
  function keyDownHandler(e) {
    e.stopPropagation()
  }

  useEffect(() => {
    document.body.classList.toggle("plasmo-sidebar-show", shown)
    axios
      .get(
        `${
          process.env.PLASMO_PUBLIC_BACKEND_URL
        }explanations/file/${encodeURIComponent(currentUrl)}`,
        {
          withCredentials: true
        }
      )
      .then((res) => {
        const resList = res.data.filter(
          (explanation) => explanation.lineStart == currentCodeLine
        )
        setCurrentExplanationList(resList)
        console.log("current list")
        console.log(currentExplanationList)
      })
      .catch(function (error) {
        console.log(error.config)
      })
    setShowComments(false)
  }, [shown])

  function editHandler(explanationIndex, newCont, explanationId) {
    axios
      .put(
        `${process.env.PLASMO_PUBLIC_BACKEND_URL}explanation/${explanationId}`,
        {
          content: newCont,
          visibility: "public"
        },
        { withCredentials: true }
      )
      .then((res) => {
        console.log(res)
        setCurrentExplanationList((pre) => {
          const newExplanations = [...pre]
          console.log(newExplanations[explanationIndex])
          newExplanations[explanationIndex].content = newCont
          return newExplanations
        })
      })
      .catch(function (error) {
        console.log(error.config)
      })
  }
  function removeHandler(explanationId) {
    axios
      .delete(
        `${process.env.PLASMO_PUBLIC_BACKEND_URL}explanation/${explanationId}`,
        { withCredentials: true }
      )
      .then((res) => {
        console.log(res)
        setCurrentExplanationList((pre) =>
          pre.filter((exp) => exp.id !== explanationId)
        )
      })
      .catch(function (error) {
        console.log(error.config)
      })
  }
  return (
    <div
      id="sidebar"
      className={
        (shown ? "open" : "closed") +
        " overflow-y-auto p-4 bg-slate-50 border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
      }>
      <div className="">
        {showComments ? (
          <CommentForm
            showComments={showComments}
            setShowComments={setShowComments}
            currentExplanation={currentExplanationList[explanationIndex]}
            explanationId={explanationId}
            removeHandler={removeHandler}
            editHandler={editHandler}
            explanationIndex={explanationIndex}></CommentForm>
        ) : (
          <ExplanationForm
            shown={shown}
            showComments={showComments}
            setShowComments={setShowComments}
            setexplanationId={setexplanationId}
            currentExplanationList={currentExplanationList}
            setCurrentExplanationList={setCurrentExplanationList}
            setExplanationIndex={setExplanationIndex}
            editHandler={editHandler}
            removeHandler={removeHandler}></ExplanationForm>
        )}

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
    </div>
  )
}

export default Sidebar
