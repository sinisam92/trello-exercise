import { expect, test } from "@playwright/test";

//prettier-ignore
test('test if user can login and land on Projects page', async ({ page }) => {
  await page.goto('http://localhost:5174/login');
  await page.getByPlaceholder('Enter your email').click();
  await page.getByPlaceholder('Enter your email').fill('araceli.bradtke@hotmail.com');
  await page.getByPlaceholder('Enter your password').click();
  await page.getByPlaceholder('Enter your password').fill('123456789');
  await page.getByRole('button', { name: 'Sign In' }).click();
  await expect(page.getByRole('heading', { name: 'Projects' })).toBeVisible();
});
