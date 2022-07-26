import { 	OMIT_PERSON,
			REMOVE_PERSON,
			CREATE_PERSON,
			SELECT_PERSON,
			SELECT_PERSON_2,
			SUBMIT_GROUP,
			GENERATE_MATCHUPS,
			CLEAR_MATCHUPS,
			REMAINING_MEETINGS,
			RESET_DEFAULT_MATCHUPS,
			REMOVE_GROUP,
			SAVE_MEETING,
			DELETE_SAVED_MATCHUP,
			LOAD_MATCHUPS,
} from './actions.js';

import { getPeople, getAllOtherPeople } from './selectors'

/*
export const isLoading = (state = false, action) => {
	const { type } = action;
	
	switch (type) {
		case LOAD_TODOS_IN_PROGRESS:
			return true;
		case LOAD_TODOS_SUCCESS:
		case LOAD_TODOS_FAILURE:
			return false;
		default:
			return state;
	}
};
*/
const ppl = [	'Amy F.', 'Angela K.','Beth R.','Brian C.','Brooke G.','Caroline L.','Drew B.','Erica I.','Erin V.','Halley S.','Jamy W.','Jen P.','Jon G.','Josh D.','Karen K.',
				'Kerri G.','Kim S.','Kitsie R.','Kristin Q.','Liz R.','Maddie K.','Mary G.','Matt J.','Melanie P.','Steph C.','Stephen D.','Tina T.','Vicki T.','Wynn D.','Zack C.'
			];

const initialState = {
	selected: [],
	people:ppl.map(person_name => {
		return {
			name: person_name,
			omit: false,
			matchedWith: [],
			alreadyMet: [], }
		})
	};
	
	
function chooseRandomArrayElements(array,count=1){
	var result = [];
	while(result.length < count){
		const random_element = array[Math.floor(Math.random()*array.length)];
		if(!result.includes(random_element))
			result.push(random_element);
	}
	return result;
}






