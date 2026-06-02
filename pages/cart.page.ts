import { Page, Locator } from "@playwright/test";
import { BasePage } from "./base.page";

export class CartPage extends BasePage {
    productTitle: Locator;
    productPrice: Locator;
    cartTotal: Locator;
    proceedToCheckout: Locator;

    constructor(page: Page) {
        super(page);
        this.productTitle = page.getByTestId("product-title");
        this.productPrice = page.getByTestId("product-price");
        this.cartTotal = page.getByTestId("cart-total");
        this.proceedToCheckout = page.getByTestId("proceed-1");
    }
}