import { HomePage } from "../../pages/home/home.page.js";

export class HomeService {
	constructor(
		private homePage = new HomePage(),
	) { };
	
	async getLoggedUserName() {
		await this.homePage.getUserName();
	}

	async openProductsPage() {
		await this.homePage.clickOnDetailsButton('Products');
		await this.homePage.waitForSpinnerDisappeared();

		expect(this.homePage.getPageTitle).toHaveText('Products List');
	}

}