import React from 'react'

import styles from './vertical-logo.module.scss'

import LogoImage from '../../assets/imgs/logo.png'

type Props = React.DetailedHTMLProps<React.ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>

const VerticalLogo: React.FC<Props> = () => {
    return (
        <div className={styles.vertical_logo}>
            <img src={LogoImage} alt="logo" />
            <div className={styles.title}>
                <h1> Portal <strong>IoT-TpM</strong> Unicamp </h1>
                <h2> Conteúdo sobre Internet das Coisas de forma simples, prática e objetiva </h2>
            </div>
        </div>
    )
}

export default VerticalLogo
