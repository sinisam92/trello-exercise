import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { describe, expect, test } from "vitest";

import store from "../../store/store";
import Register from "./Register";

describe("Register", () => {
  test("renders register form", () => {
    render(
      <Provider store={store}>
        <Register />
      </Provider>,
    );

    const usernameInput = screen.getByLabelText("Username");
    const firstNameInput = screen.getByLabelText("First Name");
    const lastNameInput = screen.getByLabelText("Last Name");
    const emailInput = screen.getByLabelText("Email");
    const passwordInput = screen.getByLabelText("Password");
    const registerButton = screen.getByRole("button", { name: /Sign up/i });

    expect(usernameInput).not.toBeInTheDocument();
    expect(firstNameInput).toBeInTheDocument();
    expect(lastNameInput).toBeInTheDocument();
    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(registerButton).toBeInTheDocument();
  });
});
