import React, { StrictMode, useState, useEffect, createContext } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { RoutesContainer } from './RoutesContainer';
import { useUser } from '../auth/useUser';
import NavigationBar from './layout/NavigationBar';
import Footer from './layout/Footer';

import styled from 'styled-components';



export const currentUserContext = createContext(); 



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
	const [currentUser,setCurrentUser] = useState(useUser());
	


	
	return (

	  	<BrowserRouter>
	  		<currentUserContext.Provider value={{ currentUser, setCurrentUser }} >
			    <AppContainer>
			    	<NavigationBar />
					<RoutesContainer />
					<Footer />
				</AppContainer>
			</currentUserContext.Provider>
		</BrowserRouter>

)};



export default App;