# NodeJS Stripe Payment

Integrate stripe payment api in your web or mobile application

#### There are two types of stripe payment apis created using NodeJS with stripe package:

- Stripe checkout api
  -- on calling the api, user will be redirected to stripe checkout page where they will be asked to enter card details

- Stripe payment intent api
  -- card details would be sent from frontend in request body and stripe will process the payment, there would be no redirection to checkout page
