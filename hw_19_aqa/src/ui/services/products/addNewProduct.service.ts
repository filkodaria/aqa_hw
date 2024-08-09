import { generateNewProduct } from "../../../data/products/generateProduct.js";
import { IProduct } from "../../../data/types/products.types.js";
import { AddNewProductPage } from "../../pages/products/addNewProduct.page.js";

export class AddProductService {
	constructor(
		private addNewProductPage = new AddNewProductPage()
	) { };
	
	async fillProductInputs(product: Partial<IProduct>) {
		await this.addNewProductPage.fillInputs(product);
	}

	async saveProduct() {
		await this.addNewProductPage.clickOnSaveButton();
	}

	async createNewProduct(product?: IProduct) {
		await this.fillProductInputs(product ?? generateNewProduct());
		await this.saveProduct();
		await this.addNewProductPage.waitForSpinnerDisappeared();
	}

}
