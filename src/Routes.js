import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LogInPage from './pages/LogInPage';
import SignUpPage from './pages/SignUpPage';
import React from 'react';

import { PrivateRoute } from './auth/PrivateRoute';

export const RoutesContainer = () => {
    return (
        <Router>
            <Routes>
				<Route path="/login"
					element={<LogInPage />} />
				<Route path="/user"
					element={<PrivateRoute><div>private space!</div></PrivateRoute>} />
				<Route path="/signup"
					element={<SignUpPage />} />
                <Route path="/" 
					element={<div>index page!</div>} />
            </Routes>
        </Router>
    );
}