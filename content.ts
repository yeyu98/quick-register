/*
 * @Author: yeyu98
 * @Date: 2025-05-30 21:20:18
 * @LastEditors: yeyu98
 * @LastEditTime: 2025-05-30 23:03:44
 * @Description: 
 */
import type { PlasmoCSConfig } from "plasmo"

export const config: PlasmoCSConfig = {
  matches: ["https://www.marklines.com/*"]
  // matches: ["https://*/*"]
}

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  console.log("onMessage", request, sender, sendResponse)
  const {data} = request
  const keys = ['name', 'corp', 'dept', 'position', 'tel']
  const submit = document.querySelector('.submit') as HTMLInputElement
  keys.forEach( (key) => {
    const input = document.querySelector(`#${key}`) as HTMLInputElement
    if(input) {
      input.value = data[key]
      input.dispatchEvent(new CustomEvent('input'))
    }
  })
  const country = document.querySelector('#country') as HTMLSelectElement
  if(country) {
    country.value = "2"
    country.dispatchEvent(new CustomEvent('change'))
  }
  if(submit) {
    setTimeout(() => {
      submit.click()
      sendResponse("done")
    }, 200)
  }
})