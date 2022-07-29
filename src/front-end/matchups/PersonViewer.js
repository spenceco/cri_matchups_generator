import React, { useState } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { omitPerson, editPerson, createPerson, selectPerson, selectPerson2, submitGroup, removePerson, resetDefaultMatchups, generateMatchups, setDate } from './actions';
import { getPeople, getAttendingPeople, getMatchedPeople } from './selectors';
import Modal from './Modal';

import MatchedPairsBox from './MatchedPairsBox';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { MdOutlineModeEditOutline } from 'react-icons/md';
import { FaRegEye } from 'react-icons/fa';
import YesNo from './YesNo';


import EditPersonMenu from '../matchups/EditPersonMenu';



const AttendingPersonList = styled.div`
    border-radius: 8px;
    width: 30%;
    min-width: 325px;
    height: 600px;
    padding: 0 2px 0 2px;
	margin: auto;
	margin-right: 0px;
	display: flex;
	flex-direction: column;

`;


const AttendeeContainer = styled.div`
    background: #202030;
    cursor: pointer;
    font-size: 20px;
    color: ${props => props.person.omit ? '#bbbbbb' : 'white'};
	margin-top: 2px;
    min-height: 25px;
    border-radius: 8px;
    padding: 3px;
    position: relative;
	display: flex;
	flex-shrink: 0;
	justify-content: space-between;
	overflow: hidden;
	box-shadow: 0 4px 8px grey;
	border: ${props => (	!props.selected.length ? '2px solid transparent' : ( props.selected.some(person => props.person.name === person.name) ? '2px solid yellow' : (props.selected.some(selected_person => selected_person.alreadyMet.some(met_person => met_person.name === props.person.name ) ) ? '2px solid red' : '2px solid green') )   )};
`;	

const PersonViewerContainer = styled.div`
	width: 100%;
	display: flex;
	justify-content: end;
	margin-bottom: 2px;
`;



const Button = styled.button`
    font-size: 8px;
    padding: 0px;
    border: 1px solid #bbbbbb;
    border-radius: 8px;
    outline: none;
    cursor: pointer;
    display: inline-block;
    height: 20px;

`;



const SubmitGroupButtonContainer = styled.div`

	grid-area: submit-group-container;
	align-self: center;
`;

const SubmitGroupButton = styled.button`

`;

const AttendeeOptionButton = styled.button `

	
`;



const RemoveButton = styled(AttendeeOptionButton)`
	
`;

const OmitButton = styled(AttendeeOptionButton)`

`;

const EditButton = styled(AttendeeOptionButton)`

`;


const HeaderContainer = styled.div`
	width : 100%;
	display: flex;
`;

const AttendeesContainer = styled.div`

	  display: flex;
	  width: 100%;
	  flex-direction: column;
	  overflow-y: scroll;
`;

const MeetingContainer = styled.div`
	width: 100%;

`;

const PersonName = styled.div`
	display: flex;
	justify-content: center;
	
`;

const AttendeeOptionsContainer = styled.div`
	display: flex;
	justify-content: end;

`;



const ShowRemainingButton = styled.button`


`;

const TeamList = ({ people, onOmitPressed, onRemovePressed }) => {
	return (
		<div>
			{ people.map(person => (<TeamMemberContainer 	person={person} 
															key={person.name}
															
															>
										{person.name}
										<OmitButton  onClick={() => onOmitPressed(person)}>Omit</OmitButton>
										<RemoveButton onClick={() => onRemovePressed(person)}>Remove</RemoveButton>
									</TeamMemberContainer>))}
		</div>
	);
}

const PersonViewer = ({ people, attending, selected, matched, onSubmitGroupPressed, onCreatePressed, onRemovePressed, onOmitPressed, onselectPressed, onResetPressed, onDeleteSavedMatchupPressed, onAutoPressed, onSetDate }) => {
	
	const [personBeingEdited,setPersonBeingEdited] = useState(false);

	

	
	return (
		<PersonViewerContainer>	
		<EditPersonMenu onRequestClose={() => setPersonBeingEdited(null)} person={personBeingEdited} />
		<MeetingContainer>
			<AttendingPersonList>
				<HeaderContainer>

					<div style={ {display:'flex',flexDirection:'flex-end'} }>

					</div>
				</HeaderContainer>

				<AttendeesContainer>
					{
					people.map(person =>  person.matchedWith.length ? null : <AttendeeContainer
					person = {person} 
					key = {person.name}
					selected = {selected}
					onClick={() => onselectPressed(person)
					}>
					<PersonName>
						{person.name}({person.alreadyMet.length})
					</PersonName>
					<AttendeeOptionsContainer onClick={e => e.stopPropagation()}>
						<FaRegEye  style={ { width: '25px', height: 'auto' } } alt="Omit from Meeting" onClick={() => onOmitPressed(person)} />
						<MdOutlineModeEditOutline style={ { width: '25px', height: 'auto' } } alt="Edit Team Member" onClick={ () => setPersonBeingEdited(person) } />
						<YesNo element={<RiDeleteBin6Line style={ { width: '25px', height: 'auto' } } alt="Delete Team Member" /> } task={ () => onRemovePressed(person) }>
							<span>Are you sure you want to remove {person.name} from the team?</span>
						</YesNo>
					</AttendeeOptionsContainer>
					</AttendeeContainer> )}
				</AttendeesContainer>
			</AttendingPersonList>
		</MeetingContainer>
		</PersonViewerContainer>
	);
	
}
	
const mapStateToProps = state => ({
	people: getPeople(state),
	attending: getAttendingPeople(state),
	selected: state.matchups.selected,
//	matched: getMatchedPeople(state),
});


const mapDispatchToProps = dispatch => ({
	onRemovePressed: name => dispatch(removePerson(name)),
	onAutoPressed: () => dispatch(generateMatchups()),
	onOmitPressed: name => dispatch(omitPerson(name)),
	onselectPressed: person => dispatch(selectPerson2(person)),
	onResetPressed: () => dispatch(resetDefaultMatchups()),
	onSubmitGroupPressed: () => dispatch(submitGroup()),
	onCreatePressed: person_name => dispatch(createPerson(person_name)),
	onSetDate: date => dispatch(setDate(date)),
});


export default connect(mapStateToProps,mapDispatchToProps)(PersonViewer);