import { useState } from 'react';
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
	color: black;
`;

const ModalCloseButton = styled.button`
	color: white;
	background-color: red;
	width: 20px;
	height: 20px;
	
`;

const ModalOpenButton = styled.button`
	background-color: #7D7461;
    border-radius: 8px;
    min-height: 20px;
    display: block;
    font-size: 16px;
    padding: 8px;
    color: white;
    border-color: #635c51;
`;

const Modal = ({ buttonName="Show Modal", children }) => {
	const [shouldShow, setShouldShow] = useState(false);
	
	return (
		<>
		<button onClick={() => setShouldShow(true)}>{buttonName}</button>
		{shouldShow && (
			<ModalBackground onClick={() => setShouldShow(false)}>
				<ModalBody onClick={e => e.stopPropagation()}>
					<ModalCloseButton onClick={() => setShouldShow(false)}>x</ModalCloseButton>
		    		{children}
				</ModalBody>
			</ModalBackground>
		)}
		</>
	)
}

export default Modal;