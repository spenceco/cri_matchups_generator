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
	border-radius: 8px;
	background-color: rgba(0,0,0,0.6);
	color: #white;
	padding: 10px;
	display: flex;
	flex-direction: column;
	align-items: center;
	margin-top: 8%;
`;

const RequestResumeButton = styled.button`
	width: auto;
	margin-top: 10px;
`;

const HeaderText = styled.h2`
	margin: 0 0;
`;

const Text = styled.div`
	font-size: 20px;
	text-align: center;
`;


const HomePage = () => {
	

	return (
		<Container>
			<MainPanel>
				<HeaderText>Spencer Perkins</HeaderText>
				<h3>Full-Stack Developer</h3>
				<Text>"Software development can be a lot like chess - adhering to the best practices and principles allow you to advance your pieces toward a clear and concise goal. Compromise the opening and you can compromise the entire game. Build a solid framework, backed with research and practice, while considering all options and possibilities - that is the way to maximize your chances of success."</Text>

			</MainPanel>
		</Container>
	)
}

export default HomePage;