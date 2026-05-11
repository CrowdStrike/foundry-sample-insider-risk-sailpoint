import { test as setup } from '@playwright/test';
import { AppCatalogPage, config } from '@crowdstrike/foundry-playwright';

setup('install app', async ({ page }) => {
  setup.setTimeout(180000);
  const catalog = new AppCatalogPage(page);

  await catalog.installApp(config.appName, {
    configureSettings: async (page) => {
      // Screen 1: SailPoint API Integration — Name, Host, clientId, clientSecret
      await page.getByRole('textbox', { name: 'Name' }).fill('SailPoint API Integration');
      await page.getByRole('textbox', { name: 'Host' }).fill(process.env.SAILPOINT_HOST || 'https://example.api.identitynow.com');
      await page.getByRole('textbox', { name: 'clientId' }).fill(process.env.SAILPOINT_CLIENT_ID || 'test-client-id');
      await page.getByRole('textbox', { name: 'clientSecret' }).fill(process.env.SAILPOINT_CLIENT_SECRET || 'test-client-secret');

      const nextButton = page.getByRole('button', { name: 'Next setting' });
      await nextButton.click();
      await page.waitForLoadState('domcontentloaded').catch(() => {});

      // Screen 2: Two Target Group dropdowns (required to advance)
      const targetGroupButtons = page.getByRole('button', { name: 'Target Group', exact: true });
      await targetGroupButtons.first().click();
      await page.getByRole('option', { name: 'User object GUID instance' }).click();

      await targetGroupButtons.first().click();
      await page.getByRole('option', { name: 'User object GUID' }).click();

      await nextButton.click();
      await page.waitForLoadState('domcontentloaded').catch(() => {});

      // Screen 3: Two more Target Group dropdowns (required for install)
      const screen3Buttons = page.getByRole('button', { name: 'Target Group', exact: true });
      await screen3Buttons.first().click();
      const screen3Options = page.getByRole('option');
      await screen3Options.first().waitFor({ state: 'visible', timeout: 5000 });
      await screen3Options.first().click();

      await screen3Buttons.first().click();
      const screen3Options2 = page.getByRole('option');
      await screen3Options2.first().waitFor({ state: 'visible', timeout: 5000 });
      await screen3Options2.first().click();

      // "Install app" button is now on this screen
    },
  });
});
