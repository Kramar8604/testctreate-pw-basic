import { Page } from "@playwright/test";
import { LoginPage } from "./login.page";
import { HomePage } from "./home.page";
import { ProductPage } from "./product.page";
import { AccountPage } from "./account.page";
import { CartPage } from "./cart.page";
import { CheckoutPage } from "./checkout.page";

export class AllPages {
    page: Page;
    loginPage: LoginPage;
    homePage: HomePage;
    productPage: ProductPage;
    accountPage: AccountPage;
    cartPage: CartPage;
    checkoutPage: CheckoutPage;

    constructor(page: Page) {
        this.page = page;
        this.loginPage = new LoginPage(page);
        this.homePage = new HomePage(page);
        this.productPage = new ProductPage(page);
        this.accountPage = new AccountPage(page);
        this.cartPage = new CartPage(page);
        this.checkoutPage = new CheckoutPage(page);
    }
}