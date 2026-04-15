import { test } from '@playwright/test';
import { login, openLoginPage } from '../qa-library/actions';
import { loginAsLockedOutUser, loginAsStandardUser } from '../qa-library/flows';
import { validateLoginError } from '../qa-library/validations';
import { loginErrorMessages } from '../qa-library/utils';
import { invalidLoginData, users } from '../test-data/users';

test.describe('Login Module', () => {
  test('TC_LOGIN_001 - Login with valid standard user', async ({ page }) => {
    await loginAsStandardUser(page);
  });

  test('TC_LOGIN_002 - Login with invalid password', async ({ page }) => {
    await login(page, users.standard.username, invalidLoginData.wrongPassword);
    await validateLoginError(page, loginErrorMessages.invalidCredentials);
  });

  test('TC_LOGIN_003 - Login with locked out user', async ({ page }) => {
    await loginAsLockedOutUser(page);
    await validateLoginError(page, loginErrorMessages.lockedOut);
  });

  test('TC_LOGIN_004 - Login with blank username', async ({ page }) => {
    await login(page, invalidLoginData.blankUsername, users.standard.password);
    await validateLoginError(page, loginErrorMessages.usernameRequired);
  });

  test('TC_LOGIN_005 - Login with blank password', async ({ page }) => {
    await login(page, users.standard.username, invalidLoginData.blankPassword);
    await validateLoginError(page, loginErrorMessages.passwordRequired);
  });

  test('TC_LOGIN_006 - Login page loads correctly', async ({ page }) => {
    const loginPage = await openLoginPage(page);

    await loginPage.expectLoginPageLoaded();
  });
});
