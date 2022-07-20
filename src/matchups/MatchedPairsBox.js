import React, { useState } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { removeGroup, saveMeeting, generateMatchups, clearMatchups } from './actions';
import { getPeople } from './selectors';
import  Modal  from './Modal';
import ControlledModal from './ControlledModal';

const MatchedPairsBoxContainer = styled.div`

    background: #ddddee;

    font-size: 20px;
    height: 600px;
    width: 200px;
    border-radius: 8px;
    margin-top: 0px;
    padding: 0 2px 0 2px;
    position: relative;
    overflow: auto;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

`;

const Button = styled.button`
    font-size: 16px;
    padding: 5px;
    border: 1px solid #bbbbbb;
    border-radius: 8px;
    outline: none;
    cursor: pointer;
    display: inline-block;
    margin: 2px;
    background: #eeeeee;

`;



const GroupContainer = styled.div`
	background: #efefef;
	margin-top: 4px;
	box-shadow: 0 4px 8px grey;
	border-radius: 8px;
	display: flex;
	justify-content: space-between;
	padding: 2px;

`;

const RemoveGroupButton = styled(Button)`
	background: #bb0000;
	color: #eeeeee;
	width 20px;
	align-self: start;


`;

const NamesContainer = styled.div`
	background: none;
	font-size: 14px;
	margin-bottom: auto;
`;

const Header = styled.h3`
	background: none;
`;

const GroupsContainer = styled.div`
 	margin-bottom: auto;
`;

const HeaderContainer = styled.div`
	width : 100%;
	display: flex;
	flex-shrink: 0;
	justify-content: center;
`;

const SaveButton = styled.button`

`;

const ClearButton = styled.button`

`;

const AutoButton = styled.button`
	width: 100%;
	align-self: center;
`;

const DateInput = styled.input`

	margin: auto;
	margin-left: 0px;

`;

const DateInputContainer = styled.div`
	width: 100%;
	display: flex;
`;



const MatchedPairsBox = ({ people, selected, onRemoveClicked, onSaveClicked, onAutoClicked, onClearClicked }) => {
	const matchedPeople = people.filter(person => person.matchedWith.length);


	const groups = matchedPeople.map(person => person.matchedWith.map(matched_person => matched_person ? matched_person.name : null));
	const groups_no_duplicates = Array.from(new Set(groups.map(JSON.stringify)), JSON.parse);
	
	const [shouldShowModal,setShouldShowModal] = useState();
	const [inputValue, setInputValue] = useState("");

	return (
		<MatchedPairsBoxContainer>
		<ControlledModal 
			buttonName="Save"
    		shouldShow={shouldShowModal}
    		onRequestClose={() => {
	    		setShouldShowModal(false);}}
			>
			<DateInputContainer>
			<div>Date of meeting: </div>
				<DateInput
						name="meeting_name"
						type="text"
						value={inputValue}
						onChange={e => setInputValue(e.target.value)}
						placeholder="MM/DD/YY" />
			
			</DateInputContainer>
			<div>{JSON.stringify({[inputValue]:groups_no_duplicates})}</div>
			<button onClick={() => {
				if(!inputValue)
					alert('Please enter a date for this meeting.');
				else{
					onSaveClicked();
					setInputValue('');
					setShouldShowModal(false);	
				}
			}}>Save</button>
		</ControlledModal>
		<HeaderContainer><Header>Groups:</Header></HeaderContainer>
		<AutoButton onClick={() => onAutoClicked()}>Auto</AutoButton>
		<SaveButton onClick={() => setShouldShowModal(true)}>Save</SaveButton>
		<ClearButton onClick={() => onClearClicked()}>Clear</ClearButton>
		<GroupsContainer>
			{groups_no_duplicates.map(group => <GroupContainer key={group.join('|')}><NamesContainer>{group.map(name => <div key={name} selected={selected}>{name}</div>)}</NamesContainer><RemoveGroupButton onClick={() => onRemoveClicked(group)}>x</RemoveGroupButton></GroupContainer>)}
		</GroupsContainer>
		</MatchedPairsBoxContainer>
	);
}

const mapStateToProps = state => ({
	people: getPeople(state),
	selected: state.matchups.selected
});

const mapDispatchToProps = dispatch => ({
	onRemoveClicked: group => dispatch(removeGroup(group)),
	onSaveClicked: () => dispatch(saveMeeting()),
	onAutoClicked: () => dispatch(generateMatchups()),
	onClearClicked: () => dispatch(clearMatchups()),
});

export default connect(mapStateToProps,mapDispatchToProps)(MatchedPairsBox);