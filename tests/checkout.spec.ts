import { test, expect } from '@playwright/test';

import { users } from '../fixtures/users';
import { checkoutData } from '../fixtures/checkout-data';
import { LoginPage } from '../pages/login.page';
import { InventoryPage } from '../pages/inventory.page';
import { CartPage } from '../pages/cart.page';
import { CheckoutPage } from '../pages/checkout.page';

let loginPage: LoginPage;
let inventoryPage: InventoryPage;
let cartPage: CartPage;
let checkoutPage: CheckoutPage;

test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    inventoryPage = new InventoryPage(page);
    cartPage = new CartPage(page);
    checkoutPage = new CheckoutPage(page);

    await loginPage.open();
    await loginPage.login(users.standard.username, users.standard.password);
    await inventoryPage.addBackpackToCart();
    await inventoryPage.openCart();
    await cartPage.startCheckout();
});

test('Пользователь не может продолжить оформление без имени', async () => {
    await checkoutPage.fillCustomerInfo('', checkoutData.validCustomer.lastName, checkoutData.validCustomer.postalCode);
    await checkoutPage.continueCheckout();

    await expect(checkoutPage.errorMessage).toContainText('First Name is required');
});

test('Пользователь не может продолжить оформление без фамилии', async () => {
    await checkoutPage.fillCustomerInfo(checkoutData.validCustomer.firstName, '', checkoutData.validCustomer.postalCode);
    await checkoutPage.continueCheckout();

    await expect(checkoutPage.errorMessage).toContainText('Last Name is required');
});

test('Пользователь не может продолжить оформление без почтового индекса', async () => {
    await checkoutPage.fillCustomerInfo(checkoutData.validCustomer.firstName, checkoutData.validCustomer.lastName, '');
    await checkoutPage.continueCheckout();

    await expect(checkoutPage.errorMessage).toContainText('Postal Code is required');
});

test('Пользователь может успешно оформить заказ', async ({ page }) => {
    await checkoutPage.fillCustomerInfo(
        checkoutData.validCustomer.firstName,
        checkoutData.validCustomer.lastName,
        checkoutData.validCustomer.postalCode,
    );
    await checkoutPage.continueCheckout();

    await expect(page).toHaveURL(/checkout-step-two/);
    await expect(checkoutPage.title).toHaveText('Checkout: Overview');
    await expect(checkoutPage.itemName).toHaveText('Sauce Labs Backpack');

    await checkoutPage.finishCheckout();

    await expect(page).toHaveURL(/checkout-complete/);
    await expect(checkoutPage.title).toHaveText('Checkout: Complete!');
    await expect(checkoutPage.completeHeader).toHaveText('Thank you for your order!');
});