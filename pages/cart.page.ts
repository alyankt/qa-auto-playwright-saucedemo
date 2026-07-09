import { type Locator, type Page } from '@playwright/test';

export class CartPage {
    readonly page: Page;
    readonly title: Locator;
    readonly cartItems: Locator;
    readonly backpackName: Locator;
    readonly removeBackpackButton: Locator;
    readonly checkoutButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.title = page.locator('[data-test="title"]');
        this.cartItems = page.locator('[data-test="inventory-item"]');
        this.backpackName = page.locator('[data-test="inventory-item-name"]');
        this.removeBackpackButton = page.locator('[data-test="remove-sauce-labs-backpack"]');
        this.checkoutButton = page.locator('[data-test="checkout"]');
    }

    async removeBackpack() {
        await this.removeBackpackButton.click();
    }

    async startCheckout() {
        await this.checkoutButton.click();
    }
}