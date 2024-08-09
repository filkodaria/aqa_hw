import { HomeService } from '../../services/home/home.service.js';
import { LoginService } from '../../services/signIn/login.service.js';
import { ADMIN_NAME } from "../../../data/signIn/userData.js";

describe('[UI] [Login] Smoke tests', () => {
	const userService = new LoginService();
	const homeService = new HomeService();

	before(async () => {
		await browser.maximizeWindow();
	});

	beforeEach(async () => {
		await browser.url('https://anatoly-karpovich.github.io/aqa-course-project/#');
	});

	afterEach(async () => {
		await userService.signOut();
	});

	it('Check Admin login', async () => {
		await userService.adminLogin();
		
		const actualUserName = await homeService.getLoggedUserName();
		
		expect(actualUserName).toHaveText(ADMIN_NAME);
		await browser.pause(3000);
	});

})
