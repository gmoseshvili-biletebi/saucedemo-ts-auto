import { expect } from '@playwright/test';
import { BasePage } from './BasePage';
import { appRoutes } from '../qa-library/utils';
import { CartPage } from './CartPage';
import { CheckoutStepTwoPage } from './CheckoutStepTwoPage';

export interface CheckoutInformation {
  firstName: string;
  lastName: string;
  postalCode: string;
}

export class CheckoutStepOnePage extends BasePage {
  private readonly firstNameInput = this.getByTestId('firstName');
  private readonly lastNameInput = this.getByTestId('lastName');
  private readonly postalCodeInput = this.getByTestId('postalCode');
  private readonly continueButton = this.getByTestId('continue');
  private readonly cancelButton = this.getByTestId('cancel');
  private readonly errorMessage = this.getByTestId('error');

  async expectLoaded(): Promise<void> {
    await this.expectUrlContains(appRoutes.checkoutStepOne);
    await expect(this.firstNameInput).toBeVisible();
    await expect(this.lastNameInput).toBeVisible();
    await expect(this.postalCodeInput).toBeVisible();
    await this.expectPageTitle('Checkout: Your Information');
  }

  async fillCheckoutInformation(data: CheckoutInformation): Promise<void> {
    await this.firstNameInput.fill(data.firstName);
    await this.lastNameInput.fill(data.lastName);
    await this.postalCodeInput.fill(data.postalCode);
  }

  async continue(): Promise<CheckoutStepTwoPage> {
    await this.continueButton.click();

    return new CheckoutStepTwoPage(this.page);
  }

  async submitCheckoutInformation(data: CheckoutInformation): Promise<CheckoutStepTwoPage> {
    await this.fillCheckoutInformation(data);

    return this.continue();
  }

  async cancel(): Promise<CartPage> {
    await this.cancelButton.click();

    return new CartPage(this.page);
  }

  async expectErrorMessage(expectedMessage: string): Promise<void> {
    await expect(this.errorMessage).toContainText(expectedMessage);
  }
}
