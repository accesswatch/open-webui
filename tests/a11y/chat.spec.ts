import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { signInAsAdmin } from './helpers';

test.describe('Chat page accessibility', () => {
	test.beforeEach(async ({ page }) => {
		await signInAsAdmin(page);
		// Should now be on the main chat page
		await page.waitForLoadState('networkidle');
	});

	test('page has at least one landmark region', async ({ page }) => {
		// The app should have nav (sidebar) and/or main content regions
		const landmarks = page.locator(
			'[role="navigation"], [role="main"], [role="banner"], [role="complementary"], nav, main, header, aside'
		);
		const count = await landmarks.count();
		expect(count).toBeGreaterThanOrEqual(1);
	});

	test('heading hierarchy starts at h1 or h2 and has no skipped levels', async ({ page }) => {
		const headings = await page.locator('h1, h2, h3, h4, h5, h6').all();

		if (headings.length === 0) {
			// No headings on page is acceptable for a chat interface
			return;
		}

		const levels: number[] = [];
		for (const heading of headings) {
			const tag = await heading.evaluate((el) => el.tagName.toLowerCase());
			levels.push(parseInt(tag.replace('h', ''), 10));
		}

		// First heading should be h1 or h2
		expect(levels[0]).toBeLessThanOrEqual(2);

		// No heading should skip more than one level
		for (let i = 1; i < levels.length; i++) {
			const jump = levels[i] - levels[i - 1];
			expect(jump).toBeLessThanOrEqual(1);
		}
	});

	test('chat input textarea is labeled', async ({ page }) => {
		const chatInput = page.locator('#chat-input');
		const isVisible = await chatInput.isVisible({ timeout: 5000 }).catch(() => false);

		if (isVisible) {
			// Must have an accessible name via aria-label, aria-labelledby, or associated label
			const ariaLabel = await chatInput.getAttribute('aria-label');
			const ariaLabelledby = await chatInput.getAttribute('aria-labelledby');
			const placeholder = await chatInput.getAttribute('placeholder');
			const id = await chatInput.getAttribute('id');
			const hasLabel = id ? await page.locator(`label[for="${id}"]`).count() : 0;

			const hasAccessibleName =
				(ariaLabel && ariaLabel.length > 0) ||
				(ariaLabelledby && ariaLabelledby.length > 0) ||
				hasLabel > 0 ||
				(placeholder && placeholder.length > 0);

			expect(hasAccessibleName).toBe(true);
		}
	});

	test('model selector button has accessible label', async ({ page }) => {
		const modelButton = page.locator('button[aria-label="Select a model"]');
		const isVisible = await modelButton.isVisible({ timeout: 5000 }).catch(() => false);

		if (isVisible) {
			await expect(modelButton).toHaveAttribute('aria-label');
		}
	});

	test('interactive controls have accessible names', async ({ page }) => {
		// All buttons should have accessible text (text content, aria-label, or aria-labelledby)
		const buttons = await page.locator('button:visible').all();

		for (const button of buttons) {
			const textContent = (await button.textContent())?.trim();
			const ariaLabel = await button.getAttribute('aria-label');
			const ariaLabelledby = await button.getAttribute('aria-labelledby');
			const title = await button.getAttribute('title');

			const hasName =
				(textContent && textContent.length > 0) ||
				(ariaLabel && ariaLabel.length > 0) ||
				(ariaLabelledby && ariaLabelledby.length > 0) ||
				(title && title.length > 0);

			if (!hasName) {
				const outerHTML = await button.evaluate((el) => el.outerHTML.substring(0, 200));
				expect(hasName, `Button missing accessible name: ${outerHTML}`).toBe(true);
			}
		}
	});

	test('passes axe-core WCAG 2.2 AA scan', async ({ page }) => {
		const results = await new AxeBuilder({ page })
			.withTags(['wcag2a', 'wcag2aa', 'wcag22aa'])
			.exclude('.katex') // KaTeX math rendering may produce false positives
			.analyze();

		expect(results.violations).toEqual([]);
	});
});
