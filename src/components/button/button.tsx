import React from 'react'

type Props = React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>

const Button: React.FC<Props> = (props: Props) => {
  return (
    <button {...props}> {props.children} </button>
  )
}

export default Button
