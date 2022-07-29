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
	color: white;
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

const YesNo = ({ element, task, message="Are you sure?", children }) => {
	const [shouldShow, setShouldShow] = useState(false);
	
	return (
		<>
		<div onClick={() => setShouldShow(true)} >{element}</div>
		{shouldShow && (
			<ModalBackground onClick={() => setShouldShow(false)}>
				<ModalBody onClick={e => e.stopPropagation()}>
					<TiDeleteOutline style={ { margin: 'auto 0 auto auto' } }onClick={() => setShouldShow(false)}>x</TiDeleteOutline>
		    		{children}
		    		<button onClick={ task }>Yes</button>
		    		<button onClick={() => setShouldShow(false)} >No</button>
				</ModalBody>
			</ModalBackground>
		)}
		</>
	)
}

export default YesNo;