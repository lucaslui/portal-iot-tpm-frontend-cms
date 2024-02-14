import React from 'react'

import styles from './input-image.module.scss'

type Props = {
    imageFile: File | null
    imageDefault: string
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
} & React.InputHTMLAttributes<HTMLInputElement>

const InputImage: React.FC<Props> = (props: Props) => {
    return (
        <div className={styles.input_image}>
            <label htmlFor="image">Foto do Perfil:</label>
            <img src={props.imageFile ? URL.createObjectURL(props.imageFile) : props.imageDefault} alt="Foto do perfil" />
            <input
                {...props}
                id="image"
                type="file"
                onChange={props.onChange}
            />
        </div>
    )
}

export default InputImage