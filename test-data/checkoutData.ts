import { CheckoutInformation } from '../pages/CheckoutStepOnePage';

export const checkoutData = {
  validCustomer: {
    firstName: 'John',
    lastName: 'Doe',
    postalCode: '12345'
  } satisfies CheckoutInformation,
  missingFirstName: {
    firstName: '',
    lastName: 'Doe',
    postalCode: '12345'
  } satisfies CheckoutInformation,
  missingLastName: {
    firstName: 'John',
    lastName: '',
    postalCode: '12345'
  } satisfies CheckoutInformation,
  missingPostalCode: {
    firstName: 'John',
    lastName: 'Doe',
    postalCode: ''
  } satisfies CheckoutInformation
} as const;
