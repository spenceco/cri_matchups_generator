import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useToken } from '../../back-end/auth/useToken';
import { useQueryParams } from '../util/useQueryParams';

export const LogInPage = () => {
	const [,setToken] = useToken();
	const [errorMessage,setErrorMessage] = useState('');
	const [emailValue,setEmailValue] = useState('');
	const [passwordValue,setPasswordValue] = useState('');
	
	const [googleOauthUrl, setGoogleOauthUrl] = useState('');
	const { token: oauthToken } = useQueryParams();
	
	const navigate = useNavigate();
	
	useEffect(() => {
		if (oauthToken) {
			setToken(oauthToken);
			navigate('/user');
		}
	},[oauthToken, setToken, navigate]);
	
	useEffect(() => {
		const loadOauthUrl = async () => {
			try {
				const response = await axios.get('/auth/google/url');
				const { url } = response.data;
				setGoogleOauthUrl(url);
			} catch (e) {
				console.log(e);
			}
		}
		
		loadOauthUrl();
	},[])
	
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
			<button
				disabled={!googleOauthUrl}
				onClick={() => { window.location.href = googleOauthUrl }}
			>Log in with Google</button>
		</div>
	)
}

export default LogInPage