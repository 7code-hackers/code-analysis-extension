import cssText from "data-text:~style.css"

//tailwind css
export const getStyle = () => {
  const style = document.createElement("style")
  style.textContent = cssText
  return style
}

function CommentComponet({ comment }) {
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

        <p className="text-gray-600 mt-2">{comment.content}</p>
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
