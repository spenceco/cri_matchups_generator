import { useState } from 'react';
import styled from 'styled-components';
import React from 'react';
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
				<TiDeleteOutline onClick={() => setShouldShow(false)}
				style={ {
					alignSelf:'flex-end', 
					color: 'white',
					width: '25px',
					height: 'auto',
					} }/>
		    		{children}
				</ModalBody>
			</ModalBackground>
		)}
		</>
	)
}

export default Modal;