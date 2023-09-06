import type { PlasmoCSConfig } from "plasmo"
import { useEffect, useState } from "react"

const readLines = () => {
  const resultStrings = [];
  const targetDivs = document.getElementsByClassName('react-code-line-contents');
  for (let i = 0; i < targetDivs.length; i++) {
    const divElement = targetDivs[i];
    let currentString = '';
    const spanElements = divElement.getElementsByTagName('span');
    for (let j = 0; j < spanElements.length; j++) {
      const spanElement = spanElements[j];
      const dataCodeTextValue = spanElement.getAttribute('data-code-text');
      currentString += dataCodeTextValue;
    }
    resultStrings.push(currentString);
  }

  for (let i = 0; i < resultStrings.length; i++) {
    console.log(`Line for div ${i + 1}: ${resultStrings[i]}`);
  }


}


export default readLines;