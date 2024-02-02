import React from 'react'

import styles from './logo.module.scss'

import LogoSVG from '../../assets/imgs/logo.svg'

type Props = React.DetailedHTMLProps<React.ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>

const Logo: React.FC<Props> = () => {
    return (
        <div className={styles.login_logo}>
            <img src={LogoSVG} alt="logo" />
            <section>
                <h1>  &lt; <span>Internet of Things P-Library</span>/&gt; </h1>
                <h2> Aiming to disseminate knowledge about the Internet of Things in a simple, practical and objective way </h2>
            </section>
        </div>
    )
}

export default Logo
