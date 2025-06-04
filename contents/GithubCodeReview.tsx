import type { PlasmoCSConfig, PlasmoGetOverlayAnchor } from "plasmo"
import { useEffect, useState } from "react"
import "./GithubCodeReview.css"


export const config: PlasmoCSConfig = {
    matches: ["https://github.com/*"]
}

// 选择悬挂在那个节点附近
export const getOverlayAnchor: PlasmoGetOverlayAnchor = async () =>
    document.querySelector('a')

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
    return <button className="github-code-review" onClick={handleClick}>github1s</button>
}
   
export default GithubCodeReview