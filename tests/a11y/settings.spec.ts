import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { signInAsAdmin } from './helpers';

test.describe('Settings modal accessibility', () => {
	test.beforeEach(async ({ page }) => {
		await signInAsAdmin(page);
		await page.waitForLoadState('networkidle');

		// Open settings modal via keyboard shortcut or button
		await page.keyboard.press('Control+,');
		// Wait for modal to appear
		await page.locator('[role="dialog"]').waitFor({ state: 'visible', timeout: 5000 });
	});

	test('settings modal has role="dialog" and aria-modal', async ({ page }) => {
		const dialog = page.locator('[role="dialog"]');
		await expect(dialog).toBeVisible();
		await expect(dialog).toHaveAttribute('aria-modal', 'true');
	});

	test('settings modal has an h2 title', async ({ page }) => {
		const dialog = page.locator('[role="dialog"]');
		const h2 = dialog.locator('h2');
		await expect(h2).toBeVisible();
		const text = await h2.textContent();
		expect(text?.trim()).toBe('Settings');
	});

	test('settings sections use h3 headings', async ({ page }) => {
		const dialog = page.locator('[role="dialog"]');

		// Click a settings tab that has section headings (e.g., General or Interface)
		const generalTab = dialog.getByText('General', { exact: true });
		const isVisible = await generalTab.isVisible().catch(() => false);
		if (isVisible) {
			await generalTab.click();
			await page.waitForTimeout(500);

			const h3Elements = dialog.locator('h3');
			const count = await h3Elements.count();
			// General settings should have at least one h3 section heading
			expect(count).toBeGreaterThanOrEqual(1);
		}
	});

	test('search input in settings is labeled', async ({ page }) => {
		const searchInput = page.locator('#search-input-settings-modal');
		const isVisible = await searchInput.isVisible().catch(() => false);
		if (isVisible) {
			// Should have a sr-only label
			const label = page.locator('label[for="search-input-settings-modal"]');
			await expect(label).toHaveCount(1);
		}
	});

	test('close button has accessible label', async ({ page }) => {
		const closeButton = page.locator('[role="dialog"] button[aria-label*="Close"]');
		await expect(closeButton.first()).toBeVisible();
	});

	test('focus is trapped within the dialog', async ({ page }) => {
		const dialog = page.locator('[role="dialog"]');

		// Press Tab multiple times and verify focus stays inside the dialog
		for (let i = 0; i < 10; i++) {
			await page.keyboard.press('Tab');
		}

		const activeElement = await page.evaluate(() => {
			const el = document.activeElement;
			return el?.closest('[role="dialog"]') !== null;
		});
		expect(activeElement).toBe(true);
	});

	test('Escape key closes the dialog', async ({ page }) => {
		await page.keyboard.press('Escape');
		await expect(page.locator('[role="dialog"]')).not.toBeVisible({ timeout: 3000 });
	});

	test('passes axe-core WCAG 2.2 AA scan scoped to dialog', async ({ page }) => {
		const results = await new AxeBuilder({ page })
			.withTags(['wcag2a', 'wcag2aa', 'wcag22aa'])
			.include('[role="dialog"]')
			.analyze();

		expect(results.violations).toEqual([]);
	});
});