export const matchups = (state = initialState, action) => {
	const { type, payload } = action;
	
	switch (type) {
		case OMIT_PERSON: {
			const { person : personToOmit } = payload;
			return {
				...state,
				people: state.people.map(person => {
					if(person.name === personToOmit.name)
						return { ...person, omit: !person.omit};
					else return person;
				}),
			}
		}
		
		case LOAD_MATCHUPS: {
			console.log("LOADING MATCHUPS:");
			console.log(payload);
			return { ...state, people: payload.map(person => ({ ...person, alreadyMet: person.alreadyMet.map(met => ({"name":met}) )       }) ) };
		}
		



		case CREATE_PERSON: {
			const { person_name } = payload;
			if(!person_name)
				return;
			const person = {
				name: person_name, 
				omit: false,
				matchedWith: [],
				alreadyMet: [],
			};
			return {
				...state,
				people: state.people.concat(person),
			}
		}

		case REMOVE_PERSON: {
			const { person : personToRemove } = payload;
			return {
				...state,
				selected: state.selected.filter(person => person.name !== personToRemove.name),
				people: state.people.filter(person => person.name !== personToRemove.name),
			}
		}
		
		case SELECT_PERSON_2: {
			const { person: personToSelect } = payload;
			if(!state.selected)
				return {
					...state,
					selected: [personToSelect],
					};
			
			else if(state.selected.some(person => person.name === personToSelect.name))
				return {
					...state,
					selected: state.selected.filter(person => personToSelect.name !== person.name ),
					};
					
			return {
				...state,
				selected: [...state.selected, personToSelect],
				};
		}
		
		
		case SUBMIT_GROUP: {
			if(!state.selected)
				return state;
			const group = state.selected.map(person => {return {...person,matchedWith:[],alreadyMet:[]}});
			return { 	...state,
						selected: [],
						people: state.people.map(person => {
							if(group.some(member => member.name === person.name))
								return { ...person, matchedWith: group };
							else return person;
							}),
						
			}
			
		}
		
		case REMOVE_GROUP: {
			const { group: groupToRemove } = payload;
			return {
				...state,
				people: state.people.map(person => {
					if(groupToRemove.includes(person.name))
						return { ...person, matchedWith: [] };
					return person;
				})
			}
		}
		
		case DELETE_SAVED_MATCHUP: {
			const { first_person, second_person } = payload;
			//console.log(payload);
			//console.log(first_person + "/" + second_person);
			return {
				...state,
				people: state.people.map(person => {
					if(person.name === first_person)
						return { 	...person, 
									alreadyMet: person.alreadyMet.filter(p => p.name !== second_person)
						};
					else if(person.name === second_person)
						return { 	...person, 
									alreadyMet: person.alreadyMet.filter(p => p.name !== first_person)
						};
					else
						return person;
				})
			}
			
		}
		
		case CLEAR_MATCHUPS: {
			return {
				...state,
				people: state.people.map(person => {
					return {...person, matchedWith: [] };
				})
			}
		}
		
		case GENERATE_MATCHUPS: {
			
			function pickGroupMembers(current_state){
				
				const objectComparisonCallback = (arrayItemA, arrayItemB) => {
				  if (arrayItemA.alreadyMet.length < arrayItemB.alreadyMet.length) 
				    return 1
				  if (arrayItemA.alreadyMet.length > arrayItemB.alreadyMet.length)
				    return -1
				  return 0
				}//sort by alreadyMet descending
				
				
				const unmatched_people = current_state.people.filter(person => {
					if(!person.matchedWith.length && !person.omit)
						return true;
					return false;
				});
				
				if(!unmatched_people.length)
				{
					//console.log("no unmatched people");
					return [];
				}
					
				const unmatched_people_sorted = unmatched_people.sort(objectComparisonCallback);
				//console.log(unmatched_people_sorted);
				

				const isOdd = unmatched_people_sorted.length % 2 == 0 ? false : true;
				
				
				const candidatesForGroup = unmatched_people_sorted.map( unmatched_person => {
					
					
					const potentialMatches = unmatched_people_sorted.filter(person => {
						if(person.name == unmatched_person.name)
							return false;
						
						else if(person.alreadyMet.map(person_met => person_met.name).includes(unmatched_person.name) )
							return false;
						else
							return true;
						},);

					if(potentialMatches.length)
						return [unmatched_person,potentialMatches[0]];
					else return [];					

				});
				if(!candidatesForGroup.length)
				{
					//console.log("no candidates?");
					return [];
				}	
				//console.log(candidatesForGroup);
				const result = chooseRandomArrayElements(candidatesForGroup.filter(candidate => candidate.length))[0]
				//const isOdd = unmatched_people.length % 2 == 0 ? false : true;
				if(isOdd){
					const unmatched_people_reversed = [...unmatched_people_sorted].reverse();
					//console.log(unmatched_people_reversed);
					const potential_extra_partners = unmatched_people_reversed.filter(unmatched_person => {
						if(result.find(grouped_person => grouped_person.name == unmatched_person.name))
							return false;
						return true;
					})
					console.log(potential_extra_partners)
					if(potential_extra_partners.length)
						result.push(chooseRandomArrayElements(potential_extra_partners)[0]);
				}
					
				//console.log(result);
				return result;
				
			};
			
			

			
			function getSwing(current_state) {
				const unmatched_people = current_state.people.filter(person => !person.matchedWith.length);
				
				const potentialSwings = unmatched_people.map( unmatched_person => {
					const potential_matches = current_state.people.filter(person => {
						if(person.name === unmatched_person.name)
							return false;					
						else if(person.alreadyMet.map(person_met => person_met.name).includes(unmatched_person.name) )
							return false;
						else return true;
					});
					
					const peopleWithSwingablePartner = potential_matches.map(person => {//change to map???
						const swingablePartner = person.matchedWith.find(partner => {
							if(partner.name === person.name) return false;
							const isSwingable = unmatched_people.some(other_unmatched_person => {
								if(unmatched_person.name === other_unmatched_person.name)
									return false;
								else if(other_unmatched_person.alreadyMet.map(person_met => person_met.name).includes(partner.name))
									return false;
								else 
									return true;
							});
							return isSwingable;
						});
						return swingablePartner ? person : false;
					});
					
					if(peopleWithSwingablePartner)
						return {first_team_member:unmatched_person,peopleWithSwingablePartner:peopleWithSwingablePartner.filter(p => p !== false)};
					else
						return false;

				
				});
				return potentialSwings;
					
			};
			
			
			function shuffle(current_state) {
				const unmatched_people = current_state.people.filter(person => !person.matchedWith.length);
				var already_picked = [];
				const newly_matched_people = unmatched_people.map(unmatched_person => {
					const potentialMatches = current_state.people.filter(person => {
						if(person.name === unmatched_person.name)
							return false;
						else if(person.alreadyMet.map(met_person => met_person.name).includes(unmatched_person.name))
							return false
						else if(already_picked.includes(person.name))
							return false;
						else return true;	
					});
					const randomPartner = potentialMatches[Math.floor(Math.random()*potentialMatches.length)]
					already_picked.push(randomPartner.name);
					//console.log(already_picked)
					return {...unmatched_person,matchedWith:[unmatched_person,randomPartner	]};
				
				});
				
				const newGroups = newly_matched_people.map(person => person.matchedWith);
				
				return {
					...current_state,
					people: current_state.people.map(person => {
						const groupContainingPerson = newGroups.find(group => group.map(g => g.name).includes(person.name) );
						if(groupContainingPerson)
							return {...person,matchedWith:groupContainingPerson}
						else
							return {...person,matchedWith:[]};
					}),
				}
			}
			

			
			if(state.hasOwnProperty('people') && state.people.find(person => person.alreadyMet.length === state.people.length-1))
			{
				alert("complete! begin a new season.");
				return state;
			}
			var new_state = state;
			var times_shuffled = 0;
			
				
			console.log("start while");
			while(times_shuffled < 100){
			//for(let i=0;i<100;i++){
				//const unmatched_people = new_state.people.filter(person => !person.matchedWith.length);
				const unmatched_people = new_state.people.filter(person => {
					if(!person.matchedWith.length && !person.omit)
						return true;
					return false;
				});
				if(!unmatched_people.length)
					break;


				const group = pickGroupMembers(new_state);
				console.log(group);
				if(group == undefined || !group.length){//cannot read properties of undefined -- fix this
					//console.log("no group");
					const swings = getSwing(new_state);	
					//console.log(swings);
					
					const viableSwing = swings.find(swing => swing.peopleWithSwingablePartner.length);
					if(!viableSwing){
						//console.log("no viable swings. attempting shuffle");
						new_state = shuffle(new_state);
						//break;
						++times_shuffled;
						//i=0;
					}
					else {
						//console.log(viableSwing)
						
						const personNeedingPartner = viableSwing.first_team_member;
						const peopleWithSwingablePartner = viableSwing.peopleWithSwingablePartner;
						const randomPartner = peopleWithSwingablePartner[Math.floor(Math.random()*peopleWithSwingablePartner.length)]
						
						//console.log("needingpartner: "+personNeedingPartner.name);
						//console.log("peopleWithSwingablePartner: "+peopleWithSwingablePartner.name);
					
							new_state = {
								...new_state,
								people: new_state.people.map(person => {
									if(person.name === randomPartner.name)//if person has swingable partner
										return {...randomPartner, matchedWith:[randomPartner,personNeedingPartner]};
									else if(person.matchedWith.map(person => person.name).includes(randomPartner.name))//if person is grouped with the person with swingable partner
										return {...person,matchedWith:[]};
									else if(person.name === personNeedingPartner.name)//if the person is the first member of the group
										return {...personNeedingPartner, matchedWith:[randomPartner,personNeedingPartner]};
									else return person;
								})
							};
							
					}
				}
			

			
				
				else {
					//console.log(group);
					//console.log(new_state);
					new_state = {
						...new_state,
						people: new_state.people.map(person => {
							if(group.some(group_member => group_member.name === person.name))
								return {...person,matchedWith:group};
							else
								return person;
		
						}),
					};
				
				}
			}
			if(times_shuffled >= 100)
			{
				alert("no viable matches detected. new season recommended.");
			}
			
			return new_state;
		}
		
		case SAVE_MEETING: {
			const newState = {
				...state,
				people: state.people.map(person => {
					const matchedWith = person.matchedWith.filter(matched_person => matched_person).filter(matched_person => matched_person.name !== person.name);
					return { ...person, alreadyMet: person.alreadyMet.concat(matchedWith.map(matched_person => {return {name:matched_person.name}})), matchedWith: [], omit: false}
				})
			};
			
			const postBody = JSON.stringify( newState.people.map(person => ({ ...person, alreadyMet: person.alreadyMet.map(met => met.name) }) )  );
			try{
				const fetchData = async () => {
				 	const rawResponse = await fetch('/api/matchups',
				 	{
					    method: 'POST',
					    headers: {
					      'Accept': 'application/json',
					      'Content-Type': 'application/json'
					    },
					    body: postBody,
					});
					const body = await rawResponse.json();
					console.log(body);
				};
				fetchData();
						
			} catch(e) {
				console.log({"error":e});
			}

			//const content = rawResponse.json();
			//console.log(postBody);
			
 
			
			return newState;
		}
		
		case REMAINING_MEETINGS: {
			const remaining = null;
			return state;
		}
		
		
		case RESET_DEFAULT_MATCHUPS: 
			return {
				...state,
				people: state.people.map(person => ({ name: person.name, alreadyMet: [], matchedWith: [], omit: false }))
			};
			
		default:
			return state;
	}
}




