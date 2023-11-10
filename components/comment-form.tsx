import axios from "axios"
import cssText from "data-text:~style.css"
import { useEffect, useState } from "react"

import { useStorage } from "@plasmohq/storage/hook"

import CommentComponet from "./comment"
import ExplanationComponet from "./explanation"

//tailwind css
export const getStyle = () => {
  const style = document.createElement("style")
  style.textContent = cssText
  return style
}

function CommentForm({
  explanationId,
  showComments,
  setShowComments,
  currentExplanation,
  removeHandler,
  editHandler,
  explanationIndex
}) {
  const [commentsList, setCommentsList] = useState([])
  const [commentValue, setCommentValue] = useState("")
  const [currentSession] = useStorage("currentSession")
  const [errorMsg, setErrorMsg] = useState("")

  useEffect(() => {
    //receive the comment list under current explanation
    axios
      .get(
        `${process.env.PLASMO_PUBLIC_BACKEND_URL}Comment/explanation/${currentExplanation.id}`,
        {
          withCredentials: true
        }
      )
      .then((res) => {
        setCommentsList(res.data)
        console.log("current list")
        console.log(commentsList)
      })
      .catch(function (error) {
        console.log(error.config)
      })
  }, [])

  function postCommentHandler(e) {
    e.preventDefault()
    if (JSON.stringify(currentSession) === "{}") {
      setErrorMsg("You must login to comment")
    } else {
      axios
        .post(
          `${process.env.PLASMO_PUBLIC_BACKEND_URL}comment`,
          {
            userId: "afd7d929-df59-444e-a7af-56c96b48df01",
            content: commentValue,
            explanationId: currentExplanation.id
          },
          { withCredentials: true }
        )
        .then((res) => {
          setCommentsList((pre) => {
            return [...pre, res.data]
          })
          console.log(res)
        })
        .catch(function (error) {
          console.log(error.config)
        })
    }

    setCommentValue("")
  }
  function keyDownHandler(e) {
    e.stopPropagation()
  }
  return (
    <div>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={() => {
          setShowComments(false)
        }}>
        {" "}
        &lt;
      </button>
      <div className="w-full bg-white rounded-lg border p-2 my-4">
        <ExplanationComponet
          showComments={showComments}
          setShowComments={setShowComments}
          onRemove={removeHandler}
          onEdit={(newCont, explanationID) =>
            editHandler(explanationIndex, newCont, explanationID)
          }
          explanation={currentExplanation}
          setExplanationIndex={() => {
            return explanationIndex
          }}></ExplanationComponet>
        <h3 className="font-bold">Discussion</h3>

        <div className="flex flex-col">
          {commentsList.map((comment, key) => (
            <CommentComponet comment={comment} />
          ))}
        </div>
        <form onSubmit={postCommentHandler}>
          <div className="w-full px-3 my-2">
            <textarea
              className="bg-gray-100 rounded border border-gray-400 leading-normal resize-none w-full h-20 py-2 px-3 font-medium placeholder-gray-700 focus:outline-none focus:bg-white"
              name="body"
              placeholder="Type Your Comment"
              onKeyDown={keyDownHandler}
              value={commentValue}
              onChange={(e) => {
                setCommentValue(e.target.value)
              }}
              required></textarea>
          </div>

          <div className="w-full flex justify-end px-3">
            <input
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              value="Post Comment"
            />
          </div>
        </form>
      </div>
    </div>
  )
}

export default CommentForm
