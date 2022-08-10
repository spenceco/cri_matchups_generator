import { signUpRoute } from './signUpRoute';
import { logInRoute } from './logInRoute';
import { getMatchupsRoute, saveMatchupsRoute, saveRoute } from './matchupsRoutes';
import { updateUserInfoRoute } from './updateUserInfoRoute';
import { verifyEmailRoute } from './verifyEmailRoute';
import { forgotPasswordRoute } from './forgotPasswordRoute';
import { resetPasswordRoute } from './resetPasswordRoute';
import { getGoogleOauthUrlRoute } from './getGoogleOauthUrlRoute';
import { googleOauthCallbackRoute } from './googleOauthCallbackRoute';
import { requestResumeRoute } from './requestResumeRoute';

const routes = [
	signUpRoute,
	logInRoute,
	getMatchupsRoute,
	saveMatchupsRoute,
	saveRoute,
	updateUserInfoRoute,
	verifyEmailRoute,
	forgotPasswordRoute,
	resetPasswordRoute,
	getGoogleOauthUrlRoute,
	googleOauthCallbackRoute,
	requestResumeRoute,
];

export default routes;
