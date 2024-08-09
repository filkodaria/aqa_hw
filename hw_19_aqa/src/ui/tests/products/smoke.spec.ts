import { generateNewProduct } from '../../../data/products/generateProduct.js';
import { AddProductService } from '../../services/products/addNewProduct.service.js';
import { ProductListService } from '../../services/products/products.service.js';
import { LoginService } from '../../services/signIn/login.service.js';
import { HomeService } from '../../services/home/home.service.js';

describe('[UI] [Products] Smoke tests', () => {
	const userService = new LoginService();
	const homeService = new HomeService();
	const productsService = new ProductListService();
	const addProductService = new AddProductService();

	before(async () => {
		await browser.maximizeWindow();
	});

	beforeEach(async () => {
		await browser.url('https://anatoly-karpovich.github.io/aqa-course-project/#');

		await userService.adminLogin();
		await homeService.openProductsPage();
	});

	afterEach(async () => {
		await userService.signOut();
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
