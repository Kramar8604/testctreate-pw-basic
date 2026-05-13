import { test as setup, expect } from '@playwright/test';
import { LoginPage } from '../page_objects/login.page';
import { HeaderFragment } from '../page_objects/page.fragments/header.fragment';
import userCredentials from '../test_data/test.data.json';

const authFile = 'playwright/.auth/user.json';

setup('authenticate', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const header = new HeaderFragment(page);

    await loginPage.open();
    await loginPage.login(userCredentials.user.email, userCredentials.user.password);

    await expect(header.userMenu).toContainText(userCredentials.user.name);

    await page.context().storageState({ path: authFile });
});