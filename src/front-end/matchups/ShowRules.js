import Modal from '../shared-components/Modal';
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







const ShowRules = ( { shouldShow, onRequestClose, people, }  ) => {
	
	
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
						
				<span>da rules</span>
			</ModalBody>
		</ModalBackground>
	</>
	)
}




export default ShowRules;
