/*
 * @Author: yeyu98
 * @Date: 2025-05-30 21:10:29
 * @LastEditors: yeyu98
 * @LastEditTime: 2025-05-30 22:21:06
 * @Description: 
 */
import { useState } from "react"
import CButton from "./components/CButton"
import { generateForm } from "./utils"
import './popup.css'
import { FormType } from "./utils/enum"

function IndexPopup() {
  const [status, setStatus] = useState(false)

  const handleClick = async(formType: FormType) => {
    setStatus(true)
    const message = await generateForm()
    console.log("formType", formType)
    const [currentTab] = await chrome.tabs.query({ active: true, currentWindow: true })
    const response = await chrome.tabs.sendMessage(currentTab.id, {data: message, type: formType})
    console.log("response", response)
    if(response === "done") {
      setStatus(false)
    }
  }

  return (
    <div className="popup">
       <CButton style={{marginBottom: 10}} text="marklines表单生成" loading={status} onClick={() => handleClick(FormType.Marklines)} />
       <CButton text="globalnevs表单生成" loading={status} onClick={() => handleClick(FormType.Gloablnevs)} />
    </div>
  )
}

export default IndexPopup
