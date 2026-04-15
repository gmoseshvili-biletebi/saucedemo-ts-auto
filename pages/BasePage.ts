import { expect, Locator, Page } from '@playwright/test';

export class BasePage {
  constructor(protected readonly page: Page) {}

  protected getByTestId(testId: string): Locator {
    return this.page.getByTestId(testId);
  }

  async visit(path: string): Promise<void> {
    await this.page.goto(path);
  }

  async fillByTestId(testId: string, value: string): Promise<void> {
    await this.getByTestId(testId).fill(value);
  }

  async clickByTestId(testId: string): Promise<void> {
    await this.getByTestId(testId).click();
  }

  async expectUrlContains(path: string): Promise<void> {
    await expect(this.page).toHaveURL(new RegExp(`${path.replace('.', '\\.')}$`));
  }

  async expectPageTitle(expectedTitle: string): Promise<void> {
    await expect(this.getByTestId('title')).toHaveText(expectedTitle);
  }

  async getCartBadgeCount(): Promise<number> {
    const badge = this.getByTestId('shopping-cart-badge');

    if (!(await badge.isVisible().catch(() => false))) {
      return 0;
    }

    return Number(await badge.textContent());
  }

  async openMenu(): Promise<void> {
    await this.page.locator('#react-burger-menu-btn').click();
    await expect(this.getByTestId('logout-sidebar-link')).toBeVisible();
  }

  async logout(): Promise<void> {
    await this.openMenu();
    await this.clickByTestId('logout-sidebar-link');
  }
}
