import cssText from "data-text:~style.css"

import { useStorage } from "@plasmohq/storage/hook"

//tailwind css
export const getStyle = () => {
  const style = document.createElement("style")
  style.textContent = cssText
  return style
}

function ExplanationComponet({ explanation, onRemove }) {
  console.log(explanation.id)
  return (
    <div>
      <div className="flex justify-between border rounded-md p-3 ml-3 my-3">
        <div className="p-3">
          <p className="text-gray-600 mt-2">{explanation.content}</p>
          <p>line start : {explanation.lineStart}</p>
          <button
            onClick={() => onRemove(explanation.id)}
            className="bg-red-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
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
