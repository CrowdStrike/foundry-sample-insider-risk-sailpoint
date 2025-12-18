import { test, test as setup } from '../src/fixtures';

setup('install SailPoint Insider Risk app', async ({ appCatalogPage, appName }) => {
  test.setTimeout(120000); // 2 minutes for installation

  // Check if app is already installed (this navigates to the app page)
  const isInstalled = await appCatalogPage.isAppInstalled(appName);

  if (!isInstalled) {
    console.log(`App '${appName}' is not installed. Installing...`);

    // Install the app (workflows will be provisioned with valid SailPoint credentials)
    const installed = await appCatalogPage.installApp(appName);

    if (!installed) {
      throw new Error(`Failed to install app '${appName}'`);
    }
  } else {
    console.log(`App '${appName}' is already installed`);
  }
});
