import type { PlasmoCSConfig } from "plasmo"

export const config: PlasmoCSConfig = {
  matches: ["https://github.com/*"]
}

let pos = ""
window.addEventListener("mouseup", () => {
  
  console.log(window.getSelection().toString())
  console.log(window.getSelection().getRangeAt(0))
  pos = window.getSelection().getRangeAt(0).toString();
})
