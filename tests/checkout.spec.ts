import { test } from '@playwright/test';
import { continueCheckout, fillCheckoutInfo } from '../qa-library/actions';
import { beginCheckoutFromInventory, loginAsStandardUser } from '../qa-library/flows';
import {
  validateCheckoutOverview,
  validateCheckoutStepOneError,
  validateCheckoutStepOneLoaded,
  validateUserIsOnInventoryPage
} from '../qa-library/validations';
import { checkoutErrorMessages } from '../qa-library/utils';
import { checkoutData } from '../test-data/checkoutData';
import { productLists, products } from '../test-data/products';

test.describe('Checkout Module', () => {
  test.beforeEach(async ({ page }) => {
    await loginAsStandardUser(page);
  });

  test('TC_CHECKOUT1_001 - Submit valid checkout information', async ({ page }) => {
    await beginCheckoutFromInventory(page, products.backpack.name);
    await fillCheckoutInfo(page, checkoutData.validCustomer);
    await continueCheckout(page);

    await validateCheckoutOverview(page, products.backpack.name);
  });

  test('TC_CHECKOUT1_002 - Checkout Step One validation for missing first name', async ({ page }) => {
    await beginCheckoutFromInventory(page, products.backpack.name);
    await fillCheckoutInfo(page, checkoutData.missingFirstName);
    await continueCheckout(page);

    await validateCheckoutStepOneError(page, checkoutErrorMessages.firstNameRequired);
  });

  test('TC_CHECKOUT1_003 - Checkout Step One validation for missing last name', async ({ page }) => {
    await beginCheckoutFromInventory(page, products.backpack.name);
    await fillCheckoutInfo(page, checkoutData.missingLastName);
    await continueCheckout(page);

    await validateCheckoutStepOneError(page, checkoutErrorMessages.lastNameRequired);
  });

  test('TC_CHECKOUT1_004 - Checkout Step One validation for missing postal code', async ({ page }) => {
    await beginCheckoutFromInventory(page, products.backpack.name);
    await fillCheckoutInfo(page, checkoutData.missingPostalCode);
    await continueCheckout(page);

    await validateCheckoutStepOneError(page, checkoutErrorMessages.postalCodeRequired);
  });

  test('TC_CHECKOUT2_001 - Checkout overview shows correct order summary', async ({ page }) => {
    await beginCheckoutFromInventory(page, productLists.checkoutPair);
    await fillCheckoutInfo(page, checkoutData.validCustomer);
    await continueCheckout(page);

    await validateCheckoutOverview(page, productLists.checkoutPair, { totalContains: 'Total:' });
  });

  test('TC_CHECKOUT2_002 - Cancel checkout from overview', async ({ page }) => {
    await beginCheckoutFromInventory(page, products.backpack.name);
    await fillCheckoutInfo(page, checkoutData.validCustomer);
    const overviewPage = await continueCheckout(page);
    await overviewPage.cancel();

    await validateUserIsOnInventoryPage(page);
  });

  test('TC_CHECKOUT2_003 - Cancel checkout from step one', async ({ page }) => {
    const checkoutStepOnePage = await beginCheckoutFromInventory(page, products.backpack.name);
    const cartPage = await checkoutStepOnePage.cancel();

    await cartPage.expectLoaded();
    await cartPage.expectProductInCart(products.backpack.name);
  });
});
