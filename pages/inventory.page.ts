import { type Locator, type Page } from '@playwright/test';

export class InventoryPage {
    readonly page: Page;
    readonly title: Locator;
    readonly productItems: Locator;
    readonly sortSelect: Locator;
    readonly backpackLink: Locator;
    readonly addBackpackButton: Locator;
    readonly cartLink: Locator;
    readonly cartBadge: Locator;

    constructor(page: Page) {
        this.page = page;
        this.title = page.locator('[data-test="title"]');
        this.productItems = page.locator('[data-test="inventory-item"]');
        this.sortSelect = page.locator('[data-test="product-sort-container"]');
        this.backpackLink = page.locator('[data-test="item-4-title-link"]');
        this.addBackpackButton = page.locator('[data-test="add-to-cart-sauce-labs-backpack"]');
        this.cartLink = page.locator('[data-test="shopping-cart-link"]');
        this.cartBadge = page.locator('[data-test="shopping-cart-badge"]');
    }

    async sortByPriceLowToHigh() {
        await this.sortSelect.selectOption('lohi');
    }

    async openBackpackProduct() {
        await this.backpackLink.click();
    }

    async addBackpackToCart() {
    await this.addBackpackButton.click();
    }

    async openCart() {
    await this.cartLink.click();
    }
}