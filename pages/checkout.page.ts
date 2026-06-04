import { Page, Locator } from "@playwright/test";
import { BasePage } from "./base.page";

export class CheckoutPage extends BasePage {
    proceedToCheckoutBtn2: Locator;
    countrySelect: Locator;
    postcodeInput: Locator;
    houseNumberInput: Locator;
    streetInput: Locator;
    cityInput: Locator;
    stateInput: Locator;
    proceedToBillingBtn: Locator;
    paymentMethodSelect: Locator;
    cardNumberInput: Locator;
    expirationDateInput: Locator;
    cvvInput: Locator;
    cardHolderInput: Locator;
    confirmPaymentBtn: Locator;
    paymentSuccessAlert: Locator;

    constructor(page: Page) {
        super(page);
        this.proceedToCheckoutBtn2 = page.getByTestId("proceed-2");
        this.countrySelect = page.getByTestId("country");
        this.postcodeInput = page.getByTestId("postal_code");
        this.houseNumberInput = page.getByTestId("house_number");
        this.streetInput = page.getByTestId("street");
        this.cityInput = page.getByTestId("city");
        this.stateInput = page.getByTestId("state");
        this.proceedToBillingBtn = page.getByTestId("proceed-3");
        this.paymentMethodSelect = page.getByTestId("payment-method");
        this.cardNumberInput = page.getByTestId("credit_card_number");
        this.expirationDateInput = page.getByTestId("expiration_date");
        this.cvvInput = page.getByTestId("cvv");
        this.cardHolderInput = page.getByTestId("card_holder_name");
        this.confirmPaymentBtn = page.getByTestId("finish");
        this.paymentSuccessAlert = page.getByTestId("payment-success-message");
    }

    async proceedAsLoggedIn(): Promise<void> {
        await this.proceedToCheckoutBtn2.click();
    }

    async fillBillingAddress(
        country: string,
        postcode: string,
        houseNumber: string,
        street: string,
        city: string,
        state: string
    ): Promise<void> {
        await this.countrySelect.selectOption(country);
        await this.postcodeInput.fill(postcode);
        await this.houseNumberInput.fill(houseNumber);
        await this.streetInput.fill(street);
        await this.cityInput.fill(city);
        await this.stateInput.fill(state);
        await this.proceedToBillingBtn.click();
    }

    async payByCreditCard(
        cardNumber: string,
        expirationDate: string,
        cvv: string,
        cardHolderName: string
    ): Promise<void> {
        await this.paymentMethodSelect.selectOption("Credit Card");
        await this.cardNumberInput.fill(cardNumber);
        await this.expirationDateInput.fill(expirationDate);
        await this.cvvInput.fill(cvv);
        await this.cardHolderInput.fill(cardHolderName);
        await this.confirmPaymentBtn.click();
    }
}