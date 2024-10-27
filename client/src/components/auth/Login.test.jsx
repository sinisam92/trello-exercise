import { render, screen } from "@testing-library/react";
// import userEvent from "@testing-library/user-event";
import React from "react";
import { Provider } from "react-redux";
import { describe, expect, test } from "vitest";

import store from "../../store/store";
import Login from "./Login";

describe("Login", () => {
  test("renders login form", () => {
    render(
      <Provider store={store}>
        <Login />
      </Provider>,
    );

    const emailInput = screen.getByLabelText("Email");
    const passwordInput = screen.getByLabelText("Password");
    const loginButton = screen.getByRole("button", { name: /Sign in/i });

    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(loginButton).toBeInTheDocument();
  });
});
