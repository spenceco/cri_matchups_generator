import SplitScreen from '../layout/SplitScreen';
import PersonViewer from '../matchups/PersonViewer';
import MatchedPairsBox from '../matchups/MatchedPairsBox';
import React, { useEffect, Suspense } from 'react';
import { useUser } from '../../auth/useUser';
import { useToken } from '../../auth/useToken';
import { connect } from 'react-redux';
import { loadMatchups } from '../matchups/actions';
import ActionBar from '../matchups/ActionBar';



import styled from 'styled-components';



const Container = styled.div`
	background-color: #B0A990;
	border-radius: 8px;
	margin-top: auto;
	padding: 5px;
`;




const MatchupsPage = ({ onPeopleDataLoaded, onSaveClicked, onClearClicked, people, date }) => {
	
	const user = useUser();
	const { id } = user;
	const [token , setToken] = useToken();

	useEffect(() => {
		const fetchData = async () => {
				try{
					await fetch(`/api/matchups/${id}`,{
						headers: { Authorization: `Bearer ${token}` }
	        		})
					.then(response => response.json())
					.then(response => {
						const peopleData = response.people;

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
			<Container>
				
					<ActionBar onSaveClicked={onSaveClicked} onClearClicked={onClearClicked} date={date} people={people} />
					<SplitScreen leftWeight={1} rightWeight={1}>
						<PersonViewer />
						<MatchedPairsBox />
					</SplitScreen>
			</Container>
	)
}

const mapDispatchToProps = dispatch => ({
	onPeopleDataLoaded: peopleData => dispatch(loadMatchups(peopleData)),
	onSaveClicked: people => dispatch(saveMeeting(people)),
	onClearClicked: () => dispatch(clearMatchups()),
});

const mapStateToProps = state => ({
	date: state.matchups.date,
	people: state.matchups.people,
});


export default connect(mapStateToProps,mapDispatchToProps)(MatchupsPage);