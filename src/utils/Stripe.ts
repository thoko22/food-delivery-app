import stripe from "stripe";
import { getEnvironmentVariables } from "../environments/environment";

export class Stripe {
  private static _stripe = new stripe(
    getEnvironmentVariables().stripe.secret_key,
    { apiVersion: "2024-06-20" }
  );

  static async checkout(data: { items: any[]; deliveryCharge: number }) {
    try {
      const session = await Stripe._stripe.checkout.sessions.create({
        line_items: [
          ...data.items.map((item) => ({
            price_data: {
              currency: "zar",
              product_daa: {
                name: item.name
                //images: ['http://localhost:3000/' + item.cover]
              },
              quantity: item.price * 100
            },
            quantity: item.quantity
          })),
          {
            price_data: {
              currency: "zar",
              product_data: {
                name: "DeliveryCharge"
              },
              unit_amount: data.deliveryCharge * 100
            },
            quantity: 1
          }
        ],
        mode: "payment",
        success_url: "",
        cancel_url: ""
      });
      return session;
    } catch (e) {
      throw e;
    }
  }
  private static async createCustomer(name: string, email: string) {
    try {
      const params: stripe.CustomerCreateParams = {
        email: email,
        name: name
        // source: '',
        // address: {
        //     line1: ABC',
        //     postal_code: '',
        //     city: '',
        //     state: '',
        //     country: ''
        // }
        // description: 'test customer',
      };

      const customer: stripe.Customer = await Stripe._stripe.customers.create(
        params
      );
      console.log(customer.id);
      return customer;
    } catch (e) {
      throw e;
    }
  }
}
