import styled from 'styled-components';
import { TiDeleteOutline } from 'react-icons/ti';
import { useStateHooks } from '../state/StateContext';


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







const SaveMenu = ( { onRequestClose, shouldShow, inputValue, setInputValue }) => {
//TODO: reconfigure this to use the save function built into the MatchupsPage component
	const stateHooks = useStateHooks();
	const { user, token, setToken } = stateHooks.user;
	const { id, email } = user;
	const { matchups, saveMeeting } = stateHooks.matchups;
	const { people } = matchups;

	
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

				Are you sure you want to save?
				<button onClick={() => {
	
					
						try{
							const fetchData = async () => {
							 	const rawResponse = await fetch(`/api/matchups/${id}`,
							 	{
								    method: 'POST',
								    headers: {
								      'Accept': 'application/json',
								      'Content-Type': 'application/json',
								      'Authorization': `Bearer ${token}`,
								    },
								    body: JSON.stringify({ people:people, date: inputValue, email: email}),
								});
								const body = await rawResponse.json();
								if(rawResponse.status == 200){
									saveMeeting(body);
									setInputValue('');
									onRequestClose();	
								}
								else{
								 	alert('Error connecting to database.');
								}
							};
							fetchData();
									
						} catch(e) {
							console.log({"error":e});
						}
	
					
				}}>Save</button>
			</ModalBody>
		</ModalBackground>
	</>
			
	)
}





export default SaveMenu;