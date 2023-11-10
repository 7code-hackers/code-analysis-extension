import cssText from "data-text:~style.css"
import { useState } from "react"

//tailwind css
export const getStyle = () => {
  const style = document.createElement("style")
  style.textContent = cssText
  return style
}

function CommentComponet({ comment, onRemove, onEdit }) {
  const [editMode, setEditMode] = useState(false)
  const [editValue, setEditvalue] = useState(comment.content)
  return (
    <div>
      <div className="flex justify-between border rounded-md p-3 ml-3 my-3">
        <div className="p-3">
          {/* <div className="flex gap-3 items-center">
          <img
            src={comment.avatar}
            className="object-cover w-8 h-8 rounded-full 
                            border-2 border-emerald-400  shadow-emerald-400
                            "
          />

          <h3 className="font-bold">{comment.userName}</h3>
        </div> */}
          {editMode ? (
            <div>
              <form
                onSubmit={(ev) => {
                  ev.preventDefault()
                  setEditMode((pre) => !pre)
                  onEdit(editValue, comment.id)
                }}>
                <textarea
                  value={editValue}
                  onKeyDown={(e) => {
                    e.stopPropagation()
                  }}
                  onChange={(e) => {
                    e.stopPropagation()
                    setEditvalue(e.target.value)
                  }}></textarea>
                <button
                  type="submit"
                  className="text-xs bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mr-3 rounded">
                  Done
                </button>
              </form>
            </div>
          ) : (
            <div>
              <p className="text-gray-600 mt-2">{comment.content}</p>
              <button
                onClick={() => setEditMode(!editMode)}
                className="text-xs bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mr-3 rounded">
                Edit
              </button>
            </div>
          )}

          <button
            onClick={() => onRemove(comment.id)}
            className="text-xs bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 mr-3 rounded">
            Delete
          </button>
        </div>
        <div className="flex flex-col items-end gap-3 pr-3 py-3">
          <div>
            <svg
              className="w-6 h-6 text-gray-600"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="5"
              stroke="currentColor">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M4.5 15.75l7.5-7.5 7.5 7.5"
              />
            </svg>
          </div>
          <div>
            <svg
              className="w-6 h-6 text-gray-600"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="5"
              stroke="currentColor">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M19.5 8.25l-7.5 7.5-7.5-7.5"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CommentComponet
