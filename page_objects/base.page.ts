import { PageConstructor } from "./page.constructor";
import { HeaderFragment } from "./page.fragments/header.fragment";

export class BasePage extends PageConstructor {
    header = new HeaderFragment(this.page);
}
