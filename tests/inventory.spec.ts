import { expect, test } from '@playwright/test';
import { addProductsToCart, openCart, removeProductFromInventory } from '../qa-library/actions';
import { loginAsStandardUser } from '../qa-library/flows';
import {
  validateCartCount,
  validateProductAddedToCart,
  validateProductVisibleInInventory
} from '../qa-library/validations';
import { InventoryPage } from '../pages/InventoryPage';
import { productLists, products } from '../test-data/products';

test.describe('Inventory Module', () => {
  test.beforeEach(async ({ page }) => {
    await loginAsStandardUser(page);
  });

  test('TC_INV_001 - Inventory page loads correctly after login', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);

    await inventoryPage.expectLoaded();
    await inventoryPage.expectInventoryItemCount(6);
  });

  test('TC_INV_002 - Add one product to cart from inventory', async ({ page }) => {
    await addProductsToCart(page, products.backpack.name);
    await validateProductAddedToCart(page, products.backpack.name);
    await validateCartCount(page, 1);
  });

  test('TC_INV_003 - Remove product from cart from inventory', async ({ page }) => {
    await addProductsToCart(page, products.backpack.name);
    await removeProductFromInventory(page, products.backpack.name);

    const inventoryPage = new InventoryPage(page);
    await inventoryPage.expectProductRemovedFromCart(products.backpack.name);
    await validateCartCount(page, 0);
  });

  test('TC_INV_004 - Add multiple different products from inventory', async ({ page }) => {
    await addProductsToCart(page, productLists.multiAdd);

    for (const productName of productLists.multiAdd) {
      await validateProductAddedToCart(page, productName);
    }

    await validateCartCount(page, productLists.multiAdd.length);
  });

  test('TC_INV_005 - Sort inventory by price low to high', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);

    await inventoryPage.sortProducts('lohi');

    const prices = await inventoryPage.getDisplayedPrices();
    const sortedPrices = [...prices].sort((left, right) => left - right);

    expect(prices).toEqual(sortedPrices);
  });

  test('TC_INV_006 - Open cart from inventory after adding product', async ({ page }) => {
    await addProductsToCart(page, products.bikeLight.name);
    const cartPage = await openCart(page);

    await cartPage.expectLoaded();
    await cartPage.expectProductInCart(products.bikeLight.name);
  });

  test('TC_INV_007 - Product name is visible in inventory list', async ({ page }) => {
    await validateProductVisibleInInventory(page, products.fleeceJacket.name);
  });
});
