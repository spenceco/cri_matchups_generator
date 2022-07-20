import PersonViewer from './matchups/PersonViewer';
import Modal from './matchups/Modal.js';
import { SplitScreen } from './SplitScreen';
import MatchedPairsBox from './matchups/MatchedPairsBox';

import React, { StrictMode, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { createRoot } from "react-dom/client";
import { hot } from 'react-hot-loader';
import styled from 'styled-components';

import { connect } from 'react-redux';
import { loadMatchups } from './matchups/actions';




const AppContainer = styled.div`
	margin: 1px;
	font-family: Arial, Helvetica, sans-serif;
	color:#222222;
	display: flex;
	justify-content: center;
	align-items: center;
	
`;


			


const App = ({ onPeopleDataLoaded }) => {
	
	useEffect(() => {
		const fetchData = async () => {
				try{
					await fetch('/api/matchups')
					.then(response => response.json())
					.then(response => {
						const peopleData = response[0].people;
						//console.log(peopleData);
						if(peopleData)
							onPeopleDataLoaded(peopleData);
					})					
				} catch(e) {
					console.log({"error" : e});
				}

		};
		fetchData();
	},[]);	
	
	return (
  <StrictMode>
    <AppContainer>
		<SplitScreen leftWeight={1} rightWeight={1}>
			<PersonViewer />
			<MatchedPairsBox />
		</SplitScreen>
	

	</AppContainer>
  </StrictMode>
)};

const mapDispatchToProps = dispatch => ({
	onPeopleDataLoaded: peopleData => dispatch(loadMatchups(peopleData)),
});


export default connect(null,mapDispatchToProps)(App);