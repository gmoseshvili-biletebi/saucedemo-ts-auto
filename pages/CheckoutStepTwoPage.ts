import { expect } from '@playwright/test';
import { BasePage } from './BasePage';
import { appRoutes } from '../qa-library/utils';
import { CheckoutCompletePage } from './CheckoutCompletePage';
import { InventoryPage } from './InventoryPage';

export class CheckoutStepTwoPage extends BasePage {
  private readonly finishButton = this.getByTestId('finish');
  private readonly cancelButton = this.getByTestId('cancel');
  private readonly checkoutSummary = this.getByTestId('checkout-summary-container');
  private readonly paymentInformation = this.getByTestId('payment-info-value');
  private readonly shippingInformation = this.getByTestId('shipping-info-value');
  private readonly totalLabel = this.getByTestId('total-label');

  async expectLoaded(): Promise<void> {
    await this.expectUrlContains(appRoutes.checkoutStepTwo);
    await expect(this.checkoutSummary).toBeVisible();
    await this.expectPageTitle('Checkout: Overview');
  }

  async finish(): Promise<CheckoutCompletePage> {
    await this.finishButton.click();

    return new CheckoutCompletePage(this.page);
  }

  async cancel(): Promise<InventoryPage> {
    await this.cancelButton.click();

    return new InventoryPage(this.page);
  }

  async expectProductVisible(productName: string): Promise<void> {
    await expect(this.page.getByText(productName, { exact: true })).toBeVisible();
  }

  async expectPaymentInformation(expectedText: string): Promise<void> {
    await expect(this.paymentInformation).toHaveText(expectedText);
  }

  async expectShippingInformation(expectedText: string): Promise<void> {
    await expect(this.shippingInformation).toHaveText(expectedText);
  }

  async expectTotalContains(expectedText: string): Promise<void> {
    await expect(this.totalLabel).toContainText(expectedText);
  }
}
