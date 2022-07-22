import { useNavigate } from 'react-router-dom';

export const EmailVerificationFail = () => {
	const navigate = useNavigate();
	
	return (
		<div className="content-container">
		<h1>Uh oh...</h1>
			<p>Something went wrong when trying to verify your email</p>
			<button onClick={() => navigate('/signup')}>Back to the signup page</button>
		</div>
	)
}