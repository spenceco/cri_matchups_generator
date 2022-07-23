import { signUpRoute } from './signUpRoute';
import { logInRoute } from './logInRoute';
import { getMatchupsRoute, saveMatchupsRoute } from './matchupsRoutes';
import { updateUserInfoRoute } from './updateUserInfoRoute';
import { verifyEmailRoute } from './verifyEmailRoute';
import { forgotPasswordRoute } from './forgotPasswordRoute';
import { resetPasswordRoute } from './resetPasswordRoute';
import { getGoogleOauthUrlRoute } from './getGoogleOauthUrlRoute';
import { googleOauthCallbackRoute } from './googleOauthCallbackRoute';

const routes = [
	signUpRoute,
	logInRoute,
	getMatchupsRoute,
	saveMatchupsRoute,
	updateUserInfoRoute,
	verifyEmailRoute,
	forgotPasswordRoute,
	resetPasswordRoute,
	getGoogleOauthUrlRoute,
	googleOauthCallbackRoute,
];

export default routes;
