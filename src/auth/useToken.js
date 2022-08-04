import { useState } from 'react';

export const useToken = () => {
	const [token, setTokenInternal] = useState(() => {
		return localStorage.getItem('token');
	});
	
	const setToken = newToken => {
		localStorage.setItem('token',newToken);
		setTokenInternal(newToken);
	}

	const removeToken = () => {
		localStorage.removeItem('token');
		setTokenInternal(null);
	}
	
	return [token, setToken, removeToken];
}