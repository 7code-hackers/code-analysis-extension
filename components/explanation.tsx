import cssText from "data-text:~style.css"
import { useState } from "react"

//tailwind css
export const getStyle = () => {
  const style = document.createElement("style")
  style.textContent = cssText
  return style
}

function ExplanationComponet({
  explanation,
  onRemove,
  onEdit,
  showComments,
  setShowComments,
  setExplanationIndex
}) {
  console.log(explanation.id)
  const [editMode, setEditMode] = useState(false)
  const [editValue, setEditvalue] = useState(explanation.content)

  return (
    <div>
      <div className="flex justify-between border rounded-md p-3 ml-3 my-3">
        <div className="p-3">
          {editMode ? (
            <div>
              <form
                onSubmit={(ev) => {
                  ev.preventDefault()
                  setEditMode((pre) => !pre)
                  onEdit(editValue, explanation.id)
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
              <p className="text-gray-600 mt-2">{explanation.content}</p>
              <button
                onClick={() => setEditMode(!editMode)}
                className="text-xs bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mr-3 rounded">
                Edit
              </button>
            </div>
          )}

          <button
            onClick={() => onRemove(explanation.id)}
            className="text-xs bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 mr-3 rounded">
            Delete
          </button>
          {!showComments&&<button
            onClick={() => {
              setShowComments(true)
              setExplanationIndex()
            }}
            className="text-xs bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            See More
          </button>}
        </div>
        {/* <p>line start : {explanation.lineStart}</p> */}
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
          <p>{explanation.upVote - explanation.downVote}</p>
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

export default ExplanationComponet
