import { expect, Page } from '@playwright/test';
import { BasePage } from '../pages/BasePage';
import { CartPage } from '../pages/CartPage';
import { CheckoutCompletePage } from '../pages/CheckoutCompletePage';
import { CheckoutStepOnePage } from '../pages/CheckoutStepOnePage';
import { CheckoutStepTwoPage } from '../pages/CheckoutStepTwoPage';
import { InventoryPage } from '../pages/InventoryPage';
import { LoginPage } from '../pages/LoginPage';
import {
  CheckoutOverviewExpectations,
  appRoutes,
  checkoutOverviewDefaults
} from './utils';

export async function validateUserIsOnInventoryPage(page: Page): Promise<void> {
  const inventoryPage = new InventoryPage(page);

  await inventoryPage.expectLoaded();
}

export async function validateLoginError(page: Page, expectedMessage: string): Promise<void> {
  const loginPage = new LoginPage(page);

  await loginPage.expectErrorMessage(expectedMessage);
}

export async function validateLoggedOut(page: Page): Promise<void> {
  const loginPage = new LoginPage(page);

  await expect(page).toHaveURL(new RegExp(`${appRoutes.login.replace('/', '\\/')}$|^https://www\\.saucedemo\\.com/$`));
  await loginPage.expectLoginPageLoaded();
}

export async function validateCartCount(page: Page, expectedCount: number): Promise<void> {
  const basePage = new BasePage(page);

  await expect.poll(() => basePage.getCartBadgeCount()).toBe(expectedCount);
}

export async function validateProductVisibleInInventory(page: Page, productName: string): Promise<void> {
  const inventoryPage = new InventoryPage(page);

  await inventoryPage.expectProductVisible(productName);
}

export async function validateProductAddedToCart(page: Page, productName: string): Promise<void> {
  const inventoryPage = new InventoryPage(page);

  await inventoryPage.expectProductAddedToCart(productName);
}

export async function validateProductRemovedFromInventory(page: Page, productName: string): Promise<void> {
  const inventoryPage = new InventoryPage(page);

  await inventoryPage.expectProductRemovedFromCart(productName);
}

export async function validateProductInCart(page: Page, productName: string): Promise<void> {
  const cartPage = new CartPage(page);

  await cartPage.expectProductInCart(productName);
}

export async function validateProductNotInCart(page: Page, productName: string): Promise<void> {
  const cartPage = new CartPage(page);

  await cartPage.expectProductNotInCart(productName);
}

export async function validateCartItemCount(page: Page, expectedCount: number): Promise<void> {
  const cartPage = new CartPage(page);

  await cartPage.expectCartItemCount(expectedCount);
}

export async function validateCheckoutStepOneLoaded(page: Page): Promise<void> {
  const checkoutStepOnePage = new CheckoutStepOnePage(page);

  await checkoutStepOnePage.expectLoaded();
}

export async function validateCheckoutStepOneError(page: Page, expectedMessage: string): Promise<void> {
  const checkoutStepOnePage = new CheckoutStepOnePage(page);

  await checkoutStepOnePage.expectErrorMessage(expectedMessage);
}

export async function validateCheckoutOverview(
  page: Page,
  productNames: string | readonly string[],
  expectations: CheckoutOverviewExpectations = {}
): Promise<void> {
  const checkoutStepTwoPage = new CheckoutStepTwoPage(page);
  const normalizedProductNames = Array.isArray(productNames) ? [...productNames] : [productNames];
  const mergedExpectations = {
    ...checkoutOverviewDefaults,
    ...expectations
  };

  await checkoutStepTwoPage.expectLoaded();

  for (const productName of normalizedProductNames) {
    await checkoutStepTwoPage.expectProductVisible(productName);
  }

  await checkoutStepTwoPage.expectPaymentInformation(mergedExpectations.paymentInformation);
  await checkoutStepTwoPage.expectShippingInformation(mergedExpectations.shippingInformation);

  if (mergedExpectations.totalContains) {
    await checkoutStepTwoPage.expectTotalContains(mergedExpectations.totalContains);
  }
}

export async function validateOrderCompleted(page: Page): Promise<void> {
  const checkoutCompletePage = new CheckoutCompletePage(page);

  await checkoutCompletePage.expectLoaded();
  await checkoutCompletePage.expectOrderCompletionMessage();
}
