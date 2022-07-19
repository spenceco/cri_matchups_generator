import styled from 'styled-components';
import React from 'react';


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
	background-color: white;
	margin: 10% auto;
	padding: 20px;
	width: 50%;
	display: flex;
	flex-direction: column;
	align-items: flex-end;
	border-radius: 8px;
`;

const ModalCloseButton = styled.button`
	color: white;
	background-color: red;
	width: 20px;
	height: 20px;
	
`;

const Modal = ({ buttonName="Show Modal", shouldShow, onRequestClose, children }) => {

	
	return shouldShow ? (
		<>
			<ModalBackground onClick={() => onRequestClose()}>
				<ModalBody onClick={e => e.stopPropagation()}>
				<div>
					<ModalCloseButton onClick={() => onRequestClose()}>x</ModalCloseButton>
				</div>
		    	{children}
				</ModalBody>
			</ModalBackground>
		</>
	) : null;
}

export default Modal;