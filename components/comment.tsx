import axios from "axios"
import dayjs from "dayjs"
import { useEffect, useState } from "react"

import { useStorage } from "@plasmohq/storage/hook"

function CommentComponet({ comment, onRemove, onEdit }) {
  const defaulUser = {
    id: "dfu",
    name: "defaultUser",
    password: "$2b$10$1TTJ/9hOd3W0t8d4vEqXvezWLKdlW31Pr.KwMIfCk8VFk0MgpZZ2.",
    email: "dfu@email.com",
    createdAt: "2023-12-15T01:04:50.000Z",
    updatedAt: "2023-12-15T01:04:50.000Z"
  }

  const [user, setUser] = useState(defaulUser)
  const [currentUser] = useStorage("currentUser", (v) =>
    v === undefined ? defaulUser : v
  )
  const [editMode, setEditMode] = useState(false)
  const [editValue, setEditvalue] = useState("")

  useEffect(() => {
    // const savedSession = JSON.parse(localStorage.getItem("currentSession"))
    // console.log("current session " + savedSession)
    axios
      .get(
        `${process.env.PLASMO_PUBLIC_BACKEND_URL}user/${comment.userId}`,
        {
          withCredentials: true
        }
      )
      .then((res) => {
        //get user infro of the owner of the explanation
        setUser(res.data)
        console.log(res)
        console.log(res.data.name)
      })
      .catch(function (error) {
        console.log(error.config)
      })
  }, [])

  return (
    <div>
      <div className="flex justify-between border rounded-md p-3 my-3">
        <div className="p-3 w-full">
          {editMode ? (
            <div>
              <form
                id="updateExplanationForm"
                onSubmit={(ev) => {
                  ev.preventDefault()
                  setEditMode(false)
                  onEdit(editValue, comment.id)
                }}>
                <div className="flex gap-3 items-center">
                  <img
                    src="https://avatars.githubusercontent.com/u/14959342?v=4"
                    className="object-cover w-8 h-8 rounded-full 
                            border-2 border-emerald-400  shadow-emerald-400
                            "
                  />
                  <div>
                    <h3 className="font-bold">{user.name}</h3>
                    <p className="text-xs text-slate-500">
                      {dayjs(comment.createdAt).format("YYYY/MM/DD HH:mm")}
                    </p>
                  </div>

                  <button
                    type="submit"
                    className="text-xs bg-gray-100 hover:bg-gray-200font-bold p-1 ml-auto rounded">
                    <svg
                      className="h-4 w-4 text-blue-500"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      stroke-width="2"
                      stroke="currentColor"
                      fill="none"
                      stroke-linecap="round"
                      stroke-linejoin="round">
                      <path stroke="none" d="M0 0h24v24H0z" />
                      <path d="M5 12l5 5l10 -10" />
                    </svg>
                  </button>
                  <button
                    onClick={() => setEditMode(false)}
                    className="text-xs bg-gray-100 hover:bg-gray-200font-bold p-1  rounded">
                    <svg
                      className="h-4 w-4 text-blue-500"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      stroke-width="2"
                      stroke="currentColor"
                      fill="none"
                      stroke-linecap="round"
                      stroke-linejoin="round">
                      <path stroke="none" d="M0 0h24v24H0z" />
                      <line x1="18" y1="6" x2="6" y2="18" />
                      <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                  </button>
                  <button
                    onClick={() => onRemove(comment.id)}
                    className="text-xs bg-gray-100 hover:bg-gray-200 font-bold p-1  rounded m-1">
                    <svg
                      className="h-4 w-4 text-blue-500"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      stroke-width="2"
                      stroke="currentColor"
                      fill="none"
                      stroke-linecap="round"
                      stroke-linejoin="round">
                      <path stroke="none" d="M0 0h24v24H0z" />
                      <line x1="4" y1="7" x2="20" y2="7" />
                      <line x1="10" y1="11" x2="10" y2="17" />
                      <line x1="14" y1="11" x2="14" y2="17" />
                      <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
                      <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
                    </svg>
                  </button>
                </div>

                <textarea
                  className="block mt-2 p-2.5 w-full h-20 text-sm text-gray-900 bg-gray-50 rounded-lg 
                            border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 
                            dark:border-gray-600 dark:placeholder-gray-400 dark:text-white 
                            dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  value={editValue}
                  onKeyDown={(e) => {
                    e.stopPropagation()
                  }}
                  onChange={(e) => {
                    e.stopPropagation()
                    setEditvalue(e.target.value)
                  }}></textarea>
              </form>
            </div>
          ) : (
            <div>
              <div className="flex gap-3 items-center">
                <img
                  src="https://avatars.githubusercontent.com/u/14959342?v=4"
                  className="object-cover w-8 h-8 rounded-full 
                            border-2 border-emerald-400  shadow-emerald-400
                            "
                />

                <div>
                  <h3 className="font-bold">{user.name}</h3>
                  <p className="text-xs text-slate-500">
                    {dayjs(comment.createdAt).format("YYYY/MM/DD HH:mm")}
                  </p>
                </div>
                {currentUser.id == user.id && (<button
                  onClick={() => {
                    setEditMode(true)
                    setEditvalue(comment.content)
                  }}
                  className="text-xs bg-gray-100 hover:bg-gray-200  font-bold p-1 ml-auto rounded">
                  <svg
                    className="h-4 w-4 text-blue-500"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    stroke-width="2"
                    stroke="currentColor"
                    fill="none"
                    stroke-linecap="round"
                    stroke-linejoin="round">
                    {" "}
                    <path stroke="none" d="M0 0h24v24H0z" />{" "}
                    <path d="M4 20h4l10.5 -10.5a1.5 1.5 0 0 0 -4 -4l-10.5 10.5v4" />{" "}
                    <line x1="13.5" y1="6.5" x2="17.5" y2="10.5" />
                  </svg>
                </button>)}
                {currentUser.id == user.id && (<button
                  onClick={() => onRemove(comment.id)}
                  className="text-xs bg-gray-100 hover:bg-gray-200 font-bold p-1  rounded m-1">
                  <svg
                    className="h-4 w-4 text-blue-500"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    stroke-width="2"
                    stroke="currentColor"
                    fill="none"
                    stroke-linecap="round"
                    stroke-linejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" />
                    <line x1="4" y1="7" x2="20" y2="7" />
                    <line x1="10" y1="11" x2="10" y2="17" />
                    <line x1="14" y1="11" x2="14" y2="17" />
                    <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
                    <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
                  </svg>
                </button>)}
              </div>

              <p className="text-gray-600 mt-2">{comment.content}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default CommentComponet
