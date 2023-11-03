import cssText from "data-text:~/contents/github-sidebar.css";
import type { PlasmoCSConfig } from "plasmo";
import { useEffect, useState } from "react";



import { useStorage } from "@plasmohq/storage/hook";



// Inject to the webpage itself
import "./github-sidebar-base.css";



import axios from "axios";



import CommentComponet from "~components/comment";





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
      .get(`${process.env.PLASMO_PUBLIC_BACKEND_URL}users`, {
        withCredentials: true
      })
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
          `${process.env.PLASMO_PUBLIC_BACKEND_URL}comment`,
          {
            userId: "553f50a7-4abc-46d6-a0ff-3e7c065da5dc",
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
        `${process.env.PLASMO_PUBLIC_BACKEND_URL}explanation`,
        {
          userId: "553f50a7-4abc-46d6-a0ff-3e7c065da5dc",
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
      <button
        onClick={explanationHandler}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Explan
      </button>
      {explanation}
      <br></br>
      <p>Leave a comment</p>

      <br></br>

      <br></br>
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