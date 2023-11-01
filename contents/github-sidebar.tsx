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
  const [commentsList,setCommentsList] = useState([]);
  const [commentValue,setCommentValue] = useState("");
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
    setCommentsList((pre)=>{
      return[...pre,{
        userName:"user1",
        content:commentValue
      }]
    })
    setCommentValue("")
  }

  useEffect(() => {
    document.body.classList.toggle("plasmo-sidebar-show", shown)
  }, [shown])

  return (
    <div id="sidebar" className={shown ? "open" : "closed"}>
      <p>Code</p>
      <div>{currentCode}</div>
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
            {commentsList.map((comment)=>(
              <CommentComponet comment={comment}/>
            ))}
            
          </div>

          <div className="w-full px-3 my-2">
            <textarea
              className="bg-gray-100 rounded border border-gray-400 leading-normal resize-none w-full h-20 py-2 px-3 font-medium placeholder-gray-700 focus:outline-none focus:bg-white"
              name="body"
              placeholder="Type Your Comment"
              onKeyDown={keyDownHandler}
              value={commentValue}
              onChange={(e)=>{setCommentValue(e.target.value)}}
              required></textarea>
          </div>

          <div className="w-full flex justify-end px-3">
            <input
              type="submit"
              className="px-2.5 py-1.5 rounded-md text-white text-sm bg-indigo-500"
              value="Post Comment"
            />
          </div>
        </form>
      </div>
    </div>
  )
}

export default Sidebar