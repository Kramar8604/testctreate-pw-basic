import { Page } from "@playwright/test";


export class PageConstructor {
    protected page: Page;
    constructor(page: Page) {
        this.page = page;
 }
}