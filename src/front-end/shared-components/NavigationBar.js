import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Container = styled.div`
	width: 100%;
	height: 40px;

	top: 0;
	left: 0;
	overflow: auto;
	background-color: rgba(0,0,0,0.6);
	display: flex;
	justify-content: flex-start;
	align-items: center;
	padding-left: 100px;
`;

const NavigationBarButton = styled.div`
	background-color: transparent;
	margin-right: 25px;
	border: none;
	width: auto;
	color: white;
`;


//const navigate = useNavigate();

const NavigationBar = ({ destinations }) => {
	
	return (
		<Container>
			{ destinations.map(({ name, path }) => {
				return <Link
					to={path}
				><NavigationBarButton>{name}</NavigationBarButton></Link>
			}) }
		</Container>
	)
}


export default NavigationBar;
