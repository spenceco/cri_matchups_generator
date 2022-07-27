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

const TextStyle = styled.div`
	color: white;
	margin: auto;
	font-weight: bold;
`;


//const navigate = useNavigate();

const PipeContainer = styled.span`
	margin-right: 30px;
	margin-left: 30px;
	color: white;
	font-weight: bold;
`;




const Footer = () => {
	
	return (
		<Container>
			<TextContainer>
				<TextStyle>© 2022 Spencer Perkins</TextStyle><PipeContainer>|</PipeContainer>
				<TextStyle>spencerperkinsATL@gmail.com</TextStyle><PipeContainer>|</PipeContainer>
				<TextStyle>(404)-910-3744</TextStyle><PipeContainer>|</PipeContainer>
				<TextStyle>www.linkedin.com/in/spencermperkins</TextStyle>
			</TextContainer>
		</Container>
	)
}


export default Footer;
