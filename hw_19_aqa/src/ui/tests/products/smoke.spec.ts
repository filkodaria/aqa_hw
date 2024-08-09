import { generateNewProduct } from '../../../data/products/generateProduct.js';
import { AddProductService } from '../../services/products/addNewProduct.service.js';
import { ProductListService } from '../../services/products/products.service.js';

describe('[UI] [Products] Smoke tests', () => {
	const productsService = new ProductListService();
	const addProductService = new AddProductService();

	before(async () => {
		await browser.maximizeWindow();
	});

	beforeEach(async () => {
		await browser.url('https://anatoly-karpovich.github.io/aqa-course-project/#');

		await $('#emailinput').setValue('aqacourse@gmail.com');
		await $('#passwordinput').setValue('password');
		await $('button.btn-lg').click();
		await $('div.spinner-border').waitForDisplayed({ reverse: true });	

		await $('button#products-from-home').click();
		await $('div.spinner-border').waitForDisplayed({ reverse: true });	

		expect('h2.ml-20').toHaveText('Products List');
	});

	it('Check a new product creation', async () => {
		await productsService.openAddNewProductPage();

		const product = generateNewProduct();
		await addProductService.createNewProduct(product);

		const actualProduct = await productsService.getCreatedProduct(product.name);
		const expectedProduct = { name: product.name, manufacturer: product.manufacturer, price: product.price };

		expect(actualProduct).toMatchObject(expectedProduct);
		await browser.pause(3000);

	});

})

/*
SignIn.openSalesPortal()
SignIn.login()
Home.openProductPage()
Products.openAddNewProductPage()
AddNewProduct.create()
...assertions
*/
