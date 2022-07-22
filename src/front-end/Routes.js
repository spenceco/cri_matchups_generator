import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LogInPage from './pages/LogInPage';
import SignUpPage from './pages/SignUpPage';
import MatchupsPage from './pages/MatchupsPage';
import UserInfoPage from './pages/UserInfoPage';
import PleaseVerifyEmailPage from './pages/PleaseVerifyEmailPage';
import EmailVerificationLandingPage from './pages/EmailVerificationLandingPage';


import { PrivateRoute } from './shared-components/PrivateRoute';

export const RoutesContainer = () => {
    return (
        <Router>
            <Routes>
				<Route path="/login"
					element={<LogInPage />} />
				<Route path="/user"
					element={<PrivateRoute><UserInfoPage /></PrivateRoute>} />
				<Route path="/signup"
					element={<SignUpPage />} />
				<Route path="/matchups"
					element={<MatchupsPage />} />
				<Route path="/verify-email/:verificationString"
					element={<EmailVerificationLandingPage />} />
				<Route path="/please-verify"
					element={<PleaseVerifyEmailPage />} />
                <Route path="/" 
					element={<div>index page!</div>} />
            </Routes>
        </Router>
    );
}