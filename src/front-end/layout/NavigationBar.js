import styled from 'styled-components';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useStateHooks } from '../state/StateContext';

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
	const stateHooks = useStateHooks();
	const [ profileData, setProfileData, removeProfileData] = stateHooks.profile;
	const [token,setToken,removeToken] = stateHooks.token;

	const navigate = useNavigate();
    const logOut = () => {
        removeToken();
		removeProfileData();
        navigate('/login');
    }
   


	return (
		<Container>
			<Link to="/"><NavigationBarButton>HOME</NavigationBarButton></Link>
			<Link to="/about"><NavigationBarButton>ABOUT</NavigationBarButton></Link>
			{ profileData && Object.keys(profileData).length ? <NavigationBarButton onClick={logOut}>LOG OUT ({profileData.email})</NavigationBarButton> : 
					<Link to="/login"><NavigationBarButton>LOG IN</NavigationBarButton></Link>
			}	
	
		</Container>
	)
}


export default NavigationBar;
