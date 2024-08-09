import { IUser } from "../../../data/types/user.types.js";
import { ADMIN_EMAIL, ADMIN_PASSWOWRD } from "../../../data/signIn/userData.js";
import { LoginForm } from "../../pages/signIn/login.page.js";
import { HomePage } from "../../pages/home/home.page.js";

export class LoginService {
	constructor(
		private loginForm = new LoginForm(),
		private homePage = new HomePage(),
	) { };
	
	async fillLoginInputs(user: Partial<IUser>) {
		await this.loginForm.fillCredentials(user);
	}

	async loginFormSubmit() {
		await this.loginForm.clickOnLoginButton();
	}

	async userLogin(user: IUser) {
		await this.fillLoginInputs(user);
		await this.loginFormSubmit();
		await this.loginForm.waitForSpinnerDisappeared();
	}

	async adminLogin() {
		await this.userLogin({email: ADMIN_EMAIL, passwowrd: ADMIN_PASSWOWRD});
	}

	async signOut() {
		await this.homePage.clearAuthorizationCookie();
	}

}