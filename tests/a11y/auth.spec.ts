import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test.describe('Auth page accessibility', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto('/auth');
		await page.waitForLoadState('networkidle');
	});

	test('has a single h1 heading', async ({ page }) => {
		const h1Elements = page.locator('h1');
		await expect(h1Elements).toHaveCount(1);
		// h1 should contain the app name or sign-in text
		await expect(h1Elements.first()).not.toBeEmpty();
	});

	test('email input has a visible label', async ({ page }) => {
		const emailInput = page.locator('#email');
		const isVisible = await emailInput.isVisible().catch(() => false);
		if (isVisible) {
			const label = page.locator('label[for="email"]');
			await expect(label).toBeVisible();
		}
	});

	test('password input has a visible label', async ({ page }) => {
		const label = page.locator('label[for="password"]');
		await expect(label).toBeVisible();
	});

	test('submit button has accessible text', async ({ page }) => {
		const submitButton = page.locator('button[type="submit"]');
		const text = await submitButton.textContent();
		expect(text?.trim().length).toBeGreaterThan(0);
	});

	test('passes axe-core WCAG 2.2 AA scan', async ({ page }) => {
		const results = await new AxeBuilder({ page })
			.withTags(['wcag2a', 'wcag2aa', 'wcag22aa'])
			.analyze();

		expect(results.violations).toEqual([]);
	});
});
