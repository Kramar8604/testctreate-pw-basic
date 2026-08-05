import { test, expect } from "../fixtures";

test("Verify 20 products are displayed when API returns 20 products", async ({ app }) => {
    await app.page.route("https://api.practicesoftwaretesting.com/products*", async route => {
        const response = await route.fetch();
        const json = await response.json();

        const singleProduct = json.data[0];
        json.data = Array.from({ length: 20 }, (_, i) => ({
            ...singleProduct,
            id: `mock-${i}`,
            name: `Product ${i + 1}`,
        }));

        await route.fulfill({ response, json });
    });

    await app.homePage.open();
    await app.homePage.waitForPricesLoad();

    const productNames = await app.homePage.getProductNames();
    expect(productNames).toHaveLength(20);
});