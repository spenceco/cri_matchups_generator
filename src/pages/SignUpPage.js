import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const SignUpPage = () => {
	const [errorMessage,setErrorMessage] = useState('');
	const [emailValue,setEmailValue] = useState('');
	const [passwordValue,setPasswordValue] = useState('');
	const [confirmPasswordValue,setConfirmPasswordValue] = useState('');
	
	const navigate = useNavigate();
	
	const onSignUpClicked = async () => {
		alert('Sign up not implemented yet!');
	}
	
	
	return (
		<div className="content-container">
			<h1>Sign Up</h1>
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
			<input
				value={confirmPasswordValue}
				onChange={e => setConfirmPasswordValue(e.target.value)}
				placeholder="password"
				type="password" />
			<hr />
			<button
				disabled={!emailValue || !passwordValue ||
					passwordValue !== confirmPasswordValue
				} 
				onClick={onSignUpClicked}>Sign Up</button>
			<button
				onClick={() => navigate('/login')}>Already have an account? Log in</button>
		</div>
	)
}

export default SignUpPage