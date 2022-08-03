import SplitScreen from '../layout/SplitScreen';
import PersonViewer from '../matchups/PersonViewer';
import MatchedPairsBox from '../matchups/MatchedPairsBox';
import React, { useEffect, Suspense } from 'react';
import { useUser } from '../../auth/useUser';
import { useToken } from '../../auth/useToken';
import ActionBar from '../matchups/ActionBar';
import styled from 'styled-components';
import { useStateHooks } from '../state/StateContext';


const Container = styled.div`
	background-color: #B0A990;
	border-radius: 8px;
	margin-top: auto;
	padding: 5px;
`;




const MatchupsPage = () => {
	
	const user = useUser();
	const { id } = user;
	const [token , setToken] = useToken();
	const { matchups,loadMatchups } = useStateHooks().matchups;
	const { people } = matchups;

	useEffect(() => {
		const fetchData = async () => {
				try{
					await fetch(`/api/matchups/${id}`,{
						headers: { Authorization: `Bearer ${token}` }
	        		})
					.then(response => response.json())
					.then(response => {
						const peopleData = response.people;
						console.log('peopleData');
						console.log(peopleData);
						if(peopleData)
							loadMatchups(peopleData);
					})					
				} catch(e) {
					console.log({"error" : e});
				}

		};
		fetchData();
	},[]);	

	return ( people && 
			<Container>
					<ActionBar />
					<SplitScreen leftWeight={1} rightWeight={1}>
						<PersonViewer />
						<MatchedPairsBox />
					</SplitScreen>
			</Container>
	)
}

export default MatchupsPage;