import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useStateHooks } from '../state/StateContext';
import { useUser } from '../../auth/useUser';

const UserInfoPage = () => {

    const stateHooks = useStateHooks();
    const user = useUser();

    return (
        <div className="content-container">
        	<div>Available projects: </div>
			<Link to="/matchups"><button>Matchups Generator</button></Link>
        </div>
    );
}

export default UserInfoPage;