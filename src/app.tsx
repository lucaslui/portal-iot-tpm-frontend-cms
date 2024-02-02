import React from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'

import AccountProvider from './providers/account-provider'

import AuthLayout from './layout/auth'

import SignInPage from './pages/signin/signin'
import SignUpPage from './pages/signup/signup'
import DashboardPage from './pages/home/home'
import { PrivateRoute } from './components'
import PanelLayout from './layout/panel'
import AddArticle from './contents/article/add-article'
import DeleteArticle from './contents/article/delete-article'
import AddCategory from './contents/category/add-category'
import AccountSettings from './contents/account/settings'
import EditProfile from './contents/profile/edit-profile'

const App: React.FC = () => {
    return (
        <AccountProvider>
            <BrowserRouter>
                <Routes>
                    <Route element={<PrivateRoute />}>
                        <Route path="/" element={<PanelLayout />} >
                            <Route index element={<Navigate to="dashboard" replace />} />
                            <Route index path="dashboard" element={<DashboardPage />} />
                            <Route path='edit-profile' element={<EditProfile/>} />
                            <Route path='add-article' element={<AddArticle/>} />
                            <Route path='edit-article' element={<AddArticle/>} />
                            <Route path='load-articles' element={<AddArticle/>} />
                            <Route path='delete-article' element={<DeleteArticle/>} />
                            <Route path='add-category' element={<AddCategory/>} />
                            <Route path='edit-category' element={<AddCategory/>} />
                            <Route path='load-categories' element={<AddCategory/>} />
                            <Route path='delete-category' element={<AddCategory/>} />
                            <Route path='account-settings' element={<AccountSettings/>} />
                        </Route>
                    </Route>
                    <Route path="auth" element={<AuthLayout />} >
                        <Route path="signin" element={<SignInPage />} />
                        <Route path="signup" element={<SignUpPage />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </AccountProvider>
    )
}

export default App
