import cssText from "data-text:~/contents/github-sidebar.css"
import type { PlasmoCSConfig } from "plasmo"
import { useEffect, useState } from "react"

import { useStorage } from "@plasmohq/storage/hook"

// Inject to the webpage itself
import "./github-sidebar-base.css"

import axios from "axios"

import CommentComponet from "~components/comment"

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
  const [commentValue, setCommentValue] = useState("")
  const [errorMsg, setErrorMsg] = useState("")
  const [currentSession] = useStorage("currentSession")
  const [explanation, setExpanation] = useState(" ")
  const [explanationId, setexplanationId] = useState("")
  const currentUrl = window.location.href
  //console.log("cur loca " + currentUrl)

  // const testAPI = async () => {

  //   const response = await fetch(`http://localhost:5000/api/users`, {
  //     method: 'GET',
  //     credentials: 'include'
  //   });
  //   const data = await response.json();
  // }

  function testAPI() {
    axios
      .get(`http://localhost:5000/api/users`, { withCredentials: true })
      .then((res) => {
        console.log(res)
      })
      .catch(function (error) {
        console.log(error.config)
      })
  }
  function keyDownHandler(e) {
    e.stopPropagation()
  }

  function postCommentHandler(e) {
    e.preventDefault()
    if (JSON.stringify(currentSession) === "{}") {
      setErrorMsg("You must login to comment")
    } else {
      setCommentsList((pre) => {
        return [
          ...pre,
          {
            userName: currentSession.user.name,
            content: commentValue,
            avatar: currentSession.user.image
          }
        ]
      })
      axios
        .post(
          `http://localhost:3001/api/comment`,
          {
            userId: "06b4c9a4-aea9-4e87-9de4-8972ea284b34",
            content: commentValue,
            explanationId: explanationId
          },
          { withCredentials: true }
        )
        .then((res) => {
          console.log(res)
        })
        .catch(function (error) {
          console.log(error.config)
        })
    }

    setCommentValue("")
  }

  function explanationHandler() {
    setExpanation("some explanation")
    axios
      .post(
        `http://localhost:3001/api/explanation`,
        {
          userId: "06b4c9a4-aea9-4e87-9de4-8972ea284b34",
          content: explanation,
          visibility: "string",
          location: currentUrl
        },
        { withCredentials: true }
      )
      .then((res) => {
        console.log(res)
        setexplanationId(res.data.id)
      })
      .catch(function (error) {
        console.log(error.config)
      })
  }

  useEffect(() => {
    document.body.classList.toggle("plasmo-sidebar-show", shown)
  }, [shown])

  return (
    <div id="sidebar" className={shown ? "open" : "closed"}>
      <p>Code</p>
      <div>{currentCode}</div>
      <button
        onClick={explanationHandler}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Explan
      </button>
      {explanation}
      <p>Leave a comment</p>
      <button onClick={testAPI}> testtt </button>

      <br></br>
      <input
        data-componet="input"
        role="combobox"
        type="textarea"
        onKeyDown={keyDownHandler}></input>
      <br></br>
      <button onClick={() => setShown(false)}>close</button>
      <div className="w-full bg-white rounded-lg border p-2 my-4 mx-6">
        <h3 className="font-bold">Discussion</h3>

        <form onSubmit={postCommentHandler}>
          <div className="flex flex-col">
            {commentsList.map((comment) => (
              <CommentComponet comment={comment} />
            ))}
          </div>

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

export default Sidebar
