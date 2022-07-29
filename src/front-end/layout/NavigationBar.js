import styled from 'styled-components';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useContext, useEffect } from 'react';
import { currentUserContext } from '../App';
import { useUser } from '../../auth/useUser';
import { useToken } from '../../auth/useToken';

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





const NavigationBar = () => {
	const user = useUser();
	const navigate = useNavigate();
	const { currentUser, setCurrentUser } = useContext(currentUserContext);
    const logOut = () => {
        localStorage.removeItem('token');
        setCurrentUser(null);
        navigate('/login');
    }
   
    useEffect(() => {
	    console.log('navigate');
	    console.log(user);
	   // setCurrentUser(user);
    },[navigate]);
    //console.log(currentUser);
	

	return (
		<Container>
			<Link to="/"><NavigationBarButton>HOME</NavigationBarButton></Link>
			<Link to="/about"><NavigationBarButton>ABOUT</NavigationBarButton></Link>
			{currentUser ? <NavigationBarButton onClick={logOut}>LOG OUT ({currentUser.email})</NavigationBarButton> : 
					<Link to="/login"><NavigationBarButton>LOG IN</NavigationBarButton></Link>
			}	
	
		</Container>
	)
}


export default NavigationBar;
