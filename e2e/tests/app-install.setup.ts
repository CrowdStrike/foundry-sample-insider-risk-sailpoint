import { test as setup } from '@playwright/test';
import { AppCatalogPage, config } from '@crowdstrike/foundry-playwright';

setup('install app', async ({ page }) => {
  setup.setTimeout(180000);
  const catalog = new AppCatalogPage(page);

  await catalog.installApp(config.appName, {
    configureSettings: async (page) => {
      const nextButton = page.getByRole('button', { name: 'Next setting' });

      // Fill each settings screen in whatever order the app presents them.
      // Detect the current screen by checking for a unique field.
      for (let screen = 0; screen < 3; screen++) {
        if (await page.getByRole('textbox', { name: 'clientId' }).isVisible({ timeout: 3000 }).catch(() => false)) {
          // SailPoint API Integration screen — Name, Host, clientId, clientSecret
          await page.getByRole('textbox', { name: 'Name' }).fill('SailPoint API Integration');
          await page.getByRole('textbox', { name: 'Host' }).fill(process.env.SAILPOINT_HOST || 'https://example.api.identitynow.com');
          await page.getByRole('textbox', { name: 'clientId' }).fill(process.env.SAILPOINT_CLIENT_ID || 'test-client-id');
          await page.getByRole('textbox', { name: 'clientSecret' }).fill(process.env.SAILPOINT_CLIENT_SECRET || 'test-client-secret');
        } else {
          // Target Group dropdown screen (appears twice with different options)
          const targetGroupButtons = page.getByRole('button', { name: 'Target Group', exact: true });
          await targetGroupButtons.first().click();

          // Try the specific options first (screen 2), fall back to first option (screen 3)
          if (await page.getByRole('option', { name: 'User object GUID instance' }).isVisible({ timeout: 2000 }).catch(() => false)) {
            await page.getByRole('option', { name: 'User object GUID instance' }).click();
            await targetGroupButtons.first().click();
            await page.getByRole('option', { name: 'User object GUID' }).click();
          } else {
            const options = page.getByRole('option');
            await options.first().waitFor({ state: 'visible', timeout: 5000 });
            await options.first().click();
            await targetGroupButtons.first().click();
            await options.first().waitFor({ state: 'visible', timeout: 5000 });
            await options.first().click();
          }
        }

        if (await nextButton.isVisible({ timeout: 2000 }).catch(() => false)) {
          await nextButton.click();
          await page.waitForLoadState('domcontentloaded').catch(() => {});
        }
      }
    },
  });
});
