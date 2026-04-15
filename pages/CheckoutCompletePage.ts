import { expect } from '@playwright/test';
import { BasePage } from './BasePage';
import { appRoutes } from '../qa-library/utils';
import { InventoryPage } from './InventoryPage';

export class CheckoutCompletePage extends BasePage {
  private readonly completeHeader = this.getByTestId('complete-header');
  private readonly completeText = this.getByTestId('complete-text');
  private readonly backHomeButton = this.getByTestId('back-to-products');

  async expectLoaded(): Promise<void> {
    await this.expectUrlContains(appRoutes.checkoutComplete);
    await expect(this.completeHeader).toHaveText('Thank you for your order!');
    await expect(this.completeText).toBeVisible();
    await this.expectPageTitle('Checkout: Complete!');
  }

  async expectOrderCompletionMessage(): Promise<void> {
    await expect(this.completeHeader).toHaveText('Thank you for your order!');
    await expect(this.completeText).toContainText(
      'Your order has been dispatched, and will arrive just as fast as the pony can get there!'
    );
  }

  async backToHome(): Promise<InventoryPage> {
    await this.backHomeButton.click();

    return new InventoryPage(this.page);
  }
}
