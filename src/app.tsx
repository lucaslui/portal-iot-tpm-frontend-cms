import React from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'

import AccountProvider from './providers/account-provider'

import AuthLayout from './layout/auth'

import SignInPage from './pages/signin/signin'
import SignUpPage from './pages/signup/signup'
import DashboardPage from './pages/home/dashboard'
import { PrivateRoute } from './components'
import PanelLayout from './layout/panel'
import AddArticle from './contents/article/article-form'
import AccountSettings from './contents/account/settings'
import Profile from './contents/profile/profile'
import ArticlesTable from './contents/article/articles-table'

import { PrimeReactProvider } from 'primereact/api';

const App: React.FC = () => {
    return (
        <AccountProvider>
            <BrowserRouter>
                <PrimeReactProvider>
                    <Routes>
                        <Route element={<PrivateRoute />}>
                            <Route path="/" element={<PanelLayout />} >
                                <Route index element={<Navigate to="dashboard" replace />} />
                                <Route index path="dashboard" element={<DashboardPage />} />
                                <Route path='articles' element={<ArticlesTable />} />
                                <Route path='articles/form' element={<AddArticle />} />
                                <Route path='articles/form/:articleId' element={<AddArticle />} />
                                <Route path='categories' element={<ArticlesTable />} />
                                <Route path='settings/profile' element={<Profile />} />
                                <Route path='settings/password' element={<AccountSettings />} />
                            </Route>
                        </Route>
                        <Route path="auth" element={<AuthLayout />} >
                            <Route path="signin" element={<SignInPage />} />
                            <Route path="signup" element={<SignUpPage />} />
                        </Route>
                    </Routes>
                </PrimeReactProvider>
            </BrowserRouter>
        </AccountProvider>
    )
}

export default App
