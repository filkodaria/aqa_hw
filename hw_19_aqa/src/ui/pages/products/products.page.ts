import { SalesPortalPage } from '../salesPortal.page.js';

export class ProductsPage extends SalesPortalPage {
	private readonly 'Add New Product button' = 'button.page-title-button';

	private readonly 'Table row selector' = (product: string) => `//tr[./td[text()="${product}"]]`;
  // private readonly 'Name by table row' = (product: string) => `${this['Table row selector'](product)}/td[1]`;
  private readonly 'Price by table row' = (product: string) => `${this['Table row selector'](product)}/td[2]`;
  private readonly 'Manufacturer by table row' = (product: string) => `${this['Table row selector'](product)}/td[3]`;

	
	async clickOnAddNewProductButton() {
		await this.clickOnElement(this['Add New Product button']);
	}

	async getDataByName(name: string) {
		const [price, manufacturer] = await Promise.all([
			this.getElementText(this['Price by table row'](name)),
			this.getElementText(this['Manufacturer by table row'](name))
		]);
		return { name, price: +price.replace('$', ''), manufacturer };
	}

}