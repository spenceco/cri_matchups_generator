import { 	omitPerson,
			removePerson,
			assignPerson,
			generateMatchups,
} from './actions.js';


export const generateMatchupsThunk = () => () => {
	dispatch(displayAlert("matchups generated!"));
}


export const displayAlert = text => () => {
	alert(text);
}
