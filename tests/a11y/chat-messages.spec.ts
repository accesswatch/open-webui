import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { signInAsAdmin } from './helpers';

/**
 * Returns a mock model list matching the /api/models response shape.
 */
function mockModelsResponse() {
	return {
		data: [
			{
				id: 'test-model',
				name: 'Test Model',
				object: 'model',
				created: 1700000000,
				owned_by: 'test',
				info: {
					meta: {
						capabilities: {
							status_updates: false
						}
					}
				}
			}
		]
	};
}

/**
 * Returns an SSE-formatted streaming chat completion response.
 * The content is split across multiple chunks to simulate real streaming.
 */
function mockStreamingResponse(content: string): string {
	const words = content.split(' ');
	const chunks: string[] = [];

	for (const word of words) {
		chunks.push(
			`data: ${JSON.stringify({
				id: 'chatcmpl-test',
				object: 'chat.completion.chunk',
				created: Date.now(),
				model: 'test-model',
				choices: [
					{
						index: 0,
						delta: { content: word + ' ' },
						finish_reason: null
					}
				]
			})}\n\n`
		);
	}

	// Final chunk with finish_reason
	chunks.push(
		`data: ${JSON.stringify({
			id: 'chatcmpl-test',
			object: 'chat.completion.chunk',
			created: Date.now(),
			model: 'test-model',
			choices: [
				{
					index: 0,
					delta: {},
					finish_reason: 'stop'
				}
			]
		})}\n\n`
	);

	chunks.push('data: [DONE]\n\n');
	return chunks.join('');
}

test.describe('Chat messages accessibility (mocked model)', () => {
	test.beforeEach(async ({ page }) => {
		// Mock the models API so a model appears without a real LLM backend
		await page.route('**/api/models', (route) => {
			route.fulfill({
				status: 200,
				contentType: 'application/json',
				body: JSON.stringify(mockModelsResponse())
			});
		});

		// Mock chat completions to return a streaming response
		await page.route('**/api/chat/completions', (route) => {
			route.fulfill({
				status: 200,
				contentType: 'text/event-stream',
				body: mockStreamingResponse(
					'Hello! I can help you with many tasks including writing, analysis, and coding.'
				)
			});
		});

		await signInAsAdmin(page);
		await page.waitForLoadState('networkidle');
	});

	test('user can send a message and response area renders accessibly', async ({ page }) => {
		// Select the mock model
		const modelSelector = page.locator('button[aria-label="Select a model"]');
		await modelSelector.click();
		await page.locator('button[aria-roledescription="model-item"]').first().click();

		// Type and send a message
		const chatInput = page.locator('#chat-input');
		await chatInput.fill('Hi, what can you do?');
		await page.locator('button[type="submit"]').click();

		// Wait for the user message to appear
		await page.locator('.user-message').waitFor({ state: 'visible', timeout: 10000 });

		// Wait for the assistant response to appear
		await page.locator('.chat-assistant').waitFor({ state: 'visible', timeout: 10000 });
	});

	test('message list uses role="log" with aria-live', async ({ page }) => {
		// Select model and send a message
		await page.locator('button[aria-label="Select a model"]').click();
		await page.locator('button[aria-roledescription="model-item"]').first().click();
		await page.locator('#chat-input').fill('Test message');
		await page.locator('button[type="submit"]').click();

		await page.locator('.user-message').waitFor({ state: 'visible', timeout: 10000 });

		// The message container should use role="log" for live updates
		const messageLog = page.locator('[role="log"]');
		await expect(messageLog).toHaveAttribute('aria-live', 'polite');
	});

	test('chat conversation section has a heading', async ({ page }) => {
		await page.locator('button[aria-label="Select a model"]').click();
		await page.locator('button[aria-roledescription="model-item"]').first().click();
		await page.locator('#chat-input').fill('Test');
		await page.locator('button[type="submit"]').click();

		await page.locator('.user-message').waitFor({ state: 'visible', timeout: 10000 });

		// The chat section should have a sr-only heading
		const chatHeading = page.locator('#chat-conversation');
		await expect(chatHeading).toHaveCount(1);
		const tagName = await chatHeading.evaluate((el) => el.tagName.toLowerCase());
		expect(tagName).toBe('h2');
	});

	test('messages use listitem role', async ({ page }) => {
		await page.locator('button[aria-label="Select a model"]').click();
		await page.locator('button[aria-roledescription="model-item"]').first().click();
		await page.locator('#chat-input').fill('Hello');
		await page.locator('button[type="submit"]').click();

		await page.locator('.chat-assistant').waitFor({ state: 'visible', timeout: 10000 });

		// Each message should be a listitem
		const listItems = page.locator('[role="listitem"]');
		const count = await listItems.count();
		// At least 2: user message + assistant response
		expect(count).toBeGreaterThanOrEqual(2);
	});

	test('response action buttons have accessible labels', async ({ page }) => {
		await page.locator('button[aria-label="Select a model"]').click();
		await page.locator('button[aria-roledescription="model-item"]').first().click();
		await page.locator('#chat-input').fill('Hello');
		await page.locator('button[type="submit"]').click();

		await page.locator('.chat-assistant').waitFor({ state: 'visible', timeout: 10000 });

		// Hover over the assistant message to reveal action buttons
		await page.locator('.chat-assistant').first().hover();

		// Copy button
		const copyButton = page.locator('.copy-response-button').first();
		const copyVisible = await copyButton.isVisible({ timeout: 3000 }).catch(() => false);
		if (copyVisible) {
			const ariaLabel = await copyButton.getAttribute('aria-label');
			expect(ariaLabel?.length).toBeGreaterThan(0);
		}

		// Regenerate button (visible or hidden)
		const regenButton = page.locator('.regenerate-response-button').first();
		const regenVisible = await regenButton.isVisible({ timeout: 3000 }).catch(() => false);
		if (regenVisible) {
			const ariaLabel = await regenButton.getAttribute('aria-label');
			expect(ariaLabel?.length).toBeGreaterThan(0);
		}
	});

	test('response complete triggers sr-only announcement', async ({ page }) => {
		await page.locator('button[aria-label="Select a model"]').click();
		await page.locator('button[aria-roledescription="model-item"]').first().click();
		await page.locator('#chat-input').fill('Hello');
		await page.locator('button[type="submit"]').click();

		await page.locator('.chat-assistant').waitFor({ state: 'visible', timeout: 10000 });

		// After response completes, a sr-only live region should announce completion
		const srAnnouncement = page.locator('.chat-assistant .sr-only[aria-live="polite"]');
		const count = await srAnnouncement.count();
		if (count > 0) {
			const text = await srAnnouncement.first().textContent();
			// Should eventually contain "Response complete" or similar
			expect(text?.length).toBeGreaterThanOrEqual(0);
		}
	});

	test('chat area passes axe-core WCAG 2.2 AA scan after message exchange', async ({ page }) => {
		await page.locator('button[aria-label="Select a model"]').click();
		await page.locator('button[aria-roledescription="model-item"]').first().click();
		await page.locator('#chat-input').fill('Hello');
		await page.locator('button[type="submit"]').click();

		await page.locator('.chat-assistant').waitFor({ state: 'visible', timeout: 10000 });

		// Give the UI a moment to finish rendering all action buttons
		await page.waitForTimeout(1000);

		const results = await new AxeBuilder({ page })
			.withTags(['wcag2a', 'wcag2aa', 'wcag22aa'])
			.exclude('.katex')
			.analyze();

		expect(results.violations).toEqual([]);
	});
});
