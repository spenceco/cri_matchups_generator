import Modal from './Modal';
import { useState } from 'react';
import styled from 'styled-components';
import { useUser } from '../../auth/useUser';
import { useToken } from '../../auth/useToken';
import { useStateHooks } from '../state/StateContext';


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

const saveToServer = async (id,token,people) => {
	
	console.log(people);

	try{
		const fetchData = async () => {
		 	const rawResponse = await fetch(`/api/matchups/save/${id}`,
		 	{
			    method: 'POST',
			    headers: {
			      'Accept': 'application/json',
			      'Content-Type': 'application/json',
			      'Authorization': `Bearer ${token}`,
			    },
			    body: JSON.stringify({ people:people }),
			});
			const body = await rawResponse.json();
			if(rawResponse.status != 200)
				alert('Error connecting to database.');
	

		};
		fetchData();
				
	} catch(e) {
		console.log({"error":e});
	}
	
}




const UploadFromJson = ( { shouldShow, onRequestClose }  ) => {
	
	const user = useUser();
	const { id, email } = user;
	const [token ,setToken] = useToken();
	
	const [inputValue, setInputValue] = useState('');
	
	const { matchups, saveMeeting } = useStateHooks().matchups;
	const { people } = matchups;

	
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
					<button onClick={() => {
						//const matchedPeople = parseMeetingData(people,inputValue);
						//console.log(matchedPeople);
						const parsed = JSON.parse(inputValue);
						saveMeeting(parsed);
						saveToServer(id, token, parsed);
						onRequestClose();
					}}>Submit</button>
				</div>
			</ModalBody>
		</ModalBackground>
	</>
	)
}


export default UploadFromJson;
