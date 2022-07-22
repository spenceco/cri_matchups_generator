import { createSelector } from 'reselect';

export const getPeople = state => state.matchups.people;


export const getAttendingPeople = state => state.matchups.people.filter(person => !person.omit);

export const getNonselectedPeople = state => state.matchups.selected.name ? state.matchups.people.filter(person => person.name !== state.matchups.selected.name) : [];


export const getNonselectedAttendees = state => state.matchups.people.filter(person => ((person.name !== state.matchups.selected.name)&&(!person.omit)));

//export const getMatchedPeople = state =>  state.matchups.people.map(person);



/*
export const getTodos = state => state.todos.data;
export const getTodosLoading = state => state.todos.isLoading;

export const getIncompleteTodos = createSelector(
	getTodos,
	(todos) => todos.filter(todo => !todo.isCompleted),
);

export const getCompletedTodos = createSelector(
	getTodos,
	(todos) => todos.filter(todo => todo.isCompleted),
);
*/