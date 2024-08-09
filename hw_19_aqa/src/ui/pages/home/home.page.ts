import { SalesPortalPage } from '../salesPortal.page.js';

export class HomePage extends SalesPortalPage {
	private readonly 'User Menu' = 'a#dropdownUser1';
	private readonly 'Authorization Cookie' = 'Authorization';
	private readonly 'Orders button' = '#orders-from-home';
  private readonly 'Products button' = '#products-from-home';
	private readonly 'Customers button' = '#customers-from-home';
	private readonly 'Modules page titles' = 'h2.ml-20';


	async getUserName() {
		await this.getElementText(this['User Menu']);
	}

	async clearAuthorizationCookie() {
		await this.clearCookie(this['Authorization Cookie']);
	}

	async clickOnDetailsButton(pageName: 'Orders' | 'Products' | 'Customers') {
		await this.clickOnElement(this[`${pageName} button`]);
	}

	async getPageTitle() {
		await this.getElementText(this['Modules page titles']);
	}
}
