import { IProduct, MANUFACTURERS } from "../types/products.types.js";

export function generateNewProduct() {
	const productToCreate: IProduct = {
		name: 'Test' + Date.now(),
		manufacturer: MANUFACTURERS.XIAOMI,
		price: 100,
		amount: 1,
		notes: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
	};
	return productToCreate;
}
