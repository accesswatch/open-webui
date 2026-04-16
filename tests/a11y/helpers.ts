import type { Page } from '@playwright/test';

const ADMIN_EMAIL = process.env.TEST_ADMIN_EMAIL ?? 'admin@example.com';
const ADMIN_PASSWORD = process.env.TEST_ADMIN_PASSWORD ?? 'password';
const ADMIN_NAME = process.env.TEST_ADMIN_NAME ?? 'Test Admin';

/**
 * Create the initial admin account (first-run onboarding) or sign in
 * if the account already exists.
 */
export async function signInAsAdmin(page: Page): Promise<void> {
	await page.goto('/auth');
	await page.waitForLoadState('networkidle');

	// If the page has a "name" field we're in sign-up / onboarding mode
	const nameField = page.locator('#name');
	const isSignUp = await nameField.isVisible({ timeout: 2000 }).catch(() => false);

	if (isSignUp) {
		await nameField.fill(ADMIN_NAME);
		await page.locator('#email').fill(ADMIN_EMAIL);
		await page.locator('#password').fill(ADMIN_PASSWORD);
		await page.getByRole('button', { name: /create|sign up/i }).click();
	} else {
		await page.locator('#email').fill(ADMIN_EMAIL);
		await page.locator('#password').fill(ADMIN_PASSWORD);
		await page.getByRole('button', { name: /sign in/i }).click();
	}

	// Wait for redirect to the main app
	await page.waitForURL('/', { timeout: 15000 });
}
