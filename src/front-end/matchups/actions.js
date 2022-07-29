export const LOAD_MATCHUPS = 'LOAD_MATCHUPS';
export const loadMatchups = matchups => ({
	type: LOAD_MATCHUPS,
	payload: matchups,
});

export const SET_DATE = 'SET_DATE';
export const setDate = date => ({
	type: SET_DATE,
	payload: date,
});


export const OMIT_PERSON = 'OMIT_PERSON';
export const omitPerson = person => ({
	type: OMIT_PERSON,
	payload: { person },
});

export const EDIT_PERSON = 'EDIT_PERSON';
export const editPerson = person => ({
	type: EDIT_PERSON,
	payload: { person },
});

export const REMOVE_PERSON = 'REMOVE_PERSON';
export const removePerson = person => ({
	type: REMOVE_PERSON,
	payload: { person },
});

export const CREATE_PERSON = 'CREATE_PERSON';
export const createPerson = person_name => ({
	type: CREATE_PERSON,
	payload: { person_name },
});

export const SELECT_PERSON = 'SELECT_PERSON';
export const selectPerson = person => ({
	type: SELECT_PERSON,
	payload: { person },
});

export const SUBMIT_GROUP = 'SUBMIT_GROUP';
export const submitGroup = () => ({
	type: SUBMIT_GROUP
});

export const SELECT_PERSON_2 = 'SELECT_PERSON_2';
export const selectPerson2 = person => ({
	type: SELECT_PERSON_2,
	payload: { person },
});

export const GENERATE_MATCHUPS = 'GENERATE_MATCHUPS';
export const generateMatchups = () => ({
	type: GENERATE_MATCHUPS
});

export const CLEAR_MATCHUPS = 'CLEAR_MATCHUPS';
export const clearMatchups = () => ({
	type: CLEAR_MATCHUPS
});

export const DELETE_SAVED_MATCHUP = 'DELETE_SAVED_MATCHUP';
export const deleteSavedMatchup = (first_person, second_person) => ({
	type: DELETE_SAVED_MATCHUP,
	payload: { first_person, second_person },
});

export const RESET_DEFAULT_MATCHUPS = 'RESET_DEFAULT_MATCHUPS';
export const resetDefaultMatchups = () => ({
	type: RESET_DEFAULT_MATCHUPS,
});

export const REMAINING_MEETINGS = 'REMAINING_MEETINGS';
export const remainingMeetings = () => ({
	type: REMAINING_MEETINGS,
});

export const REMOVE_GROUP = 'REMOVE_GROUP';
export const removeGroup = group => ({
	type: REMOVE_GROUP,
	payload: { group },
});

export const SAVE_MEETING = 'SAVE_MEETING';
export const saveMeeting = people => ({
	type: SAVE_MEETING,
	payload: people,
});