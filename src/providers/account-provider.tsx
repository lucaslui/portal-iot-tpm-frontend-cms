import React, { ReactNode } from 'react'

import AccountContext from '../contexts/account-context'
import { AccountModel } from '../models/account'


type ProviderProps = {
  children: ReactNode
}

const AccountProvider: React.FC<ProviderProps> = ({ children }: ProviderProps) => {
  const setCurrentAccount = (account: AccountModel): void => {
    localStorage.setItem('account', JSON.stringify(account))
  }

  const getCurrentAccount = (): AccountModel => {
    const account = localStorage.getItem('account')
    return account ? JSON.parse(account) : { accessToken: '' }
  }

  const removeCurrentAccount = (): void => {
    localStorage.removeItem('account')
  }

  return (
    <AccountContext.Provider value={{ setCurrentAccount, getCurrentAccount, removeCurrentAccount }}>
      {children}
    </AccountContext.Provider>
  )
}

export default AccountProvider
