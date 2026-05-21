import { test, expect } from "@playwright/test";
import { HomePage, NameSorting } from "../page_objects/home.page";

test('Verify user can sort products by name from A to Z', async ({ page }) => {
    const homePage = new HomePage(page);

    await homePage.open();
    await homePage.changeNameSorting(NameSorting.AtoZ);

    const actualNames = await homePage.getProductNames();
    const expectedNames = [...actualNames].sort((a, b) => a.localeCompare(b));

    expect(actualNames).toEqual(expectedNames);
});

test('Verify user can sort products by name from Z to A', async ({ page }) => {
    const homePage = new HomePage(page);

    await homePage.open();
    await homePage.changeNameSorting(NameSorting.ZtoA);

    const actualNames = await homePage.getProductNames();
    const expectedNames = [...actualNames].sort((a, b) => b.localeCompare(a));

    expect(actualNames).toEqual(expectedNames);
});