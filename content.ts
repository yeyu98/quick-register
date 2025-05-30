/*
 * @Author: yeyu98
 * @Date: 2025-05-30 21:20:18
 * @LastEditors: yeyu98
 * @LastEditTime: 2025-05-30 22:18:30
 * @Description: 
 */
import type { PlasmoCSConfig } from "plasmo"

export const config: PlasmoCSConfig = {
  // matches: ["https://www.plasmo.com/*"]
  matches: ["https://*/*"]
}

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  console.log("onMessage", request, sender, sendResponse)
  const {data} = request
  const name = document.querySelector('#name') as HTMLInputElement
  const corp = document.querySelector('#corp') as HTMLInputElement
  const dept = document.querySelector('#dept') as HTMLInputElement
  const position = document.querySelector('#position') as HTMLInputElement
  const tel = document.querySelector('#tel') as HTMLInputElement
  const country = document.querySelector('#country') as HTMLSelectElement

  if (name && corp && dept && position && tel && country) {
    name.value = data.name
    corp.value = data.company
    dept.value = data.department
    position.value = data.position
    tel.value = data.phone
    country.value = "2"
  }
  sendResponse(name)
})