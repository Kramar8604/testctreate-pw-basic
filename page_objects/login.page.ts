import { BasePage } from "./base.page";

export class LoginPage extends BasePage {
  emailInput = this.page.getByTestId('email');
  passwordInput = this.page.getByTestId('password');
  submitButton = this.page.getByTestId('login-submit');

  async open() {
    await this.page.goto('/auth/login');
  }

  async login(email: string, pass: string) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(pass);
    await this.submitButton.click();
  }
}