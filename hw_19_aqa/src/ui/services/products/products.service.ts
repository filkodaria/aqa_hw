import { ProductsPage } from "../../pages/products/products.page.js";

export class ProductListService {	
	constructor(
		private productsPage = new ProductsPage()
	) { };
	
	async openAddNewProductPage() {
		await this.productsPage.clickOnAddNewProductButton();
		await this.productsPage.waitForSpinnerDisappeared();
	}

	async getCreatedProduct(productName: string) {
		const createdProductData = await this.productsPage.getDataByName(productName);
		return createdProductData;
	}

}
