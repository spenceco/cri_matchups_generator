import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useToken } from '../auth/useToken';

export const LogInPage = () => {
	const [token,setToken] = useToken();
	const [errorMessage,setErrorMessage] = useState('');
	const [emailValue,setEmailValue] = useState('');
	const [passwordValue,setPasswordValue] = useState('');
	
	const navigate = useNavigate();
	
	const onLogInClicked = async () => {
		const response = await axios.post('/api/login', {
			email: emailValue,
			password: passwordValue,
		});
		
		const { token } = response.data;
		setToken(token);
		navigate('/');
	}
	
	
	return (
		<div className="content-container">
			<h1>Log In</h1>
			{errorMessage && <div className="fail">{errorMessage}</div>}
			<input
				value={emailValue}
				onChange={e => setEmailValue(e.target.value)}
				placeholder="someone@gmail.com" />
			<input
				value={passwordValue}
				onChange={e => setPasswordValue(e.target.value)}
				placeholder="password"
				type="password" />
			<hr />
			<button
				disabled={!emailValue || !passwordValue} 
				onClick={onLogInClicked}>Log In</button>
			<button
				onClick={() => navigate('/forgot-password')}>Forgot your password?</button>
			<button
				onClick={() => navigate('/signup')}>Dont have an account? Sign up</button>
		</div>
	)
}

export default LogInPage