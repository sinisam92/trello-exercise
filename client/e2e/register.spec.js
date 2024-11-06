import { expect, test } from "@playwright/test";

test("register with unique email", async ({ page }) => {
  const uniqueEmail = `johndoe${Date.now()}@example.com`;

  await page.goto("http://localhost:5173/login");

  await page.getByRole("link", { name: "Do not have an account? -" }).click();

  await page.getByPlaceholder("Enter your username").fill("john");
  await page.getByPlaceholder("Enter your first name").fill("John");
  await page.getByPlaceholder("Enter your last name").fill("Doe");
  await page.getByPlaceholder("Enter your email").fill(uniqueEmail);
  await page.getByPlaceholder("Enter your password").fill("John123");
  await page.getByPlaceholder("Confirm your password").fill("John123");
  await page.getByRole("button", { name: "Sign Up" }).click();
  await page.waitForURL("http://localhost:5173/login");
  await expect(page.getByRole("heading", { name: "Login" })).toBeVisible();
  await expect(page.getByText("Email")).toBeVisible();
  await expect(page.getByText("Password")).toBeVisible();
  await expect(page.getByRole("button", { name: "Sign In" })).toBeVisible();
});
