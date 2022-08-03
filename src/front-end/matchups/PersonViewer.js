import React, { useState } from 'react';
import styled from 'styled-components';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { MdOutlineModeEditOutline } from 'react-icons/md';
import { VscEyeClosed } from 'react-icons/vsc';
import YesNo from './YesNo';
import { useUser } from '../../auth/useUser';
import { useToken } from '../../auth/useToken';
import ReactTooltip from 'react-tooltip';
import { useStateHooks } from '../state/StateContext';

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
    color: ${props => props.person && props.person.omit ? '#bbbbbb' : 'white'};
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
	border: ${props => ( props.selected &&	!props.selected.length ? '2px solid transparent' : ( props.selected.some(person => props.person.name === person.name) ? '2px solid yellow' : (props.selected.some(selected_person => selected_person.alreadyMet.some(met_person => met_person.name === props.person.name ) ) ? '2px solid red' : '2px solid green') )   )};
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



const PersonViewer = () => {
	
	const [personBeingEdited,setPersonBeingEdited] = useState(false);

	const user = useUser();
	const { id } = user;
	const [token] = useToken();
	
	const { matchups,  removePerson, omitPerson, selectPerson } = useStateHooks().matchups;
	const { people, selected } = matchups;
	
	return ( people &&
		<PersonViewerContainer>	
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
							selectPerson(person);
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
								omitPerson(person);
						}} />
						
						<YesNo element={<RiDeleteBin6Line data-tip data-for="removeTip" style={ { width: '25px', height: 'auto' } }  /> } task={ () => {
							removePerson(person);
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
	


export default PersonViewer;