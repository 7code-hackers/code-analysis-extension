import axios from "axios"
import dayjs from "dayjs"
import { useEffect, useState } from "react"

import { useStorage } from "@plasmohq/storage/hook"

function ExplanationComponet({
  explanation,
  onRemove,
  onEdit,
  showComments,
  setShowComments,
  setExplanationIndex
}) {
  //console.log(explanation.content)
  const defaulUser = {
    id: "dfu",
    name: "defaultUser",
    password: "$2b$10$1TTJ/9hOd3W0t8d4vEqXvezWLKdlW31Pr.KwMIfCk8VFk0MgpZZ2.",
    email: "user1214@email.com",
    createdAt: "2023-12-15T01:04:50.000Z",
    updatedAt: "2023-12-15T01:04:50.000Z"
  }
  const [editMode, setEditMode] = useState(false)
  const [editValue, setEditvalue] = useState("")
  const [user, setUser] = useState(defaulUser)
  const [voteNumber, setVoteNumber] = useState(
    explanation.upVote - explanation.downVote
  )
  const [currentUser] = useStorage("currentUser", (v) =>
    v === undefined ? defaulUser : v
  )
  const [isUpVoted, setIsUpVoted] = useState(explanation.upVotedByUser)
  function voteHandler(isUpvote) {
    if (isUpvote) {
      axios
        .post(
          `${process.env.PLASMO_PUBLIC_BACKEND_URL}vote`,
          {
            userId: currentUser.id,
            explanationId: explanation.id,
            isUpVote: true
          },
          { withCredentials: true }
        )
        .then((res) => {
          console.log(res)
          setVoteNumber((pre) => pre + 1)
          setIsUpVoted((pre) => {
            if (pre == false) {
              return null
            } else {
              return true
            }
          })
        })
        .catch(function (error) {
          console.log(error.config)
        })
    } else {
      axios
        .post(
          `${process.env.PLASMO_PUBLIC_BACKEND_URL}vote`,
          {
            userId: currentUser.id,
            explanationId: explanation.id,
            isUpVote: false
          },
          { withCredentials: true }
        )
        .then((res) => {
          console.log(res)
          setVoteNumber((pre) => pre - 1)
          setIsUpVoted((pre) => {
            if (pre == null) {
              return false
            } else {
              return null
            }
          })
        })
        .catch(function (error) {
          console.log(error.config)
        })
    }
  }

  useEffect(() => {
    // const savedSession = JSON.parse(localStorage.getItem("currentSession"))
    // console.log("current session " + savedSession)
    axios
      .get(
        `${process.env.PLASMO_PUBLIC_BACKEND_URL}user/${explanation.userId}`,
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

    // axios
    //   .get(
    //     `${process.env.PLASMO_PUBLIC_BACKEND_URL}vote/user/${currentUser.id}/explanation/${explanation.id}`,
    //     {
    //       withCredentials: true
    //     }
    //   )
    //   .then((res) => {
    //     //
    //     setIsVoted(true)
    //     console.log(res)
    //   })
    //   .catch(function (error) {
    //     console.log(error.config)
    //   })
  }, [])
  return (
    <div>
      <div className="flex justify-between border my-3">
        <div className="flex flex-col items-center bg-slate-50 p-3">
          <button className="" onClick={() => voteHandler(true)} disabled={isUpVoted}>
            <svg
              className={(isUpVoted?"text-red-500 ":"text-blue-500 hover:text-blue-700 ")+"h-8 w-8"}
              width="24"
              height="24"
              viewBox="0 0 24 24"
              stroke-width="2"
              stroke="currentColor"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round">
              <path stroke="none" d="M0 0h24v24H0z" />
              <circle cx="12" cy="12" r="9" />
              <line x1="12" y1="8" x2="8" y2="12" />
              <line x1="12" y1="8" x2="12" y2="16" />
              <line x1="16" y1="12" x2="12" y2="8" />
            </svg>
          </button>
          <p>{voteNumber}</p>
          
          <button
            onClick={() => voteHandler(false)}
            disabled={isUpVoted == false}>
            <svg
              className={(isUpVoted==false?"text-red-500 ":"text-blue-500 hover:text-blue-700 ")+"h-8 w-8"}
              width="24"
              height="24"
              viewBox="0 0 24 24"
              stroke-width="2"
              stroke="currentColor"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round">
              <path stroke="none" d="M0 0h24v24H0z" />
              <circle cx="12" cy="12" r="9" />
              <line x1="8" y1="12" x2="12" y2="16" />
              <line x1="12" y1="8" x2="12" y2="16" />
              <line x1="16" y1="12" x2="12" y2="16" />
            </svg>
          </button>
        </div>
        <div className="w-full m-3 p-3">
          {editMode ? (
            <div>
              <form
                id="updateExplanationForm"
                onSubmit={(ev) => {
                  ev.preventDefault()
                  setEditMode((pre) => !pre)
                  onEdit(editValue, explanation.id)
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
                      {dayjs(explanation.createdAt).format("YYYY/MM/DD HH:mm")}
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
                  {!showComments && (
                    <button
                      onClick={() => onRemove(explanation.id)}
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
                  )}
                </div>

                <textarea
                  className="block p-2.5 mt-2 w-full text-sm text-gray-900 bg-gray-50 rounded-lg 
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
                    {dayjs(explanation.createdAt).format("YYYY/MM/DD HH:mm")}
                  </p>
                </div>
                {currentUser.id == user.id && (
                  <button
                    onClick={() => {
                      setEditMode(!editMode)
                      setEditvalue(explanation.content)
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
                      <path stroke="none" d="M0 0h24v24H0z" />
                      <path d="M4 20h4l10.5 -10.5a1.5 1.5 0 0 0 -4 -4l-10.5 10.5v4" />
                      <line x1="13.5" y1="6.5" x2="17.5" y2="10.5" />
                    </svg>
                  </button>
                )}
                {!showComments && currentUser.id == user.id && (
                  <button
                    onClick={() => onRemove(explanation.id)}
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
                )}
              </div>

              <p className="text-gray-600 mt-2">{explanation.content}</p>
            </div>
          )}

          {!showComments && (
            <button
              onClick={() => {
                setShowComments(true)
                setExplanationIndex()
              }}
              className="flex text-xs background-transparent text-[#0258d7] hover:text-blue-900  font-bold mt-2">
              See More{" "}
            </button>
            // <a onClick={() => {
            //     setShowComments(true)
            //     setExplanationIndex()
            //   }}
            //   href=""
            //   className="inline-flex items-center font-xs text-[#0258d7] dark:text-blue-500 hover:underline"
            //   >See More</a>
          )}
        </div>
        {/* <p>line start : {explanation.lineStart}</p> */}
      </div>
    </div>
  )
}

export default ExplanationComponet
