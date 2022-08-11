import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useStateHooks } from '../state/StateContext';
import { EmailVerificationSuccess } from './EmailVerificationSuccess';
import { EmailVerificationFail } from './EmailVerificationFail';


const EmailVerificationLandingPage = () => {
	const [isLoading, setIsLoading] = useState(true);
	const [isSuccess, setIsSuccess] = useState(false);
	const { setToken } = useStateHooks().user;
	const { verificationString } = useParams();
	
	
	useEffect(() => {
		console.log("load verification");
		const loadVerification = async () => {
			try {
				const response = await axios.put('/api/verify-email',{ verificationString });
				const { token } = response.data;
				setToken(token);
				setIsSuccess(true);
				setIsLoading(false);				
			} catch (e) {
				setIsSuccess(false);
				setIsLoading(false);
			}

		}
		
		loadVerification();
	},[])
	
	if (isLoading) return <p>Loading...</p>;
	if (!isSuccess) return <EmailVerificationFail />
	return <EmailVerificationSuccess />;	
}

export default EmailVerificationLandingPage;