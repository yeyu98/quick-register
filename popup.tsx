/*
 * @Author: yeyu98
 * @Date: 2025-05-30 21:10:29
 * @LastEditors: yeyu98
 * @LastEditTime: 2025-05-30 22:21:06
 * @Description: 
 */
import { useState } from "react"
import { generateForm } from "./utils"
import loading from './assets/loading.gif'
import './popup.css'

function IndexPopup() {
  const [status, setStatus] = useState(false)

  const handleClick = async() => {
    setStatus(true)
    const message = await generateForm()
    const [currentTab] = await chrome.tabs.query({ active: true, currentWindow: true })
    const response = await chrome.tabs.sendMessage(currentTab.id, {data: message})
    console.log("response", response)
    if(response === "done") {
      setStatus(false)
    }
  }

  return (
    <div className="popup">
        <button className="marklines-button" onClick={handleClick}>
          <span>marklines表单生成</span>
          {status && <img className="loading-icon" src={loading} alt="loading" />}
        </button>
    </div>
  )
}

export default IndexPopup
