import { test, expect } from '@playwright/test';

import { users } from '../fixtures/users';
import { LoginPage } from '../pages/login.page';
import { InventoryPage } from '../pages/inventory.page';

let loginPage: LoginPage;
let inventoryPage: InventoryPage;

test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    inventoryPage = new InventoryPage(page);

    await loginPage.open();
    await loginPage.login(users.standard.username, users.standard.password);
});

test('Пользователь видит список товаров после входа', async () => {
    await expect(inventoryPage.title).toHaveText('Products');
    await expect(inventoryPage.productItems).toHaveCount(6);
});

test('Пользователь может отсортировать товары по цене от меньшей к большей', async ({ page }) => {
    await inventoryPage.sortByPriceLowToHigh();

    const prices = await page.locator('[data-test="inventory-item-price"]').allTextContents();
    const numericPrices = prices.map((price) => Number(price.replace('$', '')));

    expect(numericPrices).toEqual([...numericPrices].sort((a, b) => a - b));
});

test('Пользователь может открыть карточку товара', async ({ page }) => {
    await inventoryPage.openBackpackProduct();

    await expect(page).toHaveURL(/inventory-item/);
    await expect(page.locator('[data-test="inventory-item-name"]')).toHaveText('Sauce Labs Backpack');
});