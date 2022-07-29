import Modal from './Modal';
import { connect } from 'react-redux';
import { deleteSavedMatchup } from './actions';
import { getPeople } from './selectors';
import { useState } from 'react';
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







const EditPersonMenu = ( { onRequestClose, person, onDeleteSavedMatchupPressed }  ) => {
	

	
	return person && (<>
		<ModalBackground onClick={() => onRequestClose()}>
			<ModalBody onClick={e => e.stopPropagation()}>
				<TiDeleteOutline onClick={() => onRequestClose()}
					style={ {
						alignSelf:'flex-end', 
						color: 'white',
						width: '25px',
						height: 'auto',
						} }/>
				<h3>{`${person.name} (${person.alreadyMet.length})`}</h3>
			{
				person.alreadyMet.length ? person.alreadyMet.map(met => <button key={met.name} onClick={
					() => onDeleteSavedMatchupPressed(person.name,met.name)
				}>{met.name}</button>) : 
				<div>No matchups yet</div>
			}
			</ModalBody>
		</ModalBackground>
	</>
	)
}

const mapStateToProps = state => ({
	people: getPeople(state),

});


const mapDispatchToProps = dispatch => ({
	onDeleteSavedMatchupPressed: (first_person, second_person) => dispatch(deleteSavedMatchup(first_person, second_person)),
});

export default connect(mapStateToProps,mapDispatchToProps)(EditPersonMenu);