import { Page } from '@playwright/test';
import { BasePage } from '../pages/BasePage';
import { CartPage } from '../pages/CartPage';
import { CheckoutCompletePage } from '../pages/CheckoutCompletePage';
import { CheckoutInformation, CheckoutStepOnePage } from '../pages/CheckoutStepOnePage';
import { CheckoutStepTwoPage } from '../pages/CheckoutStepTwoPage';
import { InventoryPage } from '../pages/InventoryPage';
import { LoginPage } from '../pages/LoginPage';

export async function openLoginPage(page: Page): Promise<LoginPage> {
  const loginPage = new LoginPage(page);

  await loginPage.open();
  await loginPage.expectLoginPageLoaded();

  return loginPage;
}

export async function login(page: Page, username: string, password: string): Promise<void> {
  const loginPage = await openLoginPage(page);

  await loginPage.login(username, password);
}

export async function addProductToCart(page: Page, productName: string): Promise<InventoryPage> {
  const inventoryPage = new InventoryPage(page);

  await inventoryPage.addProductToCart(productName);

  return inventoryPage;
}

export async function addProductsToCart(
  page: Page,
  productNames: string | readonly string[]
): Promise<InventoryPage> {
  const inventoryPage = new InventoryPage(page);
  const normalizedProductNames = Array.isArray(productNames) ? [...productNames] : [productNames];

  for (const productName of normalizedProductNames) {
    await inventoryPage.addProductToCart(productName);
  }

  return inventoryPage;
}

export async function removeProductFromInventory(page: Page, productName: string): Promise<InventoryPage> {
  const inventoryPage = new InventoryPage(page);

  await inventoryPage.removeProductFromCart(productName);

  return inventoryPage;
}

export async function openCart(page: Page): Promise<CartPage> {
  const inventoryPage = new InventoryPage(page);

  return inventoryPage.openCart();
}

export async function removeProductFromCart(page: Page, productName: string): Promise<CartPage> {
  const cartPage = new CartPage(page);

  await cartPage.removeProduct(productName);

  return cartPage;
}

export async function startCheckout(page: Page): Promise<CheckoutStepOnePage> {
  const cartPage = new CartPage(page);

  return cartPage.proceedToCheckout();
}

export async function fillCheckoutInfo(
  page: Page,
  checkoutInformation: CheckoutInformation
): Promise<CheckoutStepOnePage> {
  const checkoutStepOnePage = new CheckoutStepOnePage(page);

  await checkoutStepOnePage.fillCheckoutInformation(checkoutInformation);

  return checkoutStepOnePage;
}

export async function continueCheckout(page: Page): Promise<CheckoutStepTwoPage> {
  const checkoutStepOnePage = new CheckoutStepOnePage(page);

  return checkoutStepOnePage.continue();
}

export async function finishCheckout(page: Page): Promise<CheckoutCompletePage> {
  const checkoutStepTwoPage = new CheckoutStepTwoPage(page);

  return checkoutStepTwoPage.finish();
}

export async function logout(page: Page): Promise<LoginPage> {
  const basePage = new BasePage(page);

  await basePage.logout();

  return new LoginPage(page);
}
