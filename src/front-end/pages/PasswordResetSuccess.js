import { useNavigate } from 'react-router-dom';

export const PasswordResetSuccess = () => {
	const navigate = useNavigate();
	
	return (
		<div className="content-container">
			<p>Your password has been reset. Now please log in with your new password</p>
			<button onClick={() => navigate('/login')}>Log in</button>
		</div>
	)
}