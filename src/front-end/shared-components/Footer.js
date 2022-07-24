import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Container = styled.div`
	width: 100%;
	height: 40px;
	margin-top: auto;
	background-color: rgba(0,0,0,0.5);
	display: flex;
	justify-self: flex-end;
	justify-content: flex-start;
	align-items: center;
	padding-left: 100px;
`;

const NavigationBarButton = styled.div`
	background-color: transparent;
	margin-right: 25px;
	border: none;
	width: 75px;
	color: black;
`;


//const navigate = useNavigate();

const Footer = ({ destinations }) => {
	
	return (
		<Container />
	)
}


export default Footer;
