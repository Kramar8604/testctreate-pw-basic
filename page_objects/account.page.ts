import { BasePage } from "./base.page";

export class AccountPage extends BasePage {
  pageTitle = this.page.getByTestId('page-title');
}