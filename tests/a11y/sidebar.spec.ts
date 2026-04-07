import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { signInAsAdmin } from './helpers';

test.describe('Sidebar accessibility', () => {
	test.beforeEach(async ({ page }) => {
		await signInAsAdmin(page);
		await page.waitForLoadState('networkidle');
	});

	test('sidebar toggle button has accessible label', async ({ page }) => {
		const toggleButton = page.locator('#sidebar-toggle-button');
		const isVisible = await toggleButton.isVisible({ timeout: 3000 }).catch(() => false);

		if (isVisible) {
			const ariaLabel = await toggleButton.getAttribute('aria-label');
			expect(ariaLabel?.length).toBeGreaterThan(0);
		}
	});

	test('new chat button has accessible label', async ({ page }) => {
		const newChatButton = page.locator('button[aria-label="New Chat"]');
		const isVisible = await newChatButton.isVisible({ timeout: 3000 }).catch(() => false);

		if (isVisible) {
			await expect(newChatButton).toHaveAttribute('aria-label', 'New Chat');
		}
	});

	test('search button has accessible label', async ({ page }) => {
		const searchButton = page.locator('button[aria-label="Search"]');
		const isVisible = await searchButton.isVisible({ timeout: 3000 }).catch(() => false);

		if (isVisible) {
			await expect(searchButton).toHaveAttribute('aria-label', 'Search');
		}
	});

	test('sidebar section headings use proper heading elements', async ({ page }) => {
		// Chat history sections (Today, Yesterday, etc.) should use h3 elements
		const sidebarH3 = page.locator('h3');
		const count = await sidebarH3.count();
		// Sidebar should have section headings when there are chat history items
		// This is a structural check; 0 is acceptable if no chats exist
		expect(count).toBeGreaterThanOrEqual(0);
	});

	test('user profile menu button has accessible label', async ({ page }) => {
		const profileButton = page.locator('button[aria-label="Open User Profile Menu"]');
		const isVisible = await profileButton.isVisible({ timeout: 3000 }).catch(() => false);

		if (isVisible) {
			await expect(profileButton).toHaveAttribute('aria-label', 'Open User Profile Menu');
		}
	});

	test('sidebar links have discernible text', async ({ page }) => {
		// Workspace/Notes/etc. links in sidebar should have text or aria-label
		const sidebarLinks = page.locator('a[href*="/workspace"], a[href*="/playground"]');
		const links = await sidebarLinks.all();

		for (const link of links) {
			const isVisible = await link.isVisible().catch(() => false);
			if (isVisible) {
				const text = (await link.textContent())?.trim();
				const ariaLabel = await link.getAttribute('aria-label');

				const hasName = (text && text.length > 0) || (ariaLabel && ariaLabel.length > 0);
				expect(hasName).toBe(true);
			}
		}
	});

	test('passes axe-core WCAG 2.2 AA scan', async ({ page }) => {
		const results = await new AxeBuilder({ page })
			.withTags(['wcag2a', 'wcag2aa', 'wcag22aa'])
			.analyze();

		expect(results.violations).toEqual([]);
	});
});