export const todos = (state = initialState, action) => {
	const { type, payload } = action;
	
	switch (type) {
	case CREATE_TODO: {
		const { todo } = payload;
		return {
			...state,
			data: state.data.concat(todo),
		};
	}
	
	case REMOVE_TODO: {
		const { todo: todoToRemove } = payload;
		return {
			...state,
			data: state.data.filter(todo => todo.id !== todoToRemove.id),
		};
	}

/*	
	case MARK_TODO_AS_COMPLETED: {
		const { text } = payload;
		return state.map(todo => {
		if(todo.text === text)
			return { ...todo, isCompleted: true};		
		return todo;
		});
	}
	*/
	
	case COMPLETE_TODO: {
		const { todo: todoToComplete } = payload;
		return {
			...state,
			data: state.data.map(todo => {
			if(todo.id === todoToComplete.id)
				return { ...todo, isCompleted: true};
			return todo;
			}),
		};
	}
	
	case LOAD_TODOS_SUCCESS: {
		const { todos } = payload;	
		return {
			...state,
			isLoading: false,
			data: todos,
			}
	}
	case LOAD_TODOS_IN_PROGRESS:
		return {
			...state,
			isLoading: true,
		}
	case LOAD_TODOS_FAILURE:
		return {
			...state,
			isLoading: false,
		}
	default:
		return state;
	}
	
};


/*
	
	state.todos: {
		isLoading: true
		data: [...]
	*/