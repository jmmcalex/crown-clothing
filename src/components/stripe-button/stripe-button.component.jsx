import React from 'react';
import StripeCheckout from 'react-stripe-checkout';
import CustomButton from '../custom-button/custom-button.component';

const StripeCheckoutButton = ({ price }) => {
  const priceForStripe = price * 100;
  const publishableKey =
    'pk_test_51IzoDyHbgsvfr3wI397LPjrzUriKMKhcE0YzMDAHGjj6di7wwtctucnP3Fa630udiOeR1H7qyMfQb0dxfNj2kARr00TVBhAKC9';

  /**
   * Takes the token from the stripe payment and passes it to the stripe API
   * For now its just a dummy api
   */
  const onToken = (token) => {
    console.log(token);
    alert('Payment Succesful');
  };

  return (
    <StripeCheckout
      name='Crown Clothing'
      label='Pay Now'
      billingAddress
      shippingAddress
      image='https://svgshare.com/i/CUz.svg'
      description={`Your total is ${price}`}
      amount={priceForStripe}
      panelLabel='Pay Now'
      token={onToken}
      stripeKey={publishableKey}
    >
      <CustomButton>Pay Now</CustomButton>
    </StripeCheckout>
  );
};

export default StripeCheckoutButton;
