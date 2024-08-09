import { BasePage } from "./base.page.js";

export class SalesPortalPage extends BasePage {
	protected readonly spinner = 'div.spinner-border';

	async waitForSpinnerDisappeared() {
		await this.waitForElementDisplayed(this.spinner, 10000, true);
	}

}