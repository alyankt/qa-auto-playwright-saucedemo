import { test, expect } from '@playwright/test';

import { users } from '../fixtures/users';
import { LoginPage } from '../pages/login.page';
import { InventoryPage } from '../pages/inventory.page';
import { CartPage } from '../pages/cart.page';

let loginPage: LoginPage;
let inventoryPage: InventoryPage;
let cartPage: CartPage;

test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    inventoryPage = new InventoryPage(page);
    cartPage = new CartPage(page);

    await loginPage.open();
    await loginPage.login(users.standard.username, users.standard.password);
});

test('Пользователь может добавить товар в корзину', async () => {
    await inventoryPage.addBackpackToCart();

    await expect(inventoryPage.cartBadge).toHaveText('1');
});

test('Добавленный товар отображается в корзине', async ({ page }) => {
    await inventoryPage.addBackpackToCart();
    await inventoryPage.openCart();

    await expect(page).toHaveURL(/cart/);
    await expect(cartPage.title).toHaveText('Your Cart');
    await expect(cartPage.backpackName).toHaveText('Sauce Labs Backpack');
});

test('Пользователь может удалить товар из корзины', async () => {
    await inventoryPage.addBackpackToCart();
    await inventoryPage.openCart();
    await cartPage.removeBackpack();

    await expect(cartPage.cartItems).toHaveCount(0);
});