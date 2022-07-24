import React, { StrictMode } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { RoutesContainer } from './RoutesContainer';

import NavigationBar from './shared-components/NavigationBar';
import Footer from './shared-components/Footer';

import styled from 'styled-components';


const destinations = [
	{name: 'HOME', path: '/'}, 
	{name: 'ABOUT',path: '/about'},
	{name: 'CONTACT' , path: '/contact'},
	{name: 'LOG IN' , path: '/login'},
];

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
	
	return (
	<StrictMode>
	  	<BrowserRouter>
		    <AppContainer>
		    	<NavigationBar destinations={destinations} />

				<RoutesContainer />
				<Footer />
			</AppContainer>
		</BrowserRouter>
	</StrictMode>
)};



export default App;