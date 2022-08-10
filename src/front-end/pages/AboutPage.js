import axios from 'axios';
import Modal from '../matchups/Modal';
import { useState } from 'react';



const onSignUpClicked = async (emailValue) => {
	try{
		const response = await axios.post('/api/request-resume', {
			email: emailValue,
		});
			alert("Request sent");
	} catch(e) {
		alert("Something went wrong");
	}

}


const AboutPage = () => {
	const [emailValue,setEmailValue] = useState("");
	return (
		<>
			<div className="panel">
				<h2>About Me</h2>
				<p>I am a self-taught software developer, possessing an interest in various forms of code since an early age. I enjoy creating digital solutions to real problems and challenges, leveraging the massive potential of the computer to make life simpler and more enriching. I also have an interest in chess, music, mixology, and gardening.</p>
				<br />
				<Modal buttonName="Request Resume">
					<p>Please enter an email address:</p>
					<input type='text' value={emailValue} placeholder="someone@gmail.com" onChange={e => setEmailValue(e.target.value)} />
					<button onClick={() => onSignUpClicked(emailValue) }>Send Request</button>
				</Modal>
			</div>
		</>
	)
}

export default AboutPage;