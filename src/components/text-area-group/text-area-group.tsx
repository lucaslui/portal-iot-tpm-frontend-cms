import React from 'react'

import styles from './text-area-group.module.scss'

import TextArea from '../text-area/text-area'

type Props = React.DetailedHTMLProps<React.TextareaHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement> & { span: string }

const TextAreaGroup: React.FC<Props> = (props: Props) => {
  return (
    <div className={`${styles.textareaGroup}`}>
      <span> {props.span} </span>
      <TextArea {...props} />
    </div>
  )
}

export default TextAreaGroup
