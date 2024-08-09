const TIMEOUT_5_SEC = 5000;

export abstract class BasePage {
	private async findElement(selector: string) {
		return await $(selector);
	}

	protected async waitForElementDisplayed(selector: string, timeout = TIMEOUT_5_SEC, reverse = false) {
		const element = await this.findElement(selector);
		await element.waitForDisplayed({ timeout, reverse });
		return element;
	}

	protected async waitForElementEnabled(selector: string, timeout = TIMEOUT_5_SEC, reverse = false) {
		const element = await this.waitForElementDisplayed(selector);
		await element.waitForEnabled({ timeout, reverse });
		return element;
	}

	protected async clickOnElement(selector: string, timeout = TIMEOUT_5_SEC, reverse = false) {
		const element = await this.waitForElementDisplayed(selector, timeout, reverse);
		await element.click();
	}

	protected async clickOnElementEnabled(selector: string, timeout = TIMEOUT_5_SEC, reverse = false) {
		const element = await this.waitForElementEnabled(selector, timeout, reverse);
		await element.click();
	}

	protected async setInputValue(selector: string, value: string | number, timeout = TIMEOUT_5_SEC) {
		const element = await this.waitForElementDisplayed(selector, timeout);
		await element.setValue(value);
	}

	protected async getElementText(selector: string, timeout = TIMEOUT_5_SEC) {
		const element = await this.waitForElementDisplayed(selector, timeout);
		const text = await element.getText();
		return text;
	}

	protected async selectDropdownValue(dropdownSelector: string, value: string | number, timeout = TIMEOUT_5_SEC) {
		const element = await this.waitForElementDisplayed(dropdownSelector, timeout);
		await element.selectByVisibleText(value);
	}

}
