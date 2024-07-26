/*
- Установить WebdriverIO командой  npm init wdio@latest .
- Создать файл для теста с названием register.spec.ts
- Добавить во wdio.conf.ts путь к файлу с тестом в массив specs

Разработайте тест со следующими шагами:
1. Открыть страницу https://anatoly-karpovich.github.io/demo-login-form/ используя browser.url()
2. Кликнуть по кнопке Register методом . click()
3. Ввести валидные username/password (требования ниже) методом setValue()
4. Кликнуть Register
5. Завалидировать, верную нотификацию о регистрации методом .toHaveText()

Написать 2 тест-сьюта:
1. Тесты на регистрацию
2. Тесты на логин
Сайт тот же, что и в Таск 1.

Requirements:
Страница регистрации ->
Username: обязательное, от 3 до 40 символов включительно, запрещены префиксные/постфиксные пробелы, как и имя состоящее из одних пробелов
Password: обязательное, от 8 до 20 символов включительно, необходима хотя бы одна буква в верхнем и нижнем регистрах, пароль из одних пробелов запрещен

Страница логина ->
Username: обязательное
Password: обязательное
*/

describe('Registration form', () => {
	
	const initialUrl = 'https://anatoly-karpovich.github.io/demo-login-form/';

	const validUsername = [
		'Daria Filko_88',                               // username
		'Dar',                                          // username_3symb
		'qwertyuiopasdfghjklzxcvbnmqwertyuiopasdf',     // username_40symb
		'qwertyuiopasdfghjklzxcvbnmqwertyuiopasd11',    // username_41symb -> it's not possible to type 41st
	];

	const validPassword = [
		'12345_D@ria_6789',                             // password
		'12345Dar',                                     // password_8symb
		'123_Daria_456 qwerty',                         // password_20symb
		'123_Daria_456 qwert11',                        // password_21symb -> it's not possible to type 21st
	];
	
	const invalidUsername = [
		'Da',                                           // username_2symb:
		' ',                                            // username_space
		' Daria',                                       // username_pref
		'Daria ',                                       // username_postf
		'',                                             // username_empty
	];

	const invalidPassword = [
		'12345Da',                                      // password_7symb
		' ',                                            // password_space
		'12345678DD',                                   // password_upper
		'12345678dd',                                   // password_lower
		'',                                             // password_empty
	];

	const selRegisterButtonOnLogin = 'input#registerOnLogin';
	const selFormTitleOnLogin = 'h2#loginForm';
	const selFormTitleOnRegister = 'h2#registerForm';
	const selUsernameInputOnRegister = 'input#userNameOnRegister';
	const selPasswordInputOnRegister = 'input#passwordOnRegister';
	const selRegisterButtonOnRegister = 'input#register';

	before(async () => {
		await browser.maximizeWindow();
	});

	beforeEach(async () => {
		await browser.url(initialUrl);

		const registerButton = await $(selRegisterButtonOnLogin);
		await registerButton.click();

		const registrationFormTitle = await $(selFormTitleOnRegister);
		expect(registrationFormTitle).toHaveText('Registration');
	});
	
	afterEach(async () => {
		await browser.pause(2000);
	});
	
	context('Positive scenarios', () => {
		for (let i = 0; i < validUsername.length; i++) {
			it('Registration with valid Username & Password', async () => {
				const usernameInput = await $(selUsernameInputOnRegister);
				await usernameInput.setValue(validUsername[i]);

				const passwordInput = await $(selPasswordInputOnRegister);
				await passwordInput.setValue(validPassword[i]);

				const registerButton = await $(selRegisterButtonOnRegister);
				await registerButton.click();

				const successInfoMessage = await $('h4#errorMessageOnRegister');
				const successText = await successInfoMessage.getText();
				expect(successText.includes('Successfully')).toBeTruthy();
			});
		}

		it('Check Back button on Registration form', async () => {
			const backButton = await $('input#backOnRegister');
			await backButton.click();
			const selLoginFormTitle = await $(selFormTitleOnLogin);
			expect(selLoginFormTitle).toHaveText('Login');
		})

	});

	context('Negative scenarios', () => {
		for (let i = 0; i < invalidUsername.length; i++) {
			it('Registration with invalid Username & valid Password', async () => {
				const randomNumber = Math.floor(Math.random() * validPassword.length);
				const randomValidPassword = validPassword[randomNumber];

				const usernameInput = await $(selUsernameInputOnRegister);
				await usernameInput.setValue(invalidUsername[i]);

				const passwordInput = await $(selPasswordInputOnRegister);
				await passwordInput.setValue(randomValidPassword);

				const registerButton = await $(selRegisterButtonOnRegister);
				await registerButton.click();

				const errorInfoMessage = await $('h4#errorMessageOnRegister');
				const errorText = await errorInfoMessage.getText();
				expect(!(errorText.includes('Successfully'))).toBeTruthy();
			});
		}

		for (let i = 0; i < invalidPassword.length; i++) {
			it('Registration with valid Username & invalid Password', async () => {
				const randomNumber = Math.floor(Math.random() * validUsername.length);
				const randomValidUsername = 1 + validUsername[randomNumber];

				const usernameInput = await $(selUsernameInputOnRegister);
				await usernameInput.setValue(randomValidUsername);

				const passwordInput = await $(selPasswordInputOnRegister);
				await passwordInput.setValue(invalidPassword[i]);

				const registerButton = await $(selRegisterButtonOnRegister);
				await registerButton.click();

				const errorInfoMessage = await $('h4#errorMessageOnRegister');
				const errorText = await errorInfoMessage.getText();
				expect(!(errorText.includes('Successfully'))).toBeTruthy();
			});
			// TODO -> bug has been catched -> password field validates w/o uppercase letter
		}

		it('Registration with already registered user data', async () => {
			const randomNumber = Math.floor(Math.random() * validUsername.length);
			const randomValidUsername = 2 + validUsername[randomNumber];
			const randomValidPassword = validPassword[randomNumber];

			const usernameInput = await $(selUsernameInputOnRegister);
			await usernameInput.setValue(randomValidUsername);

			const passwordInput = await $(selPasswordInputOnRegister);
			await passwordInput.setValue(randomValidPassword);

			const registerButton = await $(selRegisterButtonOnRegister);
			await registerButton.click();

			const successInfoMessage = await $('h4#errorMessageOnRegister');
			const successText = await successInfoMessage.getText();
			expect(successText.includes('Successfully')).toBeTruthy();
			await browser.pause(1000);

			await registerButton.click();
			const errorInfoMessage = await $('h4#errorMessageOnRegister');
			const errorText = await errorInfoMessage.getText();
			expect(errorText.includes('Username is in use')).toBeTruthy();
		});

	});

});


describe('Login form', () => {

	const initialUrl = 'https://anatoly-karpovich.github.io/demo-login-form/';

	const validData = {
		username: 'Daria Filko',
		password: '123_D@ria_321',
	}
	
	const invalidData = [
		{
			username: validData.username,            // valid username & invalid password(empty)
			password: '',
		},
		{
			username: '',                            // invalid username(empty) & valid password
			password: validData.password,
		},
	];

	const selRegisterButtonOnLogin = 'input#registerOnLogin';
	const selFormTitleOnRegister = 'h2#registerForm';
	const selUsernameInputOnRegister = 'input#userNameOnRegister';
	const selPasswordInputOnRegister = 'input#passwordOnRegister';
	const selRegisterButtonOnRegister = 'input#register';

	const selFormTitleOnLogin = 'h2#loginForm';
	const selUsernameInputOnLogin = 'input#userName';
	const selPasswordInputOnLogin = 'input#password';
	const selSubmitButtonOnLogin = 'input#submit';

	before(async () => {
		await browser.maximizeWindow();
	});

	beforeEach(async () => {
		await browser.url(initialUrl);

		const registerButton = await $(selRegisterButtonOnLogin);
		await registerButton.click();

		const registrationFormTitle = await $(selFormTitleOnRegister);
		expect(registrationFormTitle).toHaveText('Registration');
	});
	
	afterEach(async () => {
		await browser.pause(2000);
	});
	
	context('Positive scenarios', () => {
		it('Login with valid Username & Password', async () => {
			const usernameInputOnRegister = await $(selUsernameInputOnRegister);
			await usernameInputOnRegister.setValue(validData.username);

			const passwordInputonRegister = await $(selPasswordInputOnRegister);
			await passwordInputonRegister.setValue(validData.password);

			const registerButtonOnRegister = await $(selRegisterButtonOnRegister);
			await registerButtonOnRegister.click();

			const successInfoMessageonRegister = await $('h4#errorMessageOnRegister');
			const successTextonRegister = await successInfoMessageonRegister.getText();
			expect(successTextonRegister.includes('Successfully')).toBeTruthy();
			await browser.pause(2000);

			const backButton = await $('input#backOnRegister');
			await backButton.click();
			const selLoginFormTitle = await $(selFormTitleOnLogin);
			expect(selLoginFormTitle).toHaveText('Login');

			const usernameInputOnLogin = await $(selUsernameInputOnLogin);
			await usernameInputOnLogin.setValue(validData.username);

			const passwordInputOnLogin = await $(selPasswordInputOnLogin);
			await passwordInputOnLogin.setValue(validData.password);

			const submitButton = await $(selSubmitButtonOnLogin);
			await submitButton.click();

			const successInfoMessageOnLogin = await $('h4#successMessage');
			const successTextOnLogin = await successInfoMessageOnLogin.getText();
			expect(successTextOnLogin.includes(`Hello, ${validData.username}!`)).toBeTruthy();
		});
	});

	context('Negative scenarios', () => {
		for (const creds of invalidData) {
			it('Login with empty Username or Password', async () => {
				const randomNumber = Math.floor(Math.random() * 1000);
				const username = validData.username + randomNumber;
				const password = validData.password + randomNumber;

				const usernameInputOnRegister = await $(selUsernameInputOnRegister);
				await usernameInputOnRegister.setValue(username);

				const passwordInputonRegister = await $(selPasswordInputOnRegister);
				await passwordInputonRegister.setValue(password);

				const registerButtonOnRegister = await $(selRegisterButtonOnRegister);
				await registerButtonOnRegister.click();

				const successInfoMessageonRegister = await $('h4#errorMessageOnRegister');
				const successTextonRegister = await successInfoMessageonRegister.getText();
				expect(successTextonRegister.includes('Successfully')).toBeTruthy();
				await browser.pause(2000);

				const backButton = await $('input#backOnRegister');
				await backButton.click();
				const selLoginFormTitle = await $(selFormTitleOnLogin);
				expect(selLoginFormTitle).toHaveText('Login');

				const usernameInputOnLogin = await $(selUsernameInputOnLogin);
				if (creds.username === '') {
					await usernameInputOnLogin.setValue(creds.username);
				} else {
					await usernameInputOnLogin.setValue(username);
				}

				const passwordInputOnLogin = await $(selPasswordInputOnLogin);
				if (creds.password === '') {
					await passwordInputOnLogin.setValue(creds.password);
				} else {
					await passwordInputOnLogin.setValue(password);
				}

				const submitButton = await $(selSubmitButtonOnLogin);
				await submitButton.click();

				const errorInfoMessageOnLogin = await $('h4#errorMessage');
				const errorTextOnLogin = await errorInfoMessageOnLogin.getText();
				expect(errorTextOnLogin.includes('is required')).toBeTruthy();
			});
		}

		for (const creds of invalidData) {
			it('Login with invalid Username or Password', async () => {
				const randomNumber = Math.floor(Math.random() * 100);
				const username = validData.username + randomNumber;
				const password = validData.password + randomNumber;

				const usernameInputOnRegister = await $(selUsernameInputOnRegister);
				await usernameInputOnRegister.setValue(username);

				const passwordInputonRegister = await $(selPasswordInputOnRegister);
				await passwordInputonRegister.setValue(password);

				const registerButtonOnRegister = await $(selRegisterButtonOnRegister);
				await registerButtonOnRegister.click();

				const successInfoMessageonRegister = await $('h4#errorMessageOnRegister');
				const successTextonRegister = await successInfoMessageonRegister.getText();
				expect(successTextonRegister.includes('Successfully')).toBeTruthy();
				await browser.pause(2000);

				const backButton = await $('input#backOnRegister');
				await backButton.click();
				const selLoginFormTitle = await $(selFormTitleOnLogin);
				expect(selLoginFormTitle).toHaveText('Login');

				const usernameInputOnLogin = await $(selUsernameInputOnLogin);
				if (creds.username === '') {
					await usernameInputOnLogin.setValue(randomNumber + username);
				} else {
					await usernameInputOnLogin.setValue(username);
				}

				const passwordInputOnLogin = await $(selPasswordInputOnLogin);
				if (creds.password === '') {
					await passwordInputOnLogin.setValue(randomNumber + password);
				} else {
					await passwordInputOnLogin.setValue(password);
				}

				const submitButton = await $(selSubmitButtonOnLogin);
				await submitButton.click();

				const errorInfoMessageOnLogin = await $('h4#errorMessage');
				const errorTextOnLogin = await errorInfoMessageOnLogin.getText();
				expect(errorTextOnLogin.includes('Invalid credentials')).toBeTruthy();
			});
		}
	});

});
