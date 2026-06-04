import { test, expect } from "../fixtures";
import { NameSorting } from "../pages/home.page";

test("Verify user can sort products by name from A to Z", async ({ app }) => {
    await app.homePage.open();
    await app.homePage.changeNameSorting(NameSorting.AtoZ);
    await expect.poll(async () => {
        const names = await app.homePage.getProductNames();
        const sorted = [...names].sort((a, b) => a.localeCompare(b));
        return JSON.stringify(names) === JSON.stringify(sorted);
    }, { timeout: 5000 }).toBe(true);
});

test("Verify user can sort products by name from Z to A", async ({ app }) => {
    await app.homePage.open();
    await app.homePage.changeNameSorting(NameSorting.ZtoA);
    await expect.poll(async () => {
        const names = await app.homePage.getProductNames();
        const sorted = [...names].sort((a, b) => b.localeCompare(a));
        return JSON.stringify(names) === JSON.stringify(sorted);
    }, { timeout: 5000 }).toBe(true);
});