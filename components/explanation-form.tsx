import axios from "axios"
import { useEffect, useState } from "react"

import { useStorage } from "@plasmohq/storage/hook"

import ExplanationComponet from "./explanation"

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
  const [currentCode] = useStorage("currentCode")
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
    <div className="w-full bg-white rounded-lg p-4 my-1 ">
      <h2 className="font-bold text-black">Code</h2>
      <br></br>
      <div className="bg-gray-100 p-4 overflow-x-auto">
        <p className="text-gray-700 font-mono">{currentCode}</p>
      </div>

      <br></br>
      <h3 className="font-bold text-black">Explanation</h3>
      <div className="flex flex-col ">
        {currentExplanationList.map((explanation, index) => (
          <ExplanationComponet
            showComments={showComments}
            setShowComments={setShowComments}
            onRemove={(explanationID)=>removeHandler(index,explanationID)}
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
            className="block p-2.5 w-full h-20 text-sm text-gray-900 bg-gray-50 rounded-lg 
            border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 
            dark:border-gray-600 dark:placeholder-gray-400 dark:text-white 
            dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
            className="bg-[#0258d7] hover:bg-blue-900 text-white font-bold py-2 px-4 rounded"
            value="Post Explanation"
          />
        </div>
      </form>
    </div>
  )
}

export default ExplanationForm
