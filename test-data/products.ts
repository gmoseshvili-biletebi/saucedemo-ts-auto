export const products = {
  backpack: {
    name: 'Sauce Labs Backpack',
    price: '29.99'
  },
  bikeLight: {
    name: 'Sauce Labs Bike Light',
    price: '9.99'
  },
  boltTShirt: {
    name: 'Sauce Labs Bolt T-Shirt',
    price: '15.99'
  },
  fleeceJacket: {
    name: 'Sauce Labs Fleece Jacket',
    price: '49.99'
  }
} as const;

export const productLists = {
  checkoutPair: [products.backpack.name, products.bikeLight.name],
  multiAdd: [products.backpack.name, products.bikeLight.name, products.boltTShirt.name]
} as const;
