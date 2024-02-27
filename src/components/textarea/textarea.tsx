import React from 'react'

import styles from './textarea.module.scss'

type Props = React.DetailedHTMLProps<React.TextareaHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement>

const TextArea: React.FC<Props> = (props: Props) => {
  const enableInput = (event: React.FocusEvent<HTMLTextAreaElement>): void => {
    event.target.readOnly = false
  }

  const getStatus = (): string => {
    return props.title ? '🔴' : '🟢'
  }

  const getTitle = (): string => {
    return props.title || 'Tudo certo'
  }

  return (
    <div className={styles.textarea_wrapper}>
      <textarea
        {...props}
        rows={2}
        cols={1}
        readOnly onFocus={enableInput}
        data-status={props.title ? 'invalid' : 'valid'}
        />
      <span
        title={getTitle()}
        className={styles.status}>
        {getStatus()}
      </span>
    </div>
  )
}

export default TextArea
