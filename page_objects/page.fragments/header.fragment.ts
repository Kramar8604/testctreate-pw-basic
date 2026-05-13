import { PageConstructor } from "../page.constructor";

export class HeaderFragment extends PageConstructor {
    userMenu = this.page.locator('.navbar');
}
