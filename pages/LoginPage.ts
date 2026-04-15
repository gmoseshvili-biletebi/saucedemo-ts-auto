import { expect } from '@playwright/test';
import { BasePage } from './BasePage';
import { appRoutes } from '../qa-library/utils';

export class LoginPage extends BasePage {
  private readonly usernameInput = this.getByTestId('username');
  private readonly passwordInput = this.getByTestId('password');
  private readonly loginButton = this.getByTestId('login-button');
  private readonly errorMessage = this.getByTestId('error');

  async open(): Promise<void> {
    await this.visit(appRoutes.login);
  }

  async login(username: string, password: string): Promise<void> {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  async expectLoginPageLoaded(): Promise<void> {
    await expect(this.usernameInput).toBeVisible();
    await expect(this.passwordInput).toBeVisible();
    await expect(this.loginButton).toBeVisible();
  }

  async expectErrorMessage(expectedMessage: string): Promise<void> {
    await expect(this.errorMessage).toContainText(expectedMessage);
  }

  async clearCredentials(): Promise<void> {
    await this.usernameInput.clear();
    await this.passwordInput.clear();
  }
}
