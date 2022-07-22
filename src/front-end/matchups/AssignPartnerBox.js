import React from 'react';
import styled from 'styled-components';
import { getNonselectedAttendees } from './selectors';
import { connect } from 'react-redux';

const Box = styled.div`

		background: #daaaaa;
		height: 500px;
		width: 500px;
		color: white;

`;

const Button = styled.button`
    font-size: 12px;
    padding: 10px;
    border: 1px solid #bbbbbb;
    border-radius: 8px;
    outline: none;
    cursor: pointer;
    display: inline-block;
    height: 40px;
    margin: 5px;

`;

const AssignPartnerBox = ({ firstPartner, everyoneElse }) => {
	return (
		<Box>
			<div>Assign partner to {firstPartner.name}:</div>
			{firstPartner.name ? <div>{everyoneElse.map(person => <Button key={person.name}>{person.name}</Button>)}</div> : null}
		</Box>
	);
}
const mapStateToProps = state => ({
	firstPartner: state.matchups.selected,
	everyoneElse: getNonselectedAttendees(state),
});

export default connect(mapStateToProps)(AssignPartnerBox);