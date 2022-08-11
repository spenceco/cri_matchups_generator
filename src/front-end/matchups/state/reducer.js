
function chooseRandomArrayElements(array,count=1){
	var result = [];
	while(result.length < count){
		const random_element = array[Math.floor(Math.random()*array.length)];
		if(!result.includes(random_element))
			result.push(random_element);
	}
	return result;
}

export const matchupsReducer = (state={}, action) => {
	const { type, payload } = action;
	
	switch (type) {
		case 'OMIT_PERSON': {
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
		
		case 'LOAD_MATCHUPS': {
			const newState = { ...state, people: payload };
			return newState;
		}
		
		case 'SET_DATE': {
			return { ...state, date: payload };
		}


		case 'CREATE_PERSON': {
			const { personName } = payload;
			if(!personName)
				return;
			const person = {
				name: personName, 
				omit: false,
				matchedWith: [],
				alreadyMet: [],
			};
			const newState = {
				...state,
				people: state.people.concat(person),
			};
			console.log(newState);
			return newState;
		}

		case 'REMOVE_PERSON': {
			const { person : personToRemove } = payload;
			return {
				...state,
				selected: state.selected.filter(person => person.name !== personToRemove.name),
				people: state.people.filter(person => person.name !== personToRemove.name),
			}
		}
		
		case 'SELECT_PERSON': {
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
		
		case 'SUBMIT_GROUP': {
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
		
		case 'LOAD_MATCHED_PEOPLE': {
			
			return { 	...state,
						selected: [],
						people: payload,						
			}
			
		}
		
		case 'REMOVE_GROUP': {
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
		
		case 'DELETE_SAVED_MATCHUP': {
			const { first_person, second_person } = payload;
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
		
		case 'CLEAR_MATCHUPS': {
			return {
				...state,
				people: state.people.map(person => {
					return {...person, matchedWith: [] };
				})
			}
		}
		
		case 'GENERATE_MATCHUPS': {
			
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
					return [];

				const unmatched_people_sorted = unmatched_people.sort(objectComparisonCallback);
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
					return [];

				const result = chooseRandomArrayElements(candidatesForGroup.filter(candidate => candidate.length))[0]
				if(isOdd){
					const unmatched_people_reversed = [...unmatched_people_sorted].reverse();
					const potential_extra_partners = unmatched_people_reversed.filter(unmatched_person => {
						if(result.find(grouped_person => grouped_person.name == unmatched_person.name))
							return false;
						return true;
					})
					if(potential_extra_partners.length)
						result.push(chooseRandomArrayElements(potential_extra_partners)[0]);
				}

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

			while(times_shuffled < 100){
				const unmatched_people = new_state.people.filter(person => {
					if(!person.matchedWith.length && !person.omit)
						return true;
					return false;
				});
				if(!unmatched_people.length)
					break;
				const group = pickGroupMembers(new_state);
				if(group == undefined || !group.length){
					const swings = getSwing(new_state);	
					
					const viableSwing = swings.find(swing => swing.peopleWithSwingablePartner.length);
					if(!viableSwing){
						new_state = shuffle(new_state);
						++times_shuffled;
					}
					else {
						const personNeedingPartner = viableSwing.first_team_member;
						const peopleWithSwingablePartner = viableSwing.peopleWithSwingablePartner;
						const randomPartner = peopleWithSwingablePartner[Math.floor(Math.random()*peopleWithSwingablePartner.length)]
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
		
		case 'SAVE_MEETING': {
			//console.log(payload);
			const newState = {
				...state,
				people: payload,
			};
			
			
			return newState;
		}
		
		case 'REMAINING_MEETINGS': {
			const remaining = null;
			return state;
		}
		
		
		case 'RESET_DEFAULT_MATCHUPS': 
			return {
				...state,
				people: state.people.map(person => ({ name: person.name, alreadyMet: [], matchedWith: [], omit: false }))
			};
			
		default:
			return state;
	}
}