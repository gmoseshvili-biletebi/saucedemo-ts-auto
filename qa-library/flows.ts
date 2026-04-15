import { Page } from '@playwright/test';
import { CartPage } from '../pages/CartPage';
import { CheckoutCompletePage } from '../pages/CheckoutCompletePage';
import { CheckoutInformation, CheckoutStepOnePage } from '../pages/CheckoutStepOnePage';
import { users } from '../test-data/users';
import { InventoryPage } from '../pages/InventoryPage';
import {
  addProductsToCart,
  continueCheckout,
  fillCheckoutInfo,
  finishCheckout,
  login,
  logout,
  openCart,
  startCheckout
} from './actions';
import {
  validateCheckoutOverview,
  validateLoggedOut,
  validateOrderCompleted,
  validateUserIsOnInventoryPage
} from './validations';

export async function loginAsStandardUser(page: Page): Promise<InventoryPage> {
  await login(page, users.standard.username, users.standard.password);
  await validateUserIsOnInventoryPage(page);

  return new InventoryPage(page);
}

export async function loginAsLockedOutUser(page: Page): Promise<void> {
  await login(page, users.lockedOut.username, users.lockedOut.password);
}

export async function loginAsUser(page: Page, userType: keyof typeof users): Promise<void> {
  const user = users[userType];

  await login(page, user.username, user.password);
}

export async function addProductsAndOpenCart(
  page: Page,
  productNames: string | readonly string[]
): Promise<CartPage> {
  await addProductsToCart(page, productNames);

  return openCart(page);
}

export async function beginCheckoutFromInventory(
  page: Page,
  productNames: string | readonly string[]
): Promise<CheckoutStepOnePage> {
  await addProductsAndOpenCart(page, productNames);

  return startCheckout(page);
}

export async function completeCheckoutFlow(
  page: Page,
  productNames: string | readonly string[],
  checkoutInformation: CheckoutInformation,
  totalContains?: string
): Promise<CheckoutCompletePage> {
  await beginCheckoutFromInventory(page, productNames);
  await fillCheckoutInfo(page, checkoutInformation);
  await continueCheckout(page);
  await validateCheckoutOverview(page, productNames, { totalContains });

  const checkoutCompletePage = await finishCheckout(page);

  await validateOrderCompleted(page);

  return checkoutCompletePage;
}

export async function logoutFromInventory(page: Page): Promise<void> {
  await logout(page);
  await validateLoggedOut(page);
}
