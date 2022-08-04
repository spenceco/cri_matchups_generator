
import { BrowserRouter } from 'react-router-dom';
import { RoutesContainer } from './RoutesContainer';
import { useStateHooks } from './state/StateContext';
import NavigationBar from './layout/NavigationBar';
import Footer from './layout/Footer';
import styled from 'styled-components';
import { useEffect } from 'react';

const AppContainer = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	align-items: center;
	background-color: black;
	background-image: url(/public/images/chess3.jpg);
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
	
const stateHooks = useStateHooks();
const user = stateHooks.user;
const [ profile, setProfileData ] = stateHooks.profile;

useEffect(() => {
	console.log("DID MOUNT");
	setProfileData(user);
},[])
	
	return (

	  	<BrowserRouter>

					<AppContainer>
						<NavigationBar />
						<RoutesContainer />
						<Footer />
					</AppContainer>

		</BrowserRouter>

)};



export default App;