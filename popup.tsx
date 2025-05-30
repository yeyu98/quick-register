/*
 * @Author: yeyu98
 * @Date: 2025-05-30 21:10:29
 * @LastEditors: yeyu98
 * @LastEditTime: 2025-05-30 22:21:06
 * @Description: 
 */
import { useMemo, useState } from "react"
import { generateForm } from "./utils"

function IndexPopup() {
  const [status, setStatus] = useState(1)

  const statusText = useMemo(() => status === 1 ? "暂无" : "生成中...", [status])

  const handleClick = async() => {
    setStatus(2)
    const message = await generateForm()
    const [currentTab] = await chrome.tabs.query({ active: true, currentWindow: true })
    const response = await chrome.tabs.sendMessage(currentTab.id, {data: message})
    console.log("click", currentTab, response)
    setStatus(1)
  }

  return (
    <div
      style={{
        padding: 16
      }}>
        <div>状态：{statusText}</div>
        <button onClick={handleClick}>表单生成</button>
    </div>
  )
}

export default IndexPopup
