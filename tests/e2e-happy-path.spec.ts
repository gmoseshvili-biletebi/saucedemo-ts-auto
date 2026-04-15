import { test } from '@playwright/test';
import { logout } from '../qa-library/actions';
import { addProductsAndOpenCart, completeCheckoutFlow, loginAsStandardUser } from '../qa-library/flows';
import { validateLoggedOut, validateOrderCompleted, validateUserIsOnInventoryPage } from '../qa-library/validations';
import { checkoutData } from '../test-data/checkoutData';
import { products } from '../test-data/products';

test.describe('End-to-End Happy Paths', () => {
  test('TC_COMPLETE_001 - Finish checkout and verify success page', async ({ page }) => {
    await loginAsStandardUser(page);
    await completeCheckoutFlow(page, products.backpack.name, checkoutData.validCustomer, 'Total:');

    await validateOrderCompleted(page);
  });

  test('TC_COMPLETE_002 - Back Home from checkout complete page', async ({ page }) => {
    await loginAsStandardUser(page);
    const checkoutCompletePage = await completeCheckoutFlow(
      page,
      products.backpack.name,
      checkoutData.validCustomer,
      'Total:'
    );
    const inventoryPage = await checkoutCompletePage.backToHome();

    await inventoryPage.expectLoaded();
  });

  test('TC_LOGOUT_001 - Logout from inventory page', async ({ page }) => {
    await loginAsStandardUser(page);
    await logout(page);

    await validateLoggedOut(page);
  });

  test('TC_LOGOUT_002 - Logout from cart page', async ({ page }) => {
    await loginAsStandardUser(page);
    const cartPage = await addProductsAndOpenCart(page, products.backpack.name);

    await cartPage.expectLoaded();
    await logout(page);

    await validateLoggedOut(page);
  });

  test('TC_E2E_001 - Complete end-to-end purchase for one product', async ({ page }) => {
    await loginAsStandardUser(page);
    await completeCheckoutFlow(page, products.backpack.name, checkoutData.validCustomer, 'Total:');

    await validateOrderCompleted(page);
  });
});
