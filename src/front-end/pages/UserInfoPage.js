import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useStateHooks } from '../state/StateContext';
import { useUser } from '../../auth/useUser';

const UserInfoPage = () => {

    const stateHooks = useStateHooks();
    const user = useUser();
    const [ profile, setProfileData ] = stateHooks.profile;

    useEffect(() => {
        console.log(user);
        setProfileData(user);
    },[])

    return (
        <div className="content-container">
        	<div>Available projects: </div>
			<Link to="/matchups"><button>Matchups Generator</button></Link>
        </div>
    );
}

export default UserInfoPage;