import { IProduct } from '../../../data/types/products.types.js';
import { SalesPortalPage } from '../salesPortal.page.js';

export class AddNewProductPage extends SalesPortalPage {
	private readonly 'Name input' = 'input#inputName';
	private readonly 'Manufacturer dropdown' = 'select#inputManufacturer';
	private readonly 'Price input' = 'input#inputPrice';
	private readonly 'Amount input' = 'input#inputAmount';
	private readonly 'Notes textarea' = 'textarea#textareaNotes';
	private readonly 'Save New Product button' = 'button#save-new-product';

	async fillInputs(product: Partial<IProduct>) {
		product.name && await this.setInputValue(this['Name input'], product.name);
		product.manufacturer && await this.selectDropdownValue(this['Manufacturer dropdown'], product.manufacturer);
		product.price && await this.setInputValue(this['Price input'], product.price);
		product.amount && await this.setInputValue(this['Amount input'], product.amount);
		product.notes && await this.setInputValue(this['Notes textarea'], product.notes);
	}

	async clickOnSaveButton() {
		await this.clickOnElementEnabled(this['Save New Product button']);
	}

}

// export default new AddNewProductPage();     // export of class instance by default