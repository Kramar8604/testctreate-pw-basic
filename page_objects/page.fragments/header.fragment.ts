import { PageConstructor } from "../page.constructor";

export class HeaderFragment extends PageConstructor {
    navbar = this.page.locator('.navbar');
}
