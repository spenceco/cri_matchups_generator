import React, { useState } from 'react';
import styled from 'styled-components';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { MdOutlineModeEditOutline } from 'react-icons/md';
import { VscEyeClosed } from 'react-icons/vsc';
import YesNo from '../shared-components/YesNo';
import ReactTooltip from 'react-tooltip';
import { useStateHooks } from '../state/StateContext';
import RemovePerson from './removePerson';

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
    background: ${props => props.hovering ? '#635C51' : '#202030'};
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





const PersonViewer = ({ saveToServer }) => {
	
	const [ personToRemove, setPersonToRemove ] = useState(null);
	const stateHooks = useStateHooks();
	const { matchups,  removePerson, omitPerson, selectPerson } = stateHooks.matchups;
	const { people, selected } = matchups;
	const [hoverElement, setHoverElement] = useState(false);

	const handleMouseOver = (key) => setHoverElement(key);
	const handleMouseOut = () => setHoverElement(null);
	
	return ( people &&
		<PersonViewerContainer>	
		<RemovePerson 	saveToServer={saveToServer} 
						person={personToRemove}
						onRequestClose={() => setPersonToRemove(null)} />
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
						hovering = {person.name == hoverElement ? true : false}
						onClick={() => {
							if(person.omit)
								alert("This person is currently omitted");
							else
								selectPerson(person);
						}}
						onMouseOver={() => handleMouseOver(person.name)} 
						onMouseOut={handleMouseOut}
					>
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
						
						<RiDeleteBin6Line data-tip data-for="removeTip" style={ { width: '25px', height: 'auto' } }  onClick={() => setPersonToRemove(person)}/>


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