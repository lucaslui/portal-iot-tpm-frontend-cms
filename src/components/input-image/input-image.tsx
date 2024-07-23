import React from 'react'

import styles from './input-image.module.scss'

type Props = {
    label: string
    imagePreview: File | string | null
    imageDefault: string
} & React.InputHTMLAttributes<HTMLInputElement>

const InputImage: React.FC<Props> = (props: Props) => {
    return (
        <fieldset className={styles.input_image}>
            <legend>{props.label}</legend>
            <div className={styles.container}>
                <img src={!props.imagePreview ? props.imageDefault : typeof props.imagePreview === 'string' ? props.imagePreview : URL.createObjectURL(props.imagePreview)} />
                <label htmlFor="image">Escolha uma imagem</label>
                <input
                    id="image"
                    type="file"
                    accept="image/jpg, image/jpeg, image/png"
                    name={props.name}
                    onChange={props.onChange}
                />
            </div>
        </fieldset>
    )
}

export default InputImage