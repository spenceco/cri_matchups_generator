import { Navigate } from 'react-router-dom';
import React from 'react';

export const PrivateRoute = ({ children }) => {
	const user = null;
	
	return user ? children : <Navigate to="/login" />
	
	
}