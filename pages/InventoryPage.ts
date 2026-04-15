import { expect } from '@playwright/test';
import { BasePage } from './BasePage';
import { appRoutes } from '../qa-library/utils';
import { CartPage } from './CartPage';

export class InventoryPage extends BasePage {
  private readonly shoppingCartLink = this.getByTestId('shopping-cart-link');
  private readonly inventoryContainer = this.getByTestId('inventory-container');
  private readonly sortDropdown = this.getByTestId('product-sort-container');
  private readonly inventoryItems = this.page.locator('.inventory_item');
  private readonly inventoryPrices = this.page.locator('.inventory_item_price');

  async expectLoaded(): Promise<void> {
    await this.expectUrlContains(appRoutes.inventory);
    await expect(this.inventoryContainer).toBeVisible();
    await this.expectPageTitle('Products');
    await expect(this.shoppingCartLink).toBeVisible();
  }

  async addProductToCart(productName: string): Promise<void> {
    await this.clickByTestId(`add-to-cart-${this.toProductSlug(productName)}`);
  }

  async removeProductFromCart(productName: string): Promise<void> {
    await this.clickByTestId(`remove-${this.toProductSlug(productName)}`);
  }

  async openCart(): Promise<CartPage> {
    await this.shoppingCartLink.click();

    return new CartPage(this.page);
  }

  async expectProductVisible(productName: string): Promise<void> {
    await expect(this.page.getByText(productName, { exact: true })).toBeVisible();
  }

  async expectProductAddedToCart(productName: string): Promise<void> {
    await expect(this.getByTestId(`remove-${this.toProductSlug(productName)}`)).toBeVisible();
  }

  async expectProductRemovedFromCart(productName: string): Promise<void> {
    await expect(this.getByTestId(`add-to-cart-${this.toProductSlug(productName)}`)).toBeVisible();
  }

  async sortProducts(sortValue: 'az' | 'za' | 'lohi' | 'hilo'): Promise<void> {
    await this.sortDropdown.selectOption(sortValue);
  }

  async expectInventoryItemCount(expectedCount: number): Promise<void> {
    await expect(this.inventoryItems).toHaveCount(expectedCount);
  }

  async getDisplayedPrices(): Promise<number[]> {
    const prices = await this.inventoryPrices.allTextContents();

    return prices.map((price) => Number(price.replace('$', '').trim()));
  }

  private toProductSlug(productName: string): string {
    return productName.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-');
  }
}
