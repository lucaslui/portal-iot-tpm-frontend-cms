import React from 'react'

import styles from './form-status.module.scss'

import Spinner from '../spinner/spinner'

type Props = {
  isLoading: boolean
  mainError: string
  successMessage?: string
}

const FormStatus: React.FC<Props> = (props: Props) => {
  return (
    <div className={styles.errorWrap}>
      { props.isLoading && <Spinner className={styles.spinner}/>}
      { props.mainError && <span className={styles.error}>{props.mainError}</span>}
      { props.successMessage && <span className={styles.success}>{props.successMessage}</span>}
    </div>
  )
}

export default FormStatus
