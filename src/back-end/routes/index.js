import { signUpRoute } from './signUpRoute';
import { logInRoute } from './logInRoute';
import { getMatchupsRoute, saveMatchupsRoute } from './matchupsRoutes';
import { updateUserInfoRoute } from './updateUserInfoRoute';
import { verifyEmailRoute } from './verifyEmailRoute';

const routes = [
	signUpRoute,
	logInRoute,
	getMatchupsRoute,
	saveMatchupsRoute,
	updateUserInfoRoute,
	verifyEmailRoute,
];

export default routes;
