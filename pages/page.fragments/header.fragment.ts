import { Page, Locator } from "@playwright/test";

export class HeaderFragment {
    page: Page;
    navbar: Locator;
    cartIcon: Locator;
    cartQuantity: Locator;
    userMenu: Locator;

    constructor(page: Page) {
        this.page = page;
        this.navbar = this.page.locator(".navbar");
        this.cartIcon = this.page.getByTestId("nav-cart");
        this.cartQuantity = this.page.getByTestId("cart-quantity");
        this.userMenu = this.page.getByTestId("nav-menu");
    }

    async getUserName(): Promise<string> {
        return await this.userMenu.innerText();
    }
}