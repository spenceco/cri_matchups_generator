import React, { useState } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { omitPerson, editPerson, createPerson, selectPerson, selectPerson2, submitGroup, removePerson, resetDefaultMatchups, deleteSavedMatchup } from './actions';
import { getPeople, getAttendingPeople, getMatchedPeople } from './selectors';
import Modal from './Modal';

import MatchedPairsBox from './MatchedPairsBox';


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

const CreateButton = styled.button`

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
	flex-direction: column;
	justify-content: center;
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



const NewPersonInput = styled.input`
	
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

const PersonViewer = ({ people, attending, selected, matched, onSubmitGroupPressed, onCreatePressed, onRemovePressed, onOmitPressed, onselectPressed, onResetPressed, onDeleteSavedMatchupPressed}) => {
	const [inputValue, setInputValue] = useState('');
	return (
		<PersonViewerContainer>	
		<MeetingContainer>
			<AttendingPersonList>
				<HeaderContainer>
					<Modal buttonName="Show Remaining">{
					
						people.map(person => <div key={person.name}>{person.name}: <div>{people.map(p => {
							if(person.alreadyMet.map(met => met.name).includes(p.name))
								return;
							return p.name + ' ';
						})}</div></div>)
					}
					</Modal>
					<Modal buttonName="Reset">
						<div>Are you sure you want to reset matchup data?</div>
						<Button onClick={() => onResetPressed()}>Reset</Button>
					</Modal>
					
					<Modal buttonName="Add New">
						<NewPersonInput
								name="new_person"
								type="text"
								value={inputValue}
								onChange={e => setInputValue(e.target.value)}
								placeholder="Type your new person name here" />
						<CreateButton onClick={() => {
							onCreatePressed(inputValue);
							setInputValue('');
						}}>Add New</CreateButton>
					
					</Modal>
					<SubmitGroupButton onClick={() => onSubmitGroupPressed()}>Submit Group</SubmitGroupButton>
				</HeaderContainer>
				<hr />
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
						<OmitButton  onClick={(e) => {console.log( person  )}}>Omit</OmitButton>
						<Modal buttonName="Edit">{
							(person.hasOwnProperty("alreadyMet") && person.alreadyMet.length) ? 
								<div>{person.alreadyMet.map(p => <button key={p.name}>{p.name}</button> )  }</div> : 
								<div>No matchups to edit.</div>
						}</Modal>
						<Modal buttonName="Remove">
							<div>Remove from roster? </div>
							<RemoveButton onClick={(e) => {onRemovePressed(person);}}>Remove</RemoveButton>
						</Modal>
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
	onOmitPressed: name => dispatch(omitPerson(name)),
	onselectPressed: person => dispatch(selectPerson2(person)),
	onResetPressed: () => dispatch(resetDefaultMatchups()),
	onSubmitGroupPressed: () => dispatch(submitGroup()),
	onCreatePressed: person_name => dispatch(createPerson(person_name)),
	onDeleteSavedMatchupPressed: (first_person, second_person) => dispatch(deleteSavedMatchup(first_person, second_person)),
});


export default connect(mapStateToProps,mapDispatchToProps)(PersonViewer);