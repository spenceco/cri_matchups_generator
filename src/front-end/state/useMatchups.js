import { matchupsReducer } from "../matchups/reducers.js";
import matchupsActions from "../matchups/actions.js";
import { useReducer } from 'react';

const initialState = {
	selected: [],
	date: null,
	people: [],
	};
	
	
export default function useMatchups() {
  const [matchups, matchupsDispatch] = useReducer(matchupsReducer, initialState);
  const { loadMatchups,
          setDate,
          loadMatchedPeople,
          omitPerson,
          editPerson,
          removePerson,
          createPerson,
          selectPerson,
          submitGroup,
          generateMatchups,
          clearMatchups,
          deleteSavedMatchup,
          resetDefaultMatchups,
          remainingMeetings,
          removeGroup,
          saveMeeting, 
        
        } = matchupsActions(matchupsDispatch);
  
		  return {
		    matchups,
		    loadMatchups,
		    setDate,
		    loadMatchedPeople,
		    omitPerson,
		    editPerson,
		    removePerson,
		    createPerson,
		    selectPerson,
		    submitGroup,
		    generateMatchups,
		    clearMatchups,
		    deleteSavedMatchup,
		    resetDefaultMatchups,
		    remainingMeetings,
		    removeGroup,
		    saveMeeting
		  };
		}
// You can combine any number of reducers and actions here. Maybe some kind of predictable data shape for the return value is helpful