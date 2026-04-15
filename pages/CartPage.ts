import { expect } from '@playwright/test';
import { BasePage } from './BasePage';
import { appRoutes } from '../qa-library/utils';
import { CheckoutStepOnePage } from './CheckoutStepOnePage';
import { InventoryPage } from './InventoryPage';

export class CartPage extends BasePage {
  private readonly checkoutButton = this.getByTestId('checkout');
  private readonly continueShoppingButton = this.getByTestId('continue-shopping');
  private readonly cartList = this.getByTestId('cart-list');

  async expectLoaded(): Promise<void> {
    await this.expectUrlContains(appRoutes.cart);
    await expect(this.cartList).toBeVisible();
    await this.expectPageTitle('Your Cart');
  }

  async removeProduct(productName: string): Promise<void> {
    await this.clickByTestId(`remove-${this.toProductSlug(productName)}`);
  }

  async proceedToCheckout(): Promise<CheckoutStepOnePage> {
    await this.checkoutButton.click();

    return new CheckoutStepOnePage(this.page);
  }

  async continueShopping(): Promise<InventoryPage> {
    await this.continueShoppingButton.click();

    return new InventoryPage(this.page);
  }

  async expectProductInCart(productName: string): Promise<void> {
    await expect(this.page.getByText(productName, { exact: true })).toBeVisible();
  }

  async expectProductNotInCart(productName: string): Promise<void> {
    await expect(this.page.getByText(productName, { exact: true })).toHaveCount(0);
  }

  async expectCartItemCount(expectedCount: number): Promise<void> {
    await expect(this.page.locator('.cart_item')).toHaveCount(expectedCount);
  }

  private toProductSlug(productName: string): string {
    return productName.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-');
  }
}
