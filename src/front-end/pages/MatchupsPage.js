import SplitScreen from '../layout/SplitScreen';
import PersonViewer from '../matchups/PersonViewer';
import MatchedPairsBox from '../matchups/MatchedPairsBox';
import React, { useEffect } from 'react';
import ActionBar from '../matchups/ActionBar';
import styled from 'styled-components';
import { useStateHooks } from '../state/StateContext';


const Container = styled.div`
	background-color: #B0A990;
	border-radius: 8px;
	margin-top: auto;
	padding: 0;
	overflow-x: hidden;
	display: flex;
	flex-direction: column;
	align-items: center;
`;


const MatchupsPage = () => {
	const stateHooks = useStateHooks();
	const { user, token, setToken } = stateHooks.user;
	const { matchups,loadMatchups } = stateHooks.matchups;
	const { people } = matchups;

	const saveToServer = async () => {

		console.log(people);

		const scrubbedPeople = people.map(person => ({ ...person, matchedWith: [], selected: false, omit: false, injected: true }));
		try{
			const fetchData = async () => {
				 const rawResponse = await fetch(`/api/matchups/save/${user.id}`,
				 {
					method: 'POST',
					headers: {
					  'Accept': 'application/json',
					  'Content-Type': 'application/json',
					  'Authorization': `Bearer ${token}`,
					},
					body: JSON.stringify({ people:scrubbedPeople }),
				});
				const body = await rawResponse.json();
				if(rawResponse.status != 200){
					alert('Error connecting to database.');
				}
				else
					alert('Saved');
			};
			fetchData();
					
		} catch(e) {
			console.log({"error":e});
		}
		
	}
	


	useEffect(() => {
		const fetchData = async () => {
				try{
					await fetch(`/api/matchups/${user.id}`,{
						headers: { Authorization: `Bearer ${token}` }
	        		})
					.then(response => response.json())
					.then(response => {
						const peopleData = response.people;
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
					<ActionBar saveToServer={saveToServer} />
					<SplitScreen leftWeight={1} rightWeight={1}>
						<PersonViewer saveToServer={saveToServer}/>
						<MatchedPairsBox />
					</SplitScreen>
			</Container>
	)
}

export default MatchupsPage;