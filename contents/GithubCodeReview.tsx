import type { PlasmoCSConfig, PlasmoGetStyle } from "plasmo"
import { useEffect, useState } from "react"
import styleText from  "data-text:./GithubCodeReview.css"

export const config: PlasmoCSConfig = {
    matches: ["https://github.com/*"]
}

export const getStyle: PlasmoGetStyle = () => {
    const style = document.createElement('style')
    style.textContent = styleText
    return style
}

// 选择悬挂在那个节点附近
// export const getOverlayAnchor: PlasmoGetOverlayAnchor = async () =>
//     document.querySelector('a')

const GithubCodeReview = () => {
    const [url, setUrl] = useState('')

    const handleClick = () => {
        window.open(url)
    }

    useEffect(() => {
        const href = window.location.href
        const _url = href.replace('github.com', 'github1s.com')
        setUrl(_url)
    }, [])
    return <div className="github-code-review-container">
        <button className="github-code-review" onClick={handleClick}>github1s</button>
    </div>
}
   
export default GithubCodeReview