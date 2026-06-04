import { Page } from "@playwright/test";
import { HomePage } from "./home.page";
import { LoginPage } from "./login.page";
import { AccountPage } from "./account.page";
import { ProductPage } from "./product.page";
import { CartPage } from "./cart.page";
import { CheckoutPage } from "./checkout.page";

export class App {
    page: Page;
    homePage: HomePage;
    loginPage: LoginPage;
    accountPage: AccountPage;
    productPage: ProductPage;
    cartPage: CartPage;
    checkoutPage: CheckoutPage;

    constructor(page: Page) {
        this.page = page;
        this.homePage = new HomePage(page);
        this.loginPage = new LoginPage(page);
        this.accountPage = new AccountPage(page);
        this.productPage = new ProductPage(page);
        this.cartPage = new CartPage(page);
        this.checkoutPage = new CheckoutPage(page);
    }
}