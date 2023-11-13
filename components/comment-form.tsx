import axios from "axios"
import { useEffect, useState } from "react"

import { useStorage } from "@plasmohq/storage/hook"

import CommentComponet from "./comment"
import ExplanationComponet from "./explanation"

function CommentForm({
  explanationId,
  showComments,
  setShowComments,
  currentExplanation,
  removeHandler,
  editHandler,
  explanationIndex
}) {
  const [commentList, setCommentList] = useState([])
  const [commentValue, setCommentValue] = useState("")
  const [currentSession] = useStorage("currentSession")
  const [errorMsg, setErrorMsg] = useState("")
  const [currentCode] = useStorage("currentCode")
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
        setCommentList(res.data)
        console.log("current list")
        console.log(commentList)
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
          setCommentList((pre) => {
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
  function commentEditHandler(commentIndex, newCont, commentId) {
    axios
      .put(
        `${process.env.PLASMO_PUBLIC_BACKEND_URL}Comment/${commentId}`,
        {
          content: newCont
        },
        { withCredentials: true }
      )
      .then((res) => {
        console.log(res)
        setCommentList((pre) => {
          const newComments = [...pre]
          console.log(newComments[commentIndex])
          newComments[commentIndex].content = newCont
          return newComments
        })
      })
      .catch(function (error) {
        console.log(error.config)
      })
  }
  function commentRemoveHandler(commentId) {
    axios
      .delete(`${process.env.PLASMO_PUBLIC_BACKEND_URL}Comment/${commentId}`, {
        withCredentials: true
      })
      .then((res) => {
        console.log(res)
        setCommentList((pre) =>
          pre.filter((comment) => comment.id !== commentId)
        )
      })
      .catch(function (error) {
        console.log(error.config)
      })
  }
  return (
    <div>
      <div className="w-full bg-white rounded-lg p-4 my-1 ">
        <h2 className="font-bold text-black">Code</h2>
        <br></br>
        <div className="bg-gray-100 p-4 overflow-x-auto">
          <p className="text-gray-700 font-mono">{currentCode}</p>
        </div>

        <br></br>
        <button
          className="flex text-xs background-transparent text-[#0258d7] hover:text-blue-900  font-bold mt-2"
          onClick={() => {
            setShowComments(false)
          }}>
          <svg
            className="h-4 w-4 text-[#0258d7]"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            stroke-width="2"
            stroke="currentColor"
            fill="none"
            stroke-linecap="round"
            stroke-linejoin="round">
            <path stroke="none" d="M0 0h24v24H0z" />
            <line x1="5" y1="12" x2="19" y2="12" />
            <line x1="5" y1="12" x2="9" y2="16" />
            <line x1="5" y1="12" x2="9" y2="8" />
          </svg>{" "}
          Back
        </button>

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
      </div>
      <h3 className="font-bold mt-2">Discussion</h3>
      <div >
        <div className="flex flex-col">
          {commentList.map((comment, key) => (
            <CommentComponet
              onRemove={commentRemoveHandler}
              onEdit={(newCont, commentId) =>
                commentEditHandler(key, newCont, commentId)
              }
              comment={comment}
            />
          ))}
        </div>
        <form onSubmit={postCommentHandler}>
          <div className="w-full px-3 my-2">
            <textarea
              className="block p-2.5 w-full h-20 text-sm text-gray-900 bg-gray-50 rounded-lg 
            border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 
            dark:border-gray-600 dark:placeholder-gray-400 dark:text-white 
            dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
              className="bg-[#0258d7] hover:bg-blue-900 text-white font-bold py-2 px-4 rounded"
              value="Post Comment"
            />
          </div>
        </form>
      </div>
    </div>
  )
}

export default CommentForm
