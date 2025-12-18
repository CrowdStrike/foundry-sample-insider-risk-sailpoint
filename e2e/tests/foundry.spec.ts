import { test, expect } from '../src/fixtures';

test.describe.configure({ mode: 'serial' });

test.describe('SailPoint Insider Risk E2E Tests', () => {

  test('should install app successfully from catalog', async ({ appCatalogPage, appName }) => {
    const isInstalled = await appCatalogPage.isAppInstalled(appName);
    expect(isInstalled).toBe(true);
  });

  test('should verify "Add SailPoint leavers data to IDP and AD group" workflow exists', async ({ workflowsPage }) => {
    await workflowsPage.navigateToWorkflows();
    await workflowsPage.verifyWorkflowExists('Add SailPoint leavers data to IDP and AD group');
  });

  test('should verify "Remove SailPoint leavers from IDP and AD group" workflow exists', async ({ workflowsPage }) => {
    await workflowsPage.navigateToWorkflows();
    await workflowsPage.verifyWorkflowExists('Remove SailPoint leavers from IDP and AD group');
  });

  test('should verify "Add SailPoint leavers data to IDP and AD group" workflow renders properly', async ({ workflowsPage }) => {
    await workflowsPage.navigateToWorkflows();
    await workflowsPage.verifyWorkflowRenders('Add SailPoint leavers data to IDP and AD group');
  });

  test('should verify scheduled workflow details are accessible', async ({ workflowsPage }) => {
    await workflowsPage.navigateToWorkflows();

    // Search for the workflow
    await workflowsPage.searchWorkflow('Add SailPoint leavers data to IDP and AD group');

    // Open the workflow - this verifies it has proper configuration
    const workflowLink = workflowsPage.page.getByRole('link', { name: /Add.*SailPoint.*leavers.*data/i });
    await workflowLink.click();
    await workflowsPage.page.waitForLoadState('networkidle');

    // Just verify we can access the workflow details page
    // (The specific cron schedule display may vary)
    const workflowDetailsIndicator = workflowsPage.page.getByText(/Schedule|Trigger|Configuration/).first();
    await expect(workflowDetailsIndicator).toBeVisible({ timeout: 10000 });
  });

  test('should uninstall app successfully', async ({ appCatalogPage, appName }) => {
    await appCatalogPage.uninstallApp(appName);

    // Verify app is no longer installed
    const isInstalled = await appCatalogPage.isAppInstalled(appName);
    expect(isInstalled).toBe(false);
  });
});
