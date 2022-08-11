import { Link } from 'react-router-dom';


const UserInfoPage = () => {



    return (
        <div className="content-container">
        	<div>Available projects: </div>
			<Link to="/matchups"><button>Matchups Generator</button></Link>
        </div>
    );
}

export default UserInfoPage;