import cssText from "data-text:~style.css"

//tailwind css
export const getStyle = () => {
  const style = document.createElement("style")
  style.textContent = cssText
  return style
}

function CommentComponet({comment}) {
  return (
    <div>
      <div className="border rounded-md p-3 ml-3 my-3">
        <div className="flex gap-3 items-center">
          {/* <img
            src="../assets/icon.png"
            className="object-cover w-8 h-8 rounded-full 
                            border-2 border-emerald-400  shadow-emerald-400
                            "
          /> */}

          <h3 className="font-bold">{comment.userName}</h3>
        </div>

        <p className="text-gray-600 mt-2">{comment.content}</p>
      </div>
    </div>
  )
}

export default CommentComponet
