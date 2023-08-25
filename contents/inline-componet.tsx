import type { PlasmoCSConfig, PlasmoGetInlineAnchor  } from "plasmo"

//tailwind css
import cssText from "data-text:~style.css"
export const getStyle = () => {
  const style = document.createElement("style")
  style.textContent = cssText
  return style
}

export const config: PlasmoCSConfig = {
  matches: ["https://github.com/*"]
}

export const getInlineAnchor: PlasmoGetInlineAnchor  = () =>
  document.querySelector(`[id="LC10"]`)

// Use this to optimize unmount lookups
//export const getShadowHostId = () => "plasmo-inline-example-unique-id"

const PlasmoInline = () => {
  return (
    <div>
      <button
        type="button"
        className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto">
        +
      </button>

    </div>
  )
}

export default PlasmoInline
