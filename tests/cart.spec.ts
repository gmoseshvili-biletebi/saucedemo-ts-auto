import { test } from '@playwright/test';
import { openCart, removeProductFromCart, startCheckout } from '../qa-library/actions';
import { addProductsAndOpenCart, loginAsStandardUser } from '../qa-library/flows';
import {
  validateCartCount,
  validateCartItemCount,
  validateCheckoutStepOneLoaded,
  validateProductInCart,
  validateProductNotInCart
} from '../qa-library/validations';
import { CartPage } from '../pages/CartPage';
import { productLists, products } from '../test-data/products';

test.describe('Cart Module', () => {
  test.beforeEach(async ({ page }) => {
    await loginAsStandardUser(page);
  });

  test('TC_CART_001 - Cart displays selected product details', async ({ page }) => {
    await addProductsAndOpenCart(page, products.backpack.name);
    await validateProductInCart(page, products.backpack.name);
    await validateCartItemCount(page, 1);
  });

  test('TC_CART_002 - Remove product from cart page', async ({ page }) => {
    await addProductsAndOpenCart(page, products.backpack.name);
    await removeProductFromCart(page, products.backpack.name);

    await validateProductNotInCart(page, products.backpack.name);
    await validateCartCount(page, 0);
  });

  test('TC_CART_003 - Continue shopping from cart', async ({ page }) => {
    const cartPage = await addProductsAndOpenCart(page, products.backpack.name);
    const inventoryPage = await cartPage.continueShopping();

    await inventoryPage.expectLoaded();
    await validateCartCount(page, 1);
  });

  test('TC_CART_004 - Proceed to checkout from cart', async ({ page }) => {
    await addProductsAndOpenCart(page, products.backpack.name);
    await startCheckout(page);

    await validateCheckoutStepOneLoaded(page);
  });

  test('TC_CART_005 - Remove all items and verify empty cart', async ({ page }) => {
    await addProductsAndOpenCart(page, productLists.checkoutPair);
    await removeProductFromCart(page, products.backpack.name);
    await removeProductFromCart(page, products.bikeLight.name);

    await validateProductNotInCart(page, products.backpack.name);
    await validateProductNotInCart(page, products.bikeLight.name);
    await validateCartItemCount(page, 0);
    await validateCartCount(page, 0);
  });

  test('TC_CART_006 - Open cart from inventory with multiple items', async ({ page }) => {
    await addProductsAndOpenCart(page, productLists.multiAdd);

    const cartPage = new CartPage(page);
    await cartPage.expectLoaded();
    await validateCartItemCount(page, productLists.multiAdd.length);
  });
});
