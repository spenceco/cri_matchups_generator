import Modal from './Modal';
import { connect } from 'react-redux';
import { deleteSavedMatchup } from './actions';
import { getPeople } from './selectors';
import { useState, useEffect } from 'react';
import styled from 'styled-components';

import { TiDeleteOutline } from 'react-icons/ti';


const ModalBackground = styled.div`
	position: fixed;
	z-index: 1;
	left: 0;
	top: 0;
	width: 100%;
	height: 100%;
	overflow: auto;
	background-color: rgba(0,0,0,0.5);
`;

const ModalBody = styled.div`
    background: #202030;
	margin: 10% auto;
	padding: 20px;
	width: 25%;
	display: flex;
	flex-direction: column;
	align-items: center;
	border-radius: 8px;
	color: white;
`;

const ModalCloseButton = styled.button`
	color: white;
	background-color: red;
	width: 20px;
	height: 20px;
	
`;







const ViewPreviousMeetings = ( { onRequestClose, people, shouldShow }  ) => {
	//console.log(people);
	
	const [selectedWeek,setSelectedWeek] = useState(false);
	const allMeetings = people.map(person =>  {
		return person.alreadyMet.map(met => {
			return ({[met.date]:[person.name,met.name]})
		})
	} );
	
	
	let sortedMeetings = {};
		
	allMeetings.forEach(chunk => {
		chunk.forEach(meeting => {
			const key = Object.keys(meeting)[0];
			const value = meeting[key];
			sortedMeetings.hasOwnProperty(key) ? 
		  		sortedMeetings[key].push(value) :
		  		sortedMeetings[key] = [value];
		  		
		});
	});
	
		
		

	
	
	return shouldShow && (<>
		<ModalBackground onClick={() => onRequestClose()}>
			<ModalBody onClick={e => e.stopPropagation()}>
				<TiDeleteOutline onClick={() => onRequestClose()}
					style={ {
						alignSelf:'flex-end', 
						color: 'white',
						width: '25px',
						height: 'auto',
						} }/>

			<div style={{display:'flex'}}>{Object.keys(sortedMeetings).map(week => <button style={ {borderColor: (week == selectedWeek ? 'white' : 'transparent') } } onClick={() => setSelectedWeek(week)}>{week}</button>)}</div>
			{ selectedWeek ? sortedMeetings[selectedWeek].map(m => (<div>{m[0] + ' + ' + m[1]}</div>) ) : <div>Select a week to view data</div> }
			</ModalBody>
		</ModalBackground>
	</>
	)
}

const mapStateToProps = state => ({
	people: state.matchups.people,

});




export default connect(mapStateToProps,null)(ViewPreviousMeetings);