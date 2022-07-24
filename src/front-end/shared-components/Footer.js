import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Container = styled.div`
	width: 100%;
	height: 40px;
	margin-top: auto;
	background-color: rgba(0,0,0,0.5);
	display: flex;
	justify-self: center;
	align-items: center;

`;

const TextContainer = styled.div`
	display: flex;
	width: auto;
	margin: auto;
`;

const Text = styled.div`
	color: white;
	margin: auto;
	margin-right: 15px;
	margin-left: 15px;
`;


//const navigate = useNavigate();

const Pipe = () => <Text>|</Text>;


const Footer = () => {
	
	return (
		<Container>
			<TextContainer>
			<Text>© 2022 Spencer Perkins</Text><Pipe />
				<Text>spencerperkinsATL@gmail.com</Text><Pipe />
				<Text>(404)-910-3744</Text><Pipe />
				<Text>www.linkedin.com/in/spencermperkins</Text>
			</TextContainer>
		</Container>
	)
}


export default Footer;
