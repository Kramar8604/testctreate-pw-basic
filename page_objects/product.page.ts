import { BasePage } from "./base.page";

export class ProductPage extends BasePage {
  productName = this.page.getByTestId('product-name');
  productPrice = this.page.getByTestId('unit-price');
  addToCartBtn = this.page.getByTestId('add-to-cart');
  addToFavoritesBtn = this.page.getByTestId('add-to-favorites');
}