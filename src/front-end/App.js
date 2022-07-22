import React, { StrictMode } from 'react';
import { RoutesContainer } from './Routes';

import styled from 'styled-components';




const AppContainer = styled.div`
	margin: 1px;
	font-family: Arial, Helvetica, sans-serif;
	color:#222222;
	display: flex;
	justify-content: center;
	align-items: center;
	
`;


			


const App = () => {
	
	return (
  <StrictMode>
    <AppContainer>
		<RoutesContainer />
	</AppContainer>
  </StrictMode>
)};



export default App;