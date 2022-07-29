import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useToken } from '../../auth/useToken';
import { useUser } from '../../auth/useUser';
import { useQueryParams } from '../../util/useQueryParams';
import styled from 'styled-components';
import { currentUserContext } from '../App';

const GoogleSignInButton = styled.img`
	width: 75%;

`;

const ButtonContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
`;

export const LogInPage = () => {
	const [,setToken] = useToken();
	const [errorMessage,setErrorMessage] = useState('');
	const [emailValue,setEmailValue] = useState('');
	const [passwordValue,setPasswordValue] = useState('');
	const [googleOauthUrl, setGoogleOauthUrl] = useState('');
	const { token: oauthToken } = useQueryParams();
	const user = useUser();
	
	const navigate = useNavigate();
	
	useEffect(() => {
		if (oauthToken) {
			setToken(oauthToken);
			console.log("would set: ");
			console.log(user);
			navigate('/user');
		}
	},[oauthToken, setToken, navigate]);
	
	useEffect(() => {
		const loadOauthUrl = async () => {
			try {
				//console.log('LOGGING IN WITH OAUTH');
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
			try{
				const response = await axios.post('/api/login', {
					email: emailValue,
					password: passwordValue,
				});
				const { token } = response.data;
				setToken(token);
				navigate('/');
			} catch (e) {
				setErrorMessage(e.message);
			}
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
			<ButtonContainer>
				<button
					disabled={!emailValue || !passwordValue} 
					onClick={onLogInClicked}>Log In</button>
				<button
					onClick={() => navigate('/forgot-password')}>Forgot your password?</button>
				<button
					onClick={() => navigate('/signup')}>Dont have an account? Sign up</button>
				<GoogleSignInButton
					disabled={!googleOauthUrl}
					src="/images/btn_google_signin_light_focus_web@2x.png"
					onClick={() => { window.location.href = googleOauthUrl }}
				/>
			</ButtonContainer>

		</div>
	)
}

export default LogInPage