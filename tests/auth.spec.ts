import { test, expect } from '@playwright/test';

import { users } from '../fixtures/users';
import { LoginPage } from '../pages/login.page';

let loginPage: LoginPage;

test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.open();
});

test('Пользователь может войти с валидными данными', async ({ page }) => {
    await loginPage.login(users.standard.username, users.standard.password);

    await expect(page).toHaveURL(/inventory/);
    await expect(page.locator('[data-test="title"]')).toHaveText('Products');
});

test('Пользователь не может войти с невалидным паролем', async () => {
    await loginPage.login(users.standard.username, users.wrongPassword);

    await expect(loginPage.errorMessage).toContainText('Username and password do not match');
});

test('Пользователь не может войти без логина', async () => {
    await loginPage.login('', users.standard.password);

    await expect(loginPage.errorMessage).toContainText('Username is required');
});

test('Пользователь не может войти без пароля', async () => {
    await loginPage.login(users.standard.username, '');

    await expect(loginPage.errorMessage).toContainText('Password is required');
});

test('Заблокированный пользователь не может войти', async () => {
    await loginPage.login(users.lockedOut.username, users.lockedOut.password);

    await expect(loginPage.errorMessage).toContainText('Sorry, this user has been locked out');
});

