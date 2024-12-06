import { expect, test } from "@playwright/test";

test("reg, login, create project and do CRUD on it", async ({ page }) => {
  await page.goto("http://localhost:5173/login");
  await page.getByRole("link", { name: "Do not have an account? -" }).click();
  await page.getByPlaceholder("Enter your username").dblclick();
  await page.getByPlaceholder("Enter your username").fill("testuser");
  await page.getByPlaceholder("Enter your username").press("Tab");
  await page.getByPlaceholder("Enter your first name").fill("Test");
  await page.getByPlaceholder("Enter your first name").press("Tab");
  await page.getByPlaceholder("Enter your last name").fill("Testuser");
  await page.getByPlaceholder("Enter your last name").press("Tab");
  await page.getByPlaceholder("Enter your email").fill("test@test.com");
  await page.getByPlaceholder("Enter your email").press("Tab");
  await page.getByPlaceholder("Enter your password").fill("Test@12345");
  await page.getByPlaceholder("Confirm your password").click();
  await page.getByPlaceholder("Confirm your password").fill("Test@12345");
  await page.getByRole("button", { name: "Sign Up" }).click();
  await page.getByPlaceholder("Enter your email").click();
  await page.getByPlaceholder("Enter your email").fill("test@test.com");
  await page.getByPlaceholder("Enter your email").press("Tab");
  await page.getByPlaceholder("Enter your password").click();
  await page.getByPlaceholder("Enter your password").fill("Test@12345");
  await page.getByRole("button", { name: "Sign In" }).click();
  await page.getByRole("button", { name: "add project" }).click();
  await page.getByPlaceholder("Enter project name").click();
  await page.getByPlaceholder("Enter project name").fill("New Project");
  await page.getByPlaceholder("Enter image URL").click();
  await page.locator(".select__input-container").click();
  await page.getByRole("option", { name: "testuser" }).click();
  await page.getByRole("button", { name: "Add", exact: true }).click();
  await expect(
    page
      .locator("div")
      .filter({ hasText: /^New Project$/ })
      .nth(4),
  ).toBeVisible();
  await page.getByRole("heading", { name: "Projects" }).click();
  await page.getByRole("button", { name: "menu icon", exact: true }).click();
  await page.getByRole("button", { name: "Edit" }).click();
  await page.getByText("Project NameCover Image").click();
  await page.getByPlaceholder("Enter project name").click();
  await page.getByPlaceholder("Enter project name").fill("New Project Edited");
  await page.locator(".select__input-container").click();
  await page.locator(".select__input-container").click();
  await page.getByRole("button", { name: "Save" }).click();
  await expect(
    page.getByRole("link", { name: "New Project Edited menu icon" }),
  ).toBeVisible();
  await page.getByRole("button", { name: "menu icon", exact: true }).click();
  page.once("dialog", (dialog) => {
    console.log(`Dialog message: ${dialog.message()}`);
    dialog.dismiss().catch(() => {});
  });
  await page.getByRole("button", { name: "Delete" }).click();
  await expect(
    page.getByRole("heading", { name: "No Project with this name!" }),
  ).toBeVisible();
});
