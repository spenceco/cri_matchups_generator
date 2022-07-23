import { useNavigate } from 'react-router-dom';

export const PasswordResetFail = () => {
	const navigate = useNavigate();
	
	return (
		<div className="content-container">
			<p>Something went wrong while trying to reset your password.</p>
			<button onClick={() => navigate('/login')}>Log in</button>
		</div>
	)
}