const { test, expect } = require('@playwright/test');

const PAGE_URL = '/kitchen-remodeling';

// Test 1 - covers TC-001: user submits valid ZIP code and gets to results page
test('user can submit valid ZIP code and see results page', async ({ page }) => {
  // open the kitchen remodeling landing page
  await page.goto(PAGE_URL);

  // check that page loaded - heading should be visible
  const heading = page.locator('h1');
  await expect(heading).toBeVisible();
  await expect(heading).toContainText('Kitchen');

  // find ZIP code input field and type valid ZIP
  const zipInput = page.getByPlaceholder('Enter ZIP Code').first();
  await expect(zipInput).toBeVisible();
  await zipInput.fill('10001');

  // click Get estimate button
  const submitButton = page.getByRole('button', { name: 'Get estimate' }).first();
  await expect(submitButton).toBeVisible();
  await submitButton.click();

  // wait for navigation to results page
  await page.waitForLoadState('networkidle');

  // check that we moved to a new page (URL should change)
  const currentUrl = page.url();
  expect(currentUrl).not.toBe(PAGE_URL);

  // check that results page has some content
  const pageContent = page.locator('body');
  await expect(pageContent).not.toBeEmpty();
});


// Test 2 - covers TC-002: ZIP code form validation with empty and invalid inputs
test('ZIP code form shows validation for invalid inputs', async ({ page }) => {
  await page.goto(PAGE_URL);

  const zipInput = page.getByPlaceholder('Enter ZIP Code').first();
  const submitButton = page.getByRole('button', { name: 'Get estimate' }).first();

  // try submitting with empty field
  await submitButton.click();

  // user should stay on same page - form should not submit
  await expect(page).toHaveURL(new RegExp(PAGE_URL));

  // try entering letters - field should not accept them or show error
  await zipInput.fill('abcde');
  await submitButton.click();

  // should still be on the same page
  await expect(page).toHaveURL(new RegExp(PAGE_URL));

  // clear and try with too short ZIP (only 3 digits)
  await zipInput.clear();
  await zipInput.fill('100');
  await submitButton.click();

  // should still be on the landing page - validation should prevent submit
  await expect(page).toHaveURL(new RegExp(PAGE_URL));

  // now enter valid ZIP to confirm form works after failed attempts
  await zipInput.clear();
  await zipInput.fill('10001');
  await submitButton.click();

  // wait for page to load
  await page.waitForLoadState('networkidle');

  // this time it should navigate away from landing page
  const finalUrl = page.url();
  expect(finalUrl).not.toContain(PAGE_URL);
});
