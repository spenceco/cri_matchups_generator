




export default function matchupsActions(dispatch) {
	function saveMeeting(people) {
		dispatch({
			type: "SAVE_MEETING",
			payload: people
		});
	}
	function loadMatchups(matchups) {
		dispatch({
			type: "LOAD_MATCHUPS",
			payload: matchups
		});
	}
	function loadMatchedPeople(people) {
		dispatch({
			type: "LOAD_MATCHED_PEOPLE",
			payload: people
		});
	}
	function setDate(date) {
		dispatch({
			type: "SET_DATE",
			payload: date
		});
	}
	function removeGroup(group) {
		dispatch({
			type: "REMOVE_GROUP",
			payload: group
		});
	}
	function remainingMeetings() {
		dispatch({
			type: "REMAINING_MEETINGS",
		});
	}
	function resetDefaultMatchups() {
		dispatch({
			type: "RESET_DEFAULT_MATCHUPS",
		});
	}
	function deleteSavedMatchup(first_person, second_person) {
		dispatch({
			type: "DELETE_SAVED_MATCHUP",
			payload: { first_person, second_person }
		});
	}
	function selectPerson(person) {
		dispatch({
			type: "SELECT_PERSON",
			payload: { person }
		});
	}
	function submitGroup() {
		dispatch({
			type: "SUBMIT_GROUP",
		});
	}
	function createPerson(personName) {
		dispatch({
			type: "CREATE_PERSON",
			payload: { personName }
		});
	}
	function removePerson(person) {
		dispatch({
			type: "REMOVE_PERSON",
			payload: { person }
		});
	}
	function editPerson(person) {
		dispatch({
			type: "EDIT_PERSON",
			payload: { person }
		});
	}
	function omitPerson(person) {
		dispatch({
			type: "OMIT_PERSON",
			payload: { person }
		});
	}
	function clearMatchups() {
		dispatch({
			type: "CLEAR_MATCHUPS",
		});
	}
	function generateMatchups() {
		dispatch({
			type: "GENERATE_MATCHUPS",
		});
	}


	return { 	saveMeeting, 
				loadMatchups, 
				loadMatchedPeople, 
				setDate, 
				removeGroup, 
				remainingMeetings, 
				resetDefaultMatchups, 
				deleteSavedMatchup, 
				selectPerson, 
				submitGroup, 
				createPerson, 
				removePerson, 
				editPerson, 
				omitPerson, 
				clearMatchups, 
				generateMatchups };
}