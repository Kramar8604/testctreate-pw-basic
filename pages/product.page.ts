import { Page, Locator } from "@playwright/test";
import { BasePage } from "./base.page";

export class ProductPage extends BasePage {
    productName: Locator;
    productPrice: Locator;
    addToCartBtn: Locator;
    alert: Locator;
    cartRows: Locator;
    cartProductTitle: Locator;
    proceedToCheckoutBtn: Locator;

    constructor(page: Page) {
        super(page);
        this.productName = page.getByTestId("product-name");
        this.productPrice = page.getByTestId("unit-price");
        this.addToCartBtn = page.getByTestId("add-to-cart");
        this.alert = page.getByRole("alert");
        this.cartRows = page.locator("table.table tbody tr");
        this.cartProductTitle = page.getByTestId("product-title");
        this.proceedToCheckoutBtn = page.getByTestId("proceed-1");
    }

    async addToCart(): Promise<void> {
        await this.addToCartBtn.click();
    }
}