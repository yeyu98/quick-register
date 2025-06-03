import React from 'react'
import loadingIcon from '../../assets/loading.gif'
import './index.css'

interface CButtonProps {
  text: string
  loading?: boolean
  children?: React.ReactNode
  style?: React.CSSProperties
  onClick?: () => void
}

const CButton: React.FC<CButtonProps> = (props) => {
  const { text, loading = false, children,  ...rest } = props
  return (
    <button className="c-button" {...rest}>
      <span>{text}</span>
      {children ? children : loading && <img className="loading-icon" src={loadingIcon} alt="loading" />}
    </button>
  )
}

export default CButton