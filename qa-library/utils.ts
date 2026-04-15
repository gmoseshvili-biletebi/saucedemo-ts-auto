export const appRoutes = {
  login: '/',
  inventory: '/inventory.html',
  cart: '/cart.html',
  checkoutStepOne: '/checkout-step-one.html',
  checkoutStepTwo: '/checkout-step-two.html',
  checkoutComplete: '/checkout-complete.html'
} as const;

export const loginErrorMessages = {
  invalidCredentials: 'Epic sadface: Username and password do not match any user in this service',
  lockedOut: 'Epic sadface: Sorry, this user has been locked out.',
  usernameRequired: 'Epic sadface: Username is required',
  passwordRequired: 'Epic sadface: Password is required'
} as const;

export const checkoutErrorMessages = {
  firstNameRequired: 'Error: First Name is required',
  lastNameRequired: 'Error: Last Name is required',
  postalCodeRequired: 'Error: Postal Code is required'
} as const;

export const checkoutOverviewDefaults = {
  paymentInformation: 'SauceCard #31337',
  shippingInformation: 'Free Pony Express Delivery!'
} as const;

export interface CheckoutOverviewExpectations {
  paymentInformation?: string;
  shippingInformation?: string;
  totalContains?: string;
}

export function toArray<T>(value: T): T[];
export function toArray<T>(value: readonly T[]): T[];
export function toArray<T>(value: T | readonly T[]): T[];
export function toArray<T>(value: T | readonly T[]): T[] {
  return Array.isArray(value) ? [...value] : [value as T];
}
