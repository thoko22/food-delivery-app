import { body, param } from "express-validator";
import Restaurant from "../models/Restaurant";
import Category from "../models/Category";

export class ItemValidators {
  static addItem() {
    return [
      body("itemImages", "Cover image is required").custom((cover, { req }) => {
        if (req.file) {
          return true;
        } else {
          // throw new Error('File not uploaded');
          throw "File not uploaded";
        }
      }),
      body("name", "Item Name is required").isString(),
      body("restaurant_id", "Restaurant Id is required")
        .isString()
        .custom((restaurant_id, { req }) => {
          return Restaurant.findById(restaurant_id)
            .then((restaurant) => {
              if (restaurant) {
                return true;
              } else {
                // throw new Error('Restaurant does not exist');
                throw "Restaurant does not exist";
              }
            })
            .catch((e) => {
              throw new Error(e);
            });
        }),
      body("category_id", "Category Id is required")
        .isString()
        .isString()
        .custom((category_id, { req }) => {
          return Category.findOne({
            _id: category_id,
            restaurant_id: req.body.restaurant_id
          })
            .then((category) => {
              if (category) {
                return true;
              } else {
                // throw new Error('Category does not exist');
                throw "Category does not exist";
              }
            })
            .catch((e) => {
              throw new Error(e);
            });
        }),
      body("price", "Price is required").isString(),
      body("veg", "Item is veg or not is required").isBoolean(),
      body("status", "Status is required").isBoolean()
    ];
  }
  static getMenuItems() {
    return [
      param("restaurantId", "Restaurant Id is required").isString()
        .custom((restaurant_id, { req }) => {
          return Restaurant.findById(restaurant_id).then((restaurant) => {
              if (restaurant) {
                req.restaurant = restaurant;
                return true;
              } else {
                // throw new Error('Restaurant doesn\'t exist');
                throw "Restaurant doesn\'t exist";
              }
            })
            .catch((e) => {
              throw new Error(e);
            });
        })
    ];
  }
}
