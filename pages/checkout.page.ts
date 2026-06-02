import { Page, Locator } from "@playwright/test";
import { BasePage } from "./base.page";

export class CheckoutPage extends BasePage {
    successAlert: Locator;

    constructor(page: Page) {
        super(page);
        this.successAlert = page.locator(".alert-success");
    }

    async fillBillingAddress(data: {postcode: string, houseNumber: string, street: string, city: string, state: string}) {
        await this.page.getByTestId("postcode").fill(data.postcode);
        await this.page.getByTestId("house_number").fill(data.houseNumber);
        await this.page.getByTestId("street").fill(data.street);
        await this.page.getByTestId("city").fill(data.city);
        await this.page.getByTestId("state").fill(data.state);
    }

    async fillPaymentDetails(data: {number: string, expiration: string, cvv: string, name: string}) {
        await this.page.getByTestId("payment-method").selectOption('Credit Card');
        await this.page.getByTestId("card_number").fill(data.number);
        await this.page.getByTestId("expiration_date").fill(data.expiration);
        await this.page.getByTestId("cvv").fill(data.cvv);
        await this.page.getByTestId("card_holder_name").fill(data.name);
        await this.page.getByTestId("finish").click();
    }
}