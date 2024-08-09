import { IUser } from '../../../data/types/user.types.js';
import { SalesPortalPage } from '../salesPortal.page.js';

export class LoginForm extends SalesPortalPage {
	private readonly 'Email input' = '#emailinput';
	private readonly 'Password input' = '#passwordinput';
	private readonly 'Login button' = 'button.btn-lg';

	async fillCredentials(user: Partial<IUser>) {
		user.email && await this.setInputValue(this['Email input'], user.email);
		user.passwowrd && await this.setInputValue(this['Password input'], user.passwowrd);
	}

	async clickOnLoginButton() {
		await this.clickOnElement(this['Login button']);
	}

}
