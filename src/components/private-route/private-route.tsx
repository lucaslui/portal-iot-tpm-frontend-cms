import { useContext } from 'react'
import { Navigate, Outlet } from 'react-router-dom'

import AccountContext from '../../contexts/account-context'

const PrivateRoute: React.FC = () => {
    const { getCurrentAccount } = useContext(AccountContext)
    return getCurrentAccount().accessToken ? <Outlet /> : <Navigate to="/auth/signin" replace />
}

export default PrivateRoute
