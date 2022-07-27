import React, { StrictMode, useState, useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { RoutesContainer } from './RoutesContainer';
import { useUser } from '../auth/useUser';
import NavigationBar from './layout/NavigationBar';
import Footer from './layout/Footer';

import styled from 'styled-components';





const AppContainer = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	align-items: center;
	background-color: black;
	background-image: url(/images/chess3.jpg);
	background-size: 100%;
	height: 100%;
	width: 100%;
	position: fixed;
	
`;

const BackgroundImage = styled.img`
	width: auto;
	height: 50%;
`;
const App = () => {
	const user = useUser();
	const [isLoggedIn,setIsLoggedIn] = useState(false);
	
	useEffect(() => {
		if(user){
			console.log(user);
			setIsLoggedIn(true);	
		}
		else
			console.log('no user');
	},[])

	
	return (
	<StrictMode>
	  	<BrowserRouter>
		    <AppContainer>
		    	<NavigationBar isLoggedIn={isLoggedIn} setIsLoggedIn={(bool) => setIsLoggedIn(bool)} />
				<RoutesContainer setIsLoggedIn={(bool) => setIsLoggedIn(bool)} />
				<Footer />
			</AppContainer>
		</BrowserRouter>
	</StrictMode>
)};



export default App;