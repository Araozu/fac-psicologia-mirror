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

        const submitButton = body.getByText("Create Account");

        fireEvent(submitButton, new MouseEvent("click", {
            bubbles: true,
            cancelable: false,
        }));

        // After the event the alert message should be shown
        expect(nameEmptyEl.style.display).not.toBe("none");
    });

    it("Must not display an error message if Name is not empty", () => {
        const nameEmptyEl = body.getByText("Name is empty");
        const nameInput = body.getByPlaceholderText("Name") as HTMLInputElement;
        const submitButton = body.getByText("Create Account");

        // Place some name
        fireEvent.change(nameInput, {target: {value: "Juan Perez"}});
        expect(nameInput.value).toBe("Juan Perez");

        // Submit form
        fireEvent(submitButton, new MouseEvent("click", {
            bubbles: true,
            cancelable: false,
        }));

        // The alert message should be hidden, since we put a value
        expect(nameEmptyEl.style.display).toBe("none");
    });

    // TODO: Name validation

    it("Must display an error message if Email is empty", () => {
        const emailEmptyEl = body.getByText("Email is empty");

        // The error message must be hidden by default
        expect(emailEmptyEl).toBeInTheDocument();
        expect(emailEmptyEl.style.display).toBe("none");

        const submitButton = body.getByText("Create Account");

        fireEvent(submitButton, new MouseEvent("click", {
            bubbles: true,
            cancelable: false,
        }));

        // After the event the alert message should be shown
        expect(emailEmptyEl.style.display).not.toBe("none");
    });
});

