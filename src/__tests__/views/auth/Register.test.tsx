import { render, RenderResult, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Register from "@/views/auth/Register";

let body: RenderResult;

describe("Register", () => {
    beforeEach(() => {
        body = render(<Register />);
    });

    it("Must display a title", () => {
        expect(body.getByText("Sign up with credentials")).toBeInTheDocument();
    });

    it("Must display a form with name, email, password", () => {
        expect(body.getByLabelText("Name")).toBeInTheDocument();
        expect(body.getByPlaceholderText("Name")).toBeInTheDocument();

        expect(body.getByLabelText("Email")).toBeInTheDocument();
        expect(body.getByPlaceholderText("Email")).toBeInTheDocument();

        expect(body.getByLabelText("Password")).toBeInTheDocument();
        expect(body.getByPlaceholderText("Password")).toBeInTheDocument();
    });

    it("Must display an error message if Name is empty", () => {
        const nameEmptyEl = body.getByText("Name is empty");

        // The error message must be hidden by default
        expect(nameEmptyEl).toBeInTheDocument();
        expect(nameEmptyEl.style.display).toBe("none");

        const nameInput = body.getByPlaceholderText("Name") as HTMLInputElement;
        const submitButton = body.getByText("Create Account");

        nameInput.value = "";
        fireEvent(submitButton, new MouseEvent("click", {
            bubbles: true,
            cancelable: false,
        }));

        // After the event the alert message should be shown
        expect(nameEmptyEl.style.display).not.toBe("none");
    });
});

