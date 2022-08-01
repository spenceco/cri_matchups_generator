import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LogInPage from './pages/LogInPage';
import SignUpPage from './pages/SignUpPage';
import { lazy } from 'react';
import UserInfoPage from './pages/UserInfoPage';
import PleaseVerifyEmailPage from './pages/PleaseVerifyEmailPage';
import EmailVerificationLandingPage from './pages/EmailVerificationLandingPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import PasswordResetLandingPage from './pages/PasswordResetLandingPage';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';

const MatchupsPage = lazy(() => import('./pages/MatchupsPage'));


import { PrivateRoute } from '../auth/PrivateRoute';

export const RoutesContainer = () => {
    return (
        <Routes>
			<Route path="/login"
				element={<LogInPage />} />
			<Route path="/about"
				element={<AboutPage />} />
			<Route path="/user"
				element={<PrivateRoute><UserInfoPage /></PrivateRoute>} />
			<Route path="/signup"
				element={<SignUpPage />} />
			<Route path="/matchups"
				element={<PrivateRoute><MatchupsPage /></PrivateRoute>} />
			<Route path="/verify-email/:verificationString"
				element={<EmailVerificationLandingPage />} />
			<Route path="/please-verify"
				element={<PleaseVerifyEmailPage />} />
			<Route path="/forgot-password"
				element={<ForgotPasswordPage />} />
			<Route path="/reset-password/:passwordResetCode"
				element={<PasswordResetLandingPage />} />
            <Route path="/" 
				element={<HomePage />} />
        </Routes>
    );
}