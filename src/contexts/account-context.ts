import { createContext } from 'react'
import { AccountModel } from '../models/account'

type Props = {
  setCurrentAccount: (account: AccountModel) => void
  getCurrentAccount: () => AccountModel
  removeCurrentAccount: () => void
}

const AccountContext = createContext<Props>(
    {
        setCurrentAccount: () => {},
        getCurrentAccount: () => {
            return {
                accessToken: '',
            }
        },
        removeCurrentAccount: () => {}
    }
)

export default AccountContext
