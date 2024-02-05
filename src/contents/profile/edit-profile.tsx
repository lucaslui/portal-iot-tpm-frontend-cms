import React, { useState } from 'react'

import styles from './edit-profile.module.scss'

import { PageTitle, InputGroup, TextAreaGroup, FormStatus, CustomButton } from '../../components'


const EditProfile: React.FC = () => {
  const [state, setState] = useState({
    isLoading: false,
    isFormInvalid: true,
    name: '',
    email: '',
    password: '',
    passwordConfirmation: '',
    nameError: '',
    emailError: '',
    passwordError: '',
    passwordConfirmationError: '',
    aboutError: '',
    mainError: ''
  })

  const handleChange = (event: React.FocusEvent<HTMLInputElement>): void => {
    setState({
      ...state,
      [event.target.name]: event.target.value
    })
  }

  const handleChangeTextArea = (event: React.FocusEvent<HTMLTextAreaElement>): void => {
    setState({
      ...state,
      [event.target.name]: event.target.value
    })
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    return null
  }

  return (
    <>
      <PageTitle title='Editar Perfil' subtitle='Contém o conjunto de informações do autor'/>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.row}>
          <InputGroup mr={true} onChange={handleChange} title={state.nameError} type="text" name="nickname" span="Nome:" placeholder="Digite seu nome" />
          <InputGroup mr={true} onChange={handleChange} title={state.nameError} type="text" name="nickname" span="Apelido:" placeholder="Digite seu apelido" />
          <InputGroup onChange={handleChange} title={state.nameError} type="text" name="occupation" span="Profissão:" placeholder="Digite sua profissão" />
        </div>
        <div className={styles.row}>
          <InputGroup mr={true} onChange={handleChange} title={state.nameError} type="text" name="nickname" span="Email:" placeholder="Digite seu email" />
          <InputGroup mr={true} onChange={handleChange} title={state.nameError} type="text" name="contact" span="Telefone:" placeholder="Digite seu telefone" />
          <InputGroup onChange={handleChange} title={state.nameError} type="text" name="occupation" span="Endereço:" placeholder="Digite sua endereço" />
        </div>
        <div className={styles.row}>
          <InputGroup onChange={handleChange} title={state.nameError} type="text" name="website" span="Página Profissional:" placeholder="Digite o endereço da sua página profissional" />
        </div>
        <div className={styles.row}>
          <InputGroup onChange={handleChange} title={state.nameError} type="text" name="interects" span="Interesses:" placeholder="Digite áreas e tecnologias em que tem interesse" />
        </div>
        <div className={styles.row}>
          <TextAreaGroup className={styles.bigInput} onChange={handleChangeTextArea} title={state.aboutError} name="about" span="Sobre:" placeholder="Digite um pouco sobre você"/>
        </div>
        <div className={styles.row}>
          <FormStatus isLoading={state.isLoading} mainError={state.mainError} />
          <CustomButton disabled={state.isFormInvalid} type="submit" value="Editar"> Editar </CustomButton>
        </div>
      </form>
    </>
  )
}

export default EditProfile
