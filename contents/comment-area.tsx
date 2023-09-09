import cssText from "data-text:~style.css"
import type { PlasmoCSConfig, PlasmoGetOverlayAnchor } from "plasmo"
import { useState } from "react"

//tailwind css
export const getStyle = () => {
  const style = document.createElement("style")
  style.textContent = cssText
  return style
}

export const config: PlasmoCSConfig = {
  matches: ["https://github.com/*"]
}

export const getInlineAnchor: PlasmoGetOverlayAnchor = () =>
  document.querySelector(
    `#repo-content-pjax-container > react-app > div > div > div.Box-sc-g0xbh4-0.fSWWem > div > div > main > div.Box-sc-g0xbh4-0.hlUAHL > div > div:nth-child(3) > div.Box-sc-g0xbh4-0.iJmJly > div.Box-sc-g0xbh4-0.kjydbF.container`
  )

// Use this to optimize unmount lookups
//export const getShadowHostId = () => "plasmo-inline-example-unique-id"

const CommentArea = () => {
  return (
    <div class="max-w-md mx-2 mt-10 rounded border-2 overflow-hidden shadow-lg">
      <div class="px-6 py-4">
        <div class="font-bold text-xl mb-2">The Coldest Sunset</div>
        <p class="text-gray-700 text-base">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus
          quia, nulla! Maiores et perferendis eaque, exercitationem praesentium
          nihil.
        </p>
      </div>
      <div class="px-6 pt-4 pb-2">
        <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
          #photography
        </span>
        <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
          #travel
        </span>
        <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
          #winter
        </span>
      </div>
    </div>
  )
}

export default CommentArea
