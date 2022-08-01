import React, { useState } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { omitPerson, editPerson, createPerson, selectPerson, selectPerson2, submitGroup, removePerson, resetDefaultMatchups, generateMatchups, setDate } from './actions';
import { getPeople, getAttendingPeople, getMatchedPeople } from './selectors';
import Modal from './Modal';

import MatchedPairsBox from './MatchedPairsBox';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { MdOutlineModeEditOutline } from 'react-icons/md';
import { VscEyeClosed } from 'react-icons/vsc';
import YesNo from './YesNo';


import EditPersonMenu from '../matchups/EditPersonMenu';

import { useUser } from '../../auth/useUser';
import { useToken } from '../../auth/useToken';

import ReactTooltip from 'react-tooltip';

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

const saveToServer = async (id,token,people) => {
	
	console.log(people);

	try{
		const fetchData = async () => {
		 	const rawResponse = await fetch(`/api/matchups/save/${id}`,
		 	{
			    method: 'POST',
			    headers: {
			      'Accept': 'application/json',
			      'Content-Type': 'application/json',
			      'Authorization': `Bearer ${token}`,
			    },
			    body: JSON.stringify({ people:people }),
			});
			const body = await rawResponse.json();
			if(rawResponse.status != 200)
				alert('Error connecting to database.');
	

		};
		fetchData();
				
	} catch(e) {
		console.log({"error":e});
	}
	
}


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

	const user = useUser();
	const { id, email } = user;
	const [token ,setToken] = useToken();
	

	
	return (
		<PersonViewerContainer>	
		<EditPersonMenu onRequestClose={() => setPersonBeingEdited(null)} person={personBeingEdited} save={() => saveToServer(id,token,people)} />
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
					onClick={() => {
						if(person.omit)
							alert("This person is currently omitted");
						else
							onselectPressed(person);
					}
					}>
					<PersonName>
						{person.name}({person.alreadyMet.length})
					</PersonName>
					<AttendeeOptionsContainer onClick={e => e.stopPropagation()}>
						<VscEyeClosed  data-tip data-for="omitTip" style={ { width: '25px', height: 'auto' } } onClick={() => {
							if(selected.find(s => person.name == s.name))
								alert("Deselect this person before omitting");
							else
								onOmitPressed(person);
						}} />
						<MdOutlineModeEditOutline data-tip data-for="editTip" style={ { width: '25px', height: 'auto' } }  onClick={ () => setPersonBeingEdited(person) } />
						<YesNo element={<RiDeleteBin6Line data-tip data-for="removeTip" style={ { width: '25px', height: 'auto' } }  /> } task={ () => {
							onRemovePressed(person);
							saveToServer(id, token, people.filter(p => p.name !== person.name));
							//saveToServer hook
							alert('saved');
						} }>
							<span>Are you sure you want to remove {person.name} from the team?</span>
						</YesNo>


				      <ReactTooltip id="omitTip" place="top" effect="solid">
				        Omit from this meeting
				      </ReactTooltip>
				      <ReactTooltip id="editTip" place="top" effect="solid">
				        Edit previous matchups
				      </ReactTooltip>
				      <ReactTooltip id="removeTip" place="top" effect="solid">
				        Remove from team
				      </ReactTooltip>
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

	onCreatePressed: person_name => dispatch(createPerson(person_name)),
	onSetDate: date => dispatch(setDate(date)),
});


export default connect(mapStateToProps,mapDispatchToProps)(PersonViewer);