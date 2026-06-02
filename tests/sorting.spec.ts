import { expect, test } from "../fixtures";
import { NameSorting } from "../pages/home.page";

test('Verify user can sort products by name from A to Z', async ({ app, page }) => {
    await app.homePage.open();

    const responsePromise = page.waitForResponse(r => r.url().includes('sort=name,asc') && r.status() === 200);
    await app.homePage.changeNameSorting(NameSorting.AtoZ);
    await responsePromise;

    const actualNames = await app.homePage.getProductNames();
    const expectedNames = [...actualNames].sort((a, b) => a.localeCompare(b));

    expect(actualNames).toEqual(expectedNames);
});

test('Verify user can sort products by name from Z to A', async ({ app, page }) => {
    await app.homePage.open();

    const responsePromise = page.waitForResponse(r => r.url().includes('sort=name,desc') && r.status() === 200);
    await app.homePage.changeNameSorting(NameSorting.ZtoA);
    await responsePromise;

    const actualNames = await app.homePage.getProductNames();
    const expectedNames = [...actualNames].sort((a, b) => b.localeCompare(a));

    expect(actualNames).toEqual(expectedNames);
});