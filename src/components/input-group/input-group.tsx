import React from 'react'

import styles from './input-group.module.scss'

import Input from '../input/input'

type Props = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> & { span: string, mr?: boolean }

const InputGroup: React.FC<Props> = (props: Props) => {
  return (
    <div className={`${styles.inputGroup} ${props.mr && 'mr'}`}>
      <span> {props.span} </span>
      <Input {...props} />
    </div>
  )
}

export default InputGroup
