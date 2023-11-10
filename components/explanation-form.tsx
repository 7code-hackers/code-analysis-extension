import axios from "axios"
import cssText from "data-text:~style.css"
import { useEffect, useState } from "react"

import { useStorage } from "@plasmohq/storage/hook"

import ExplanationComponet from "./explanation"

//tailwind css
export const getStyle = () => {
  const style = document.createElement("style")
  style.textContent = cssText
  return style
}

function ExplanationForm({
  setexplanationId,
  shown,
  setShowComments,
  showComments,
  currentExplanationList,
  setCurrentExplanationList,
  setExplanationIndex,
  editHandler,
  removeHandler
}) {
  const [explanationValue, setExpanationValue] = useState("")
  const currentUrl = window.location.href
  const [currentCodeLine] = useStorage("currentCodeLine")

  function keyDownHandler(e) {
    e.stopPropagation()
  }

  function explanationHandler(e) {
    e.preventDefault()

    axios
      .post(
        `${process.env.PLASMO_PUBLIC_BACKEND_URL}explanation`,
        {
          userId: "afd7d929-df59-444e-a7af-56c96b48df01",
          content: explanationValue,
          visibility: "public",
          fileUrl: currentUrl,
          lineStart: currentCodeLine,
          lineEnd: currentCodeLine
        },
        { withCredentials: true }
      )
      .then((res) => {
        console.log(res)
        setexplanationId(res.data.id)
        setCurrentExplanationList((pre) => {
          return [...pre, res.data]
        })
      })
      .catch(function (error) {
        console.log(error.config)
      })
    setExpanationValue("")
  }

  return (
    <div className="w-full bg-white rounded-lg border p-2 my-4 ">
      <h3 className="font-bold">Explanation</h3>
      <div className="flex flex-col ">
        {currentExplanationList.map((explanation, index) => (
          <ExplanationComponet
            showComments={showComments}
            setShowComments={setShowComments}
            onRemove={removeHandler}
            onEdit={(newCont, explanationID) =>
              editHandler(index, newCont, explanationID)
            }
            explanation={explanation}
            setExplanationIndex={() =>
              setExplanationIndex(index)
            }></ExplanationComponet>
        ))}
      </div>

      <form onSubmit={explanationHandler}>
        <div className="w-full px-3 my-2">
          <textarea
            className="bg-gray-100 rounded border border-gray-400 leading-normal resize-none w-full h-20 py-2 px-3 font-medium placeholder-gray-700 focus:outline-none focus:bg-white"
            name="body"
            placeholder="Type Your Explanation"
            onKeyDown={keyDownHandler}
            value={explanationValue}
            onChange={(e) => {
              setExpanationValue(e.target.value)
            }}
            required></textarea>
        </div>

        <div className="w-full flex justify-end px-3">
          <input
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            value="Post Explanation"
          />
        </div>
      </form>
    </div>
  )
}

export default ExplanationForm
