// Task 1.
/*
Разработать тест со следующими шагами:
  - открыть https://the-internet.herokuapp.com/
  - перейти на страницу Dynamic Loading
  - Дождаться появления каждой ссылки на странице (их 2)
  - кликнуть по ссылке Example 1: Element on page that is hidden
  - дождаться появления кнопки start
  - кликнуть по кнопке start
  - дождаться появления текста "Hello World!" в теге h4 с помощью метода waitForElementWithText(), который вам надо разработать!:)
*/

describe.skip('Dynamic Loading link', () => {
  const initialUrl = 'https://the-internet.herokuapp.com/';
  const dynamicLoadingLinkSelector = 'a[href="/dynamic_loading"]';
  const example_1LinkSelector = `a[href='/dynamic_loading/1']`;
  const example_2LinkSelector = `a[href='/dynamic_loading/2']`;
  const startButtonSelector = '#start button';
  const finishLoadingSelector = '#finish h4';

  before(async () => {
    await browser.maximizeWindow();
  });

  beforeEach(async () => {
    await browser.url(initialUrl);
    const dynamicLoadingLink = await $(dynamicLoadingLinkSelector);

    await dynamicLoadingLink.waitForExist();
    await dynamicLoadingLink.click();
  })

  it('Check access to Start button', async () => {
    const example_1Link = await $(example_1LinkSelector);
    const example_2Link = await $(example_2LinkSelector);

    await example_1Link.waitForDisplayed();
    await example_2Link.waitForDisplayed();
    await example_1Link.click();

    const startButton = await $(startButtonSelector);
    await startButton.waitForDisplayed();
    await startButton.click();

    await waitForElementWithText(finishLoadingSelector, 'Hello World!', 10000);
    await browser.pause(1000);
  });
});

/*
 Создать функцию waitForElementWithText(selector, text, timeout) для ожидания определенного текста (text) 
 у элемента с определенным селектором (selector) на протяжении определенного времени (timeout):
  - Использовать browser.waitUntil с комбинацией проверок (элемент виден и текст верный)
  - Добавить понятный timeoutMsg, с пояснением какие проверки не пройдены и селектором элемента
*/

async function waitForElementWithText(selector: string, text: string, timeout: number) {
  await browser.waitUntil(async () => {
    const element = await $(selector);
    const elementText = await element.getText();
    return (await element.isDisplayed() && elementText === text);
  },
  {
    timeout, 
    timeoutMsg: `Element with text "${text}" not found.`,
    interval: 1000,
  })
}
