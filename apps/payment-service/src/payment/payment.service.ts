import {
  ClientProxy,
  ClientProxyFactory,
  Transport,
} from '@nestjs/microservices';
import { HttpStatus, Injectable } from '@nestjs/common';

const stripe = require('stripe')(
  'sk_test_51Mgxh1Jf7Xu5OYokhGrEb6gEgH9mZy6EuLMz9SeP1szuBjQMwvqZQiDR4OTwYrtsrDTgOw0r7N4jLz4VlKsLzSHU00e3a7MObN',
);
const endpointSecret =
  'whsec_d4bbe63d4afa15e301ff953e04f3bdcfc510bc68a441cfee749f9dc065d2a431';

const calculateOrderAmount = (items) => {
  // Replace this constant with a calculation of the order's amount
  // Calculate the order total on the server to prevent
  // people from directly manipulating the amount on the client
  return 1400;
};

@Injectable()
export class PaymentService {
  redisClient: ClientProxy;

  constructor() {
    this.redisClient = ClientProxyFactory.create({
      transport: Transport.REDIS,
      options: {
        host: process.env.REDIS_HOST,
        port: Number(process.env.REDIS_PORT),
      },
    });
  }

  async getPayment(req): Promise<any> {
    const { items } = req.body;

    // Create a PaymentIntent with the order amount and currency
    const paymentIntent = await stripe.paymentIntents.create({
      amount: calculateOrderAmount(items),
      description: JSON.stringify({ items }),
      currency: 'usd',
      automatic_payment_methods: {
        enabled: true,
      },
    });

    // console.log(paymentIntent);

    return {
      clientSecret: paymentIntent.client_secret,
    };
  }

  //   async retrievePayment(id: any): Promise<any> {
  //     const events = await stripe.events.list({
  //       limit: 1,
  //     });
  //     console.log('charges', events);
  //     // return intent;
  //   }

  async hookPaymentEvent(request: any): Promise<any> {
    // console.log(request);

    const event: any = request.body;
    // Only verify the event if you have an endpoint secret defined.
    // Otherwise use the basic event deserialized with JSON.parse
    // if (endpointSecret) {
    //   // Get the signature sent by Stripe
    //   const signature = request.headers['stripe-signature'];
    //   try {
    //     event = stripe.webhooks.constructEvent(
    //       request.body,
    //       signature,
    //       endpointSecret,
    //     );
    //   } catch (err) {
    //     console.log(`⚠️  Webhook signature verification failed.`, err.message);
    //     return HttpStatus.UNAUTHORIZED;
    //   }
    // }

    // Handle the event
    switch (event.type) {
      case 'payment_intent.succeeded':
        const paymentIntent = event.data.object;
        this.publishEvent(paymentIntent);
        console.log(
          `PaymentIntent for ${paymentIntent.amount} id ${paymentIntent.id} was successful!`,
        );
        // Then define and call a method to handle the successful payment intent.
        // handlePaymentIntentSucceeded(paymentIntent);
        break;
      case 'payment_method.attached':
        const paymentMethod = event.data.object;
        // Then define and call a method to handle the successful attachment of a PaymentMethod.
        // handlePaymentMethodAttached(paymentMethod);
        break;
      default:
        // Unexpected event type
        console.log(`Unhandled event type ${event.type}.`);
    }

    // Return a 200 response to acknowledge receipt of the event
    return HttpStatus.OK;
  }

  async publishEvent(params: any) {
    this.redisClient.emit('payment-channel', params);
  }

  getHello(): string {
    return 'Hello Payment!';
  }
}
