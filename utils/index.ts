/*
 * @Author: yeyu98
 * @Date: 2025-05-30 21:51:10
 * @LastEditors: yeyu98
 * @LastEditTime: 2025-05-30 22:54:51
 * @Description: 
 */

const API_KEY = 'sk-zibezegtvncuoyiuneltipcslsvwurxysdzgyorasqxcfvmb'
const API_URL = 'https://api.siliconflow.cn/v1/chat/completions'

const CONTENT = '生成一个五位以内的姓名name，生成一个公司名corp，一个部门dept，一个职位position，一个11位的中国联系电话tel 并使用json返回，要求生成的结果与之前的都不一样'

export const generateForm = () => {

    const data = {
        model: 'deepseek-ai/DeepSeek-V3',
        messages: [{role: 'user', content: CONTENT}],
        stream: false,
        max_tokens: 512,
        enable_thinking: false,
        response_format: {type: 'json_object'}
    }

    const options = {
        method: 'POST',
        headers: {Authorization: `Bearer ${API_KEY}`, 'Content-Type': 'application/json'},
        body: JSON.stringify(data)
      };
      
    return fetch(API_URL, options)
        .then(response => response.json())
        .then(response => {
          const content = response.choices?.[0]?.message?.content
          return JSON.parse(content)
        })
        .catch(err => console.error(err));
}