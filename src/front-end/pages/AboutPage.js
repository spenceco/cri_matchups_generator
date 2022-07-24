import styled from 'styled-components';

const Container = styled.div`
	margin-top: 5%;
	color: white;
	display: flex;
	background-color: none;
	width: 100%;
	justify-content: center;
`;

const MainPanel = styled.div`
	width: 50%;
	border-radius: 5px;
	background-color: rgba(0,0,0,0.6);
	border: 2px solid #dddddd;
	color: #white;
	padding: 10px;
	display: flex;
	flex-direction: column;
	align-items: center;
	margin-top: 8%;
`;

const RequestResumeButton = styled.button`
	border: 2px solid white;
	border-radius: 5px;
	color: white;
	background-color: transparent;
	width: auto;
	margin-top: 10px;
`;

const HeaderText = styled.h2`
	margin: 5px 5px;
`;

const Text = styled.div`
	font-size: 20px;
	text-align: center;
`;


const HomePage = () => {
	return (
		<Container>
			<MainPanel>
				<HeaderText>About Me</HeaderText>
				<Text>I am a self-taught software developer with more than 15 years experience in coding. I enjoy creating digital solutions to real problems and challenges, leveraging the massive potential of the computer to make life simpler and more enriching. I also have an interest in chess, music, mixology, and gardening.</Text>
				<RequestResumeButton>Request Resume</RequestResumeButton>
			</MainPanel>
		</Container>
	)
}

export default HomePage;