/*
 * @Author: yeyu98
 * @Date: 2025-05-30 21:20:18
 * @LastEditors: yeyu98
 * @LastEditTime: 2025-05-30 23:03:44
 * @Description: 
 */
import type { PlasmoCSConfig } from "plasmo"
import { FormType } from "../utils/enum"

export const config: PlasmoCSConfig = {
  matches: ["https://www.globalnevs.com/*", "https://www.marklines.com/*", "https://github.com/*"]
  // matches: ["https://*/*"]
}

interface FormValueParams {selector: string, value: string, eventType: string}
type ActualFormValue = Omit<FormValueParams, 'eventType'>

const setFormValue = <T extends HTMLInputElement | HTMLSelectElement>(params: FormValueParams) => {
  const {selector, value, eventType} = params
  const formItem = document.querySelector<T>(selector)
  if(formItem) {
    formItem.value = value
    formItem.dispatchEvent(new CustomEvent(eventType))
  }
}

const setInputValue = (params: ActualFormValue) => {
  const {selector, value} = params
  setFormValue<HTMLInputElement>({selector, value, eventType: 'input'})
}

const setSelectValue = (params: ActualFormValue) => {
  const {selector, value} = params
  setFormValue<HTMLSelectElement>({selector, value, eventType: 'change'})
}


const handleMarklines = (data: any) => {
  const keys = ['name', 'corp', 'dept', 'position', 'tel']
  keys.forEach( (key) => {
    setInputValue({selector: `#${key}`, value: data[key]})
  })
  setSelectValue({selector: '#country', value: '2'})
}

const handleGlobalnevs = (data: any) => {
  const password = 'Aa123456'
  const country = '1'
  const positionType = '4'
  const jobType = '5'
  const deptName = '销售部'

  setSelectValue({selector: '#form_item_country', value: country})

  setInputValue({selector: '#form_item_password', value: password})
  setInputValue({selector: '#form_item_userName', value: data.name})
  setInputValue({selector: '#form_item_phone', value: data.tel})
  setInputValue({selector: '#form_item_deptName', value: deptName})
  setInputValue({selector: '#form_item_companyName', value: data.corp})

  setSelectValue({selector: '#form_item_jobType', value: jobType})
  setSelectValue({selector: '#form_item_positionType', value: positionType})
} 


chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  console.log("onMessage", request, sender, sendResponse)
  const {data, type} = request

  if(type === FormType.Marklines) {
    handleMarklines(data)
  } else {
    handleGlobalnevs(data)
  }


  // FIX 自动提交未生效
    // setTimeout(() => {
    //   const submit = document.querySelector('.submit') as HTMLInputElement
    //   submit.click()
    // }, 200)


  sendResponse("done")

  // return true
})