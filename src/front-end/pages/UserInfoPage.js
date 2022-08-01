import { useState, useEffect, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import React from 'react';
import { useToken } from '../../auth/useToken';
import { useUser } from '../../auth/useUser';
import axios from 'axios';
import { currentUserContext } from '../App';

const UserInfoPage = () => {
	
	const user = useUser();
	const [token ,setToken] = useToken();
	const { setCurrentUser } = useContext(currentUserContext);
	
	
	const { id, email, info, isVerified } = user;
	
	useEffect(() => {
		setCurrentUser(user);
	},[])

	
	
	console.log(info);
    // We'll use the history to navigate the user
    // programmatically later on (we're not using it yet)
    const navigate = useNavigate();

    // These states are bound to the values of the text inputs
    // on the page (see JSX below). 
    const [favoriteFood, setFavoriteFood] = useState(info.favoriteFood || '');
    const [hairColor, setHairColor] = useState(info.hairColor || '');
    const [bio, setBio] = useState(info.bio || '');

    // These state variables control whether or not we show
    // the success and error message sections after making
    // a network request (see JSX below).
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const [showErrorMessage, setShowErrorMessage] = useState(false);

    // This useEffect hook automatically hides the
    // success and error messages after 3 seconds when they're shown.
    // Just a little user interface improvement.
    useEffect(() => {
        if (showSuccessMessage || showErrorMessage) {
            setTimeout(() => {
                setShowSuccessMessage(false);
                setShowErrorMessage(false);
            }, 3000);
        }
    }, [showSuccessMessage, showErrorMessage]);

    const saveChanges = async () => {
        try {
	        console.log(favoriteFood);
	        
	        const response = await axios.put(`/api/users/${id}`, {
		        favoriteFood,
		        hairColor,
		        bio
	        }, {
		        headers: { Authorization: `Bearer ${token}` }
	        })
	        
	        const { token: newToken } = response.data;
	        setToken(newToken);
	        setShowSuccessMessage(true);
        } catch (error) {
	        setShowErrorMessage(true);
        }
    }
    
    const resetValues = () => {
        setFavoriteFood(info.favoriteFood);
        setHairColor(info.hairColor);
        setBio(info.bio);
    }
    
    // And here we have the JSX for our component. It's pretty straightforward
    return (
        <div className="content-container">
        	<div>Available projects: </div>
			<Link to="/matchups"><button>Matchups Generator</button></Link>
        </div>
    );
}

export default UserInfoPage;