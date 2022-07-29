import Modal from './Modal';
import { connect } from 'react-redux';
import { resetDefaultMatchups, createPerson } from './actions';
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
	width: 425px;
	height: 350px;
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







const UploadFromJson = ( { shouldShow, onRequestClose, people, onCreatePressed, onResetPressed }  ) => {
	
	const [inputValue, setInputValue] = useState('');

	
	return shouldShow && (<>
		
		<ModalBackground onClick={() => onRequestClose()}>
			<ModalBody onClick={e => e.stopPropagation()}>
			<TiDeleteOutline onClick={() => onRequestClose()}
				style={ {
					alignSelf:'flex-end', 
					color: 'white',
					minWidth: '25px',
					minHeight: '25px',
					} }/>
				<div>

					<textarea 	type="text"
							value={inputValue}
							onChange={e => setInputValue(e.target.value)}
							placeholder="insert JSON here"
							style={ {height: '300px', width: '400px' } }
					/>
					<button onClick={() => onRequestClose()}>Submit</button>
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

export default connect(mapStateToProps,mapDispatchToProps)(UploadFromJson);
