import Modal from './Modal';
import { connect } from 'react-redux';
import { resetDefaultMatchups, createPerson } from './actions';
import { getPeople } from './selectors';
import { useState, useContext } from 'react';
import styled from 'styled-components';

import { ActionBarContext } from '../matchups/ActionBar';

import { TiDeleteOutline } from 'react-icons/ti';

import UploadFromJson from './uploadFromJson';

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
`;

const ModalCloseButton = styled.button`
	color: white;
	background-color: red;
	width: 20px;
	height: 20px;
	
`;







const SettingsMenu = ( { shouldShow, onRequestClose, people, onCreatePressed, onResetPressed }  ) => {
	
	const [inputValue, setInputValue] = useState('');
	const { setShouldShowRemainingMatchups, setShouldShowAddNewPerson, setShouldShowResetMatchups, setShouldShowViewPreviousMeetings, setShouldShowUploadFromJson } = useContext(ActionBarContext);
	
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
				<div>
					<button onClick={() => {
						setShouldShowRemainingMatchups(true);
						onRequestClose();
						}
					}>Show Remaining</button>
					<button onClick={() => {
						setShouldShowResetMatchups(true);
						onRequestClose();
						}
					}>Reset Matchups</button>
					<button onClick={() => {
						setShouldShowAddNewPerson(true);
						onRequestClose();
						}
					}>Add Team Member</button>
					<button onClick={() => {
						setShouldShowViewPreviousMeetings(true);
						onRequestClose();
						}
					}>Show Previous Meetings</button>
					<button onClick={() => {
						setShouldShowUploadFromJson(true);
						onRequestClose();
						}
					}>Create Meeting from JSON</button>
				</div>
			</ModalBody>
		</ModalBackground>
	</>
	)
}

const mapStateToProps = state => ({
	people: getPeople(state),

});


const mapDispatchToProps = dispatch => ({
	onResetPressed: () => dispatch(resetDefaultMatchups()),
	onCreatePressed: person_name => dispatch(createPerson(person_name)),
});

export default connect(mapStateToProps,mapDispatchToProps)(SettingsMenu);