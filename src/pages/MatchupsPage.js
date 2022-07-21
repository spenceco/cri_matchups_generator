import SplitScreen from '../SplitScreen';
import PersonViewer from '../matchups/PersonViewer';
import MatchedPairsBox from '../matchups/MatchedPairsBox';
import React, { useEffect } from 'react';

import { connect } from 'react-redux';
import { loadMatchups } from '../matchups/actions';


const MatchupsPage = ({ onPeopleDataLoaded }) => {

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

		<SplitScreen leftWeight={1} rightWeight={1}>
			<PersonViewer />
			<MatchedPairsBox />
		</SplitScreen>
	)
}

const mapDispatchToProps = dispatch => ({
	onPeopleDataLoaded: peopleData => dispatch(loadMatchups(peopleData)),
});


export default connect(null,mapDispatchToProps)(MatchupsPage);