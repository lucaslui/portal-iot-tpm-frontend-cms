import React from 'react'

import Styles from './input.module.scss'

type Props = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

const Input: React.FC<Props> = (props: Props) => {
  const enableInput = (event: React.FocusEvent<HTMLInputElement>): void => {
    event.target.readOnly = false
  }

  const getStatus = (): string => {
    return props.title ? '🔴' : '🟢'
  }

  const getTitle = (): string => {
    return props.title || 'Tudo certo'
  }

  return (
    <div className={Styles.inputWrap}>
      <input
        {...props}
        readOnly onFocus={enableInput}
        // data-status={props.title ? 'invalid' : 'valid'}
        />
      <span
        title={getTitle()}
        className={Styles.status}>
        {getStatus()}
      </span>
    </div>
  )
}

export default Input
