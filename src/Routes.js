import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LogInPage from './pages/LogInPage';
import SignUpPage from './pages/SignUpPage';
import MatchupsPage from './pages/MatchupsPage';
import { UserInfoPage } from './pages/UserInfoPage';
import React from 'react';

import { PrivateRoute } from './auth/PrivateRoute';

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
                <Route path="/" 
					element={<div>index page!</div>} />
            </Routes>
        </Router>
    );
}