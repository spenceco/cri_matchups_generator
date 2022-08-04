import { useState } from 'react';
import styled from 'styled-components';
import { useStateHooks } from '../state/StateContext';
import { TiDeleteOutline } from 'react-icons/ti';

const MatchedPairsBoxContainer = styled.div`



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
    background: #202030;
	margin-top: 2px;
	box-shadow: 0 4px 8px grey;
	border-radius: 8px;
	display: flex;
	justify-content: space-between;
	padding: 3px;
    cursor: pointer;
    font-size: 20px;
    color: white;
    min-height: 50px;

`;


const RemoveGroupButton = styled(Button)`
	background: #bb0000;
	color: #eeeeee;
	width 20px;
	align-self: start;


`;

const NamesContainer = styled.div`
	background: none;
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



const DateInput = styled.input`

	margin: auto;
	margin-left: 0px;

`;

const DateInputContainer = styled.div`
	width: 100%;
	display: flex;
`;



const MatchedPairsBox = () => {

	const stateHooks = useStateHooks();
	const { matchups, removeGroup } = stateHooks.matchups;
	const { people, selected } = matchups;


	const [shouldShowModal, setShouldShowModal] = useState();
	const [inputValue, setInputValue] = useState("");

	
	const groupsNoDuplicates = () => {
		if(!people || !people.length) return [];
		const matchedPeople = people.filter(person => person.matchedWith.length) ;
		const groups = matchedPeople.map(person => person.matchedWith.map(matched_person => matched_person ? matched_person.name : null));
		const groups_no_duplicates = Array.from(new Set(groups.map(JSON.stringify)), JSON.parse);
		console.log(groups_no_duplicates)
		return groups_no_duplicates;
	};


	return ( people && 
		<MatchedPairsBoxContainer>

			<GroupsContainer>
				{groupsNoDuplicates().map(group => <GroupContainer key={group.join('|')}><NamesContainer>{group.map(name => <div key={name} selected={selected}>{name}</div>)}</NamesContainer><TiDeleteOutline style={{ width: '25px', height: 'auto' }} onClick={() => removeGroup(group)} /></GroupContainer>)}
			</GroupsContainer>
		</MatchedPairsBoxContainer>
	);
}



export default MatchedPairsBox;