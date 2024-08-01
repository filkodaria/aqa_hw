// Task 2.
/*
Разработать тест со следующими шагами:
 - Открыть url https://anatoly-karpovich.github.io/aqa-course-project/#
 - Войти в приложения используя учетные данные aqacourse@gmail.com / password при этом:
 - проверить исчезновение спиннера с помощью waitFor* методов
 - проверить действительно ли пользователь с логином AQA User вошел в систему
 - Прокликать каждый элемент бокового меню, убедится что после клика background-color элемента не красный

 Рекомендации по использованию:
 - метод $$ поиска по всем элементам
 - for .. of  для перебора коллекции элементов 
 - метод click() для клика по элементу в цикле
 - Проверить background-color можно двумя способами:
    1. По CSS стилю.  element.getCSSProperty('background-color)  https://webdriver.io/docs/api/element/getCSSProperty
    2. По отсутствию класса, отвечающего за добавление красного бэкграунда.  element.getAttribute('class') https://webdriver.io/docs/api/element/getAttribute
*/

describe('1st test for Anatoly`s website', () => {
  const initialUrl = 'https://anatoly-karpovich.github.io/aqa-course-project/#';
    
  const emailInputSelector = 'input#emailinput';
  const passwordInputSelector = 'input#passwordinput';
  const loginButtonSelector = 'button.btn-lg';
  const spinnerIconSelector = 'div.spinner-border'

  const userCreds = {
    email: 'aqacourse@gmail.com',
    password: 'password',
  };

  before(async () => {
    await browser.maximizeWindow();
  });

  beforeEach(async () => {
    await browser.url(initialUrl);
    
    const emailInput = await $(emailInputSelector);
    await emailInput.setValue(userCreds.email);

    const passwordInput = await $(passwordInputSelector);
    await passwordInput.setValue(userCreds.password);

    const loginButton = await $(loginButtonSelector);
    await loginButton.click();

    await waitForSpinnerDisappearing(spinnerIconSelector, 5000);
  });

  // afterEach(async () => {
  //   const userMenuSelector = '//a/*[text()="AQA User"]';
  //   (await $(userMenuSelector)).click();

  //   const singOutDropdownSelector = 'a#signOut';
  //   (await $(singOutDropdownSelector)).click();
  // });

  afterEach(async () => {
    await browser.deleteCookie('Authorization');
    await browser.refresh();
  });

  it('Check a user is logged into the system', async () => {
    const userMenuSelector = 'a#dropdownUser1';
    const userMenu = await $(userMenuSelector);
    
    expect(userMenu).toHaveText('AQA User');
  });

  it('Check background color of active sidebar menu items isn`t red', async () => {
    const sidebarMenuItemsSelector = 'ul.nav a';
    const sidebarMenuItems = await $$(sidebarMenuItemsSelector);
    console.log(sidebarMenuItems)
    
    for (const elem of sidebarMenuItems) {
      await elem.click();

      await waitForSpinnerDisappearing(spinnerIconSelector, 5000);
    
      const backgroundcolor = await elem.getCSSProperty('background-color');
      expect(backgroundcolor.value).not.toEqual('rgba(220,53,69,1)');
    }
  });

});

async function waitForSpinnerDisappearing(selector: string, timeout: number) {
  const spinnerIcon = await $(selector);

  await spinnerIcon.waitForDisplayed({
    timeoutMsg: 'Spinner still displayed!',
    timeout,
    interval: 1000,
    reverse: true,
  });
}
