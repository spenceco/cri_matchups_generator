

import React, {  useState, createContext } from 'react';
import { connect } from 'react-redux';
import { saveMeeting, clearMatchups, resetDefaultMatchups, submitGroup, generateMatchups } from '../matchups/actions';
import { GiSaveArrow } from 'react-icons/gi';
import { HiDotsVertical } from 'react-icons/hi';
import { BiEraser } from 'react-icons/bi/';
import SettingsMenu from '../matchups/SettingsMenu';
import SaveMenu from '../matchups/SaveMenu';
import ShowRemainingMatchups from '../matchups/ShowRemainingMatchups';
import AddNewPerson from '../matchups/AddNewPerson';
import ResetMatchups from '../matchups/ResetMatchups';
import ViewPreviousMeetings from '../matchups/viewPreviousMeetings';
import UploadFromJson from '../matchups/uploadFromJson';
import ShowRules from '../matchups/ShowRules';
import YesNo from './YesNo';

import { MdOutlineAutoAwesome, MdSend } from 'react-icons/md';

import styled from 'styled-components';
import ReactTooltip from 'react-tooltip';

export const ActionBarContext = createContext();

const ActionBar = ( {onSaveClicked, onClearClicked, people, date, selected, onSubmitGroupPressed, onAutoPressed }) => {
	
	const [shouldShowSettingsMenu,setShouldShowSettingsMenu] = useState(false);
	const [shouldShowSaveMenu,setShouldShowSaveMenu] = useState(false);
	const [shouldShowAddNewPerson,setShouldShowAddNewPerson] = useState(false);
	const [shouldShowRemainingMatchups,setShouldShowRemainingMatchups] = useState(false);
	const [shouldShowResetMatchups,setShouldShowResetMatchups] = useState(false);
	const [shouldShowViewPreviousMeetings,setShouldShowViewPreviousMeetings] = useState(false);
	const [shouldShowUploadFromJson,setShouldShowUploadFromJson] = useState(false);
	const [shouldShowShowRules,setShouldShowShowRules] = useState(false);
	
	const matchedPeople = people.filter(person => person.hasOwnProperty('matchedWith') && person.matchedWith.length);
	
	const [inputValue,setInputValue] = useState('');
	
	const style = {
		width: '25px',
		height: 'auto',
		color: 'white',
		margin: '5px',
		
	};
	
	const barStyle = {
		backgroundColor: '#39304A',
		width: '100%',
		height: '50px',
		display: 'flex',
		justifyContent: 'flex-start',
	};
	
	const validateDate = (date) => {
		const args = date.split('-');

		if(args.length !== 3)
			return false;

		if(args[0].length !== 2 || args[1].length !== 2 || args[2].length !== 4)
			return false;
	
		const [month,day,year] = args.map(a => parseInt(a));
		
		if(!month || !day || !year)
			return false;

		if(month < 0 || day < 0 || year < 0)
			return false;
			
		if(month > 12 || day > 31)
			return false;
		
		return true;	
	}
	

	
	return (
		<ActionBarContext.Provider value={ { 	setShouldShowRemainingMatchups,
												setShouldShowAddNewPerson, 
												setShouldShowResetMatchups, 
												setShouldShowViewPreviousMeetings,
												setShouldShowUploadFromJson,
												setShouldShowShowRules,
												} }>
			<div style={barStyle}>
				<div style={ {margin: 'auto auto auto 10px', display: 'flex'} }>
					<input 	
						data-tip data-for="dateTip"
						value={inputValue}
						onChange={e => setInputValue(e.target.value)}
						type='text' 
						placeholder="MM-DD-YYYY" 
						style={ {margin: '5px 5px 5px 0', width: '250px'} } 
					/>
					{
						selected.length > 3 ? 
							<YesNo style={{display:'flex'}}	element={  <MdSend data-tip data-for="submitGroupTip" style={ { width: '25px', height: 'auto', margin:'auto 0 auto auto', color: 'white', alignSelf: 'center'} } /> }
									task={() => onSubmitGroupPressed()} >
								Groups of more than three people are allowed, but not recommended. Proceed anyway?</YesNo>  :
							<MdSend data-tip data-for="submitGroupTip" style={ { width: '25px', height: 'auto', margin:'auto 0 auto auto', color: 'white'} } onClick={() => {
								if(selected.length < 2) alert("Select at least two members to form a group.");
								else onSubmitGroupPressed();
							}} />							
						
					}

					<MdOutlineAutoAwesome data-tip data-for="autoTip" style={ { width: '25px', height: 'auto', margin:'auto 3px auto 0', color: 'white'} } onClick={ () => onAutoPressed()  } />
			        <ReactTooltip id="submitGroupTip" place="top" effect="solid">
			        	Assign selected members to group
			        </ReactTooltip>
			        <ReactTooltip id="autoTip" place="top" effect="solid">
			        	Automatically assign groups
			        </ReactTooltip>
				     <ReactTooltip id="dateTip" place="top" effect="solid">
				        Enter the date of the meeting
				     </ReactTooltip>
				</div>
				<div style={ { margin: 'auto 0 auto auto'} }>
					<GiSaveArrow data-tip data-for="saveTip" style={ style } aria-label="Save Meeting" onClick={() => {
						if(inputValue == '')
							alert("Please enter a date");
						else if(!matchedPeople.length)
							alert("No groups assigned")
						else if(!validateDate(inputValue))
							alert("Date format is invalid");
						else
							setShouldShowSaveMenu(true);	
					}}/>
					<BiEraser data-tip data-for="clearTip" style={ style } alt="Unpair All" onClick={() => onClearClicked()} />
					<HiDotsVertical data-tip data-for="moreOptionsTip" style={ style } onClick={ () => setShouldShowSettingsMenu(true)} />
				     <ReactTooltip id="saveTip" place="top" effect="solid">
				        Save meeting
				     </ReactTooltip>
				     <ReactTooltip id="clearTip" place="top" effect="solid">
				        Clear assigned groups
				     </ReactTooltip>
				     <ReactTooltip id="moreOptionsTip" place="top" effect="solid">
				        More options
				     </ReactTooltip>
				</div>
				<SettingsMenu shouldShow={shouldShowSettingsMenu} onRequestClose={() => setShouldShowSettingsMenu(false)} />
				<ShowRemainingMatchups shouldShow={shouldShowRemainingMatchups} onRequestClose={() => setShouldShowRemainingMatchups(false)} />
				<SaveMenu shouldShow={shouldShowSaveMenu} onRequestClose={() => setShouldShowSaveMenu(false)} setInputValue={setInputValue} inputValue={inputValue} />
				<AddNewPerson shouldShow={shouldShowAddNewPerson} onRequestClose={() => setShouldShowAddNewPerson(false)} />
				<ResetMatchups shouldShow={shouldShowResetMatchups} onRequestClose={() => setShouldShowResetMatchups(false)} />
				<ViewPreviousMeetings shouldShow={shouldShowViewPreviousMeetings} onRequestClose={() => setShouldShowViewPreviousMeetings(false)} />
				<UploadFromJson shouldShow={shouldShowUploadFromJson} onRequestClose={() => setShouldShowUploadFromJson(false)}  />
				<ShowRules shouldShow={shouldShowShowRules} onRequestClose={() => setShouldShowShowRules(false)}  />
			</div>
		</ActionBarContext.Provider>
	)
}


const mapDispatchToProps = dispatch => ({
	onResetPressed: () => dispatch(resetDefaultMatchups()),
	onSaveClicked: people => dispatch(saveMeeting(people)),
	onClearClicked: () => dispatch(clearMatchups()),
	onSubmitGroupPressed: () => dispatch(submitGroup()),
	onAutoPressed: () => dispatch(generateMatchups()),
});

const mapStateToProps = state => ({
	date: state.matchups.date,
	people: state.matchups.people,
	selected: state.matchups.selected,
});


export default connect(mapStateToProps,mapDispatchToProps)(ActionBar);
