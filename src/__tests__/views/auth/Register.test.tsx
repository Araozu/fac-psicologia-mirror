import {cleanup, fireEvent, render, RenderResult, waitFor} from "@testing-library/react";
import "@testing-library/jest-dom";
import Register from "@/views/auth/Register";
import {ResponseData} from "@/views/auth/functions";
import {BrowserRouter, Route} from "react-router-dom";

let body: RenderResult;
let mockRegisterFn = jest.fn();

function fillInput(input: HTMLElement, value: string) {
    fireEvent.change(input, {target: {value}});
}

describe("Register", () => {
    beforeEach(() => {
        mockRegisterFn = jest.fn();
        body = render(<Register registerFn={mockRegisterFn} />);
    });

    afterEach(() => {
        cleanup();
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

        fireEvent(submitButton, new MouseEvent("click"));

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
        fireEvent(submitButton, new MouseEvent("click"));

        // The alert message should be hidden, since we put a value
        expect(nameEmptyEl.style.display).toBe("none");
    });

    // TODO: Email validation

    it("Must display an error message if Email is empty", () => {
        const emailEmptyEl = body.getByText("Email is empty");

        // The error message must be hidden by default
        expect(emailEmptyEl).toBeInTheDocument();
        expect(emailEmptyEl.style.display).toBe("none");

        const submitButton = body.getByText("Create Account");

        fireEvent(submitButton, new MouseEvent("click"));

        // After the event the alert message should be shown
        expect(emailEmptyEl.style.display).not.toBe("none");
    });

    it("Must not display an error message if Email is not empty", () => {
        const emailEmptyEl = body.getByText("Email is empty");
        const emailInput = body.getByPlaceholderText("Email") as HTMLInputElement;
        const submitButton = body.getByText("Create Account");

        // Place some name
        // TODO: Email validation
        fireEvent.change(emailInput, {target: {value: "sample@email.com"}});
        expect(emailInput.value).toBe("sample@email.com");

        // Submit form
        fireEvent(submitButton, new MouseEvent("click"));

        // The alert message should be hidden, since we put a value
        expect(emailEmptyEl.style.display).toBe("none");
    });

    it("Must display an error message if Password is empty", () => {
        const passwordEmptyEl = body.getByText("Password is empty");

        // The error message must be hidden by default
        expect(passwordEmptyEl).toBeInTheDocument();
        expect(passwordEmptyEl.style.display).toBe("none");

        const submitButton = body.getByText("Create Account");

        fireEvent(submitButton, new MouseEvent("click"));

        // After the event the alert message should be shown
        expect(passwordEmptyEl.style.display).not.toBe("none");
    });

    it("Must not display an error message if Email is not empty", () => {
        const passwordEmptyEl = body.getByText("Password is empty");
        const passwordInput = body.getByPlaceholderText("Password") as HTMLInputElement;
        const submitButton = body.getByText("Create Account");

        // Place some password
        // TODO: password validation
        fireEvent.change(passwordInput, {target: {value: "12345678"}});
        expect(passwordInput.value).toBe("12345678");

        // Submit form
        fireEvent(submitButton, new MouseEvent("click"));

        // The alert message should be hidden, since we put a value
        expect(passwordEmptyEl.style.display).toBe("none");
    });

    it("Should call the registration function if all fields are correct", () => {
        const submitButton = body.getByText("Create Account");

        // Fill inputs
        fillInput(body.getByPlaceholderText("Name"), "Juan Perez");
        fillInput(body.getByPlaceholderText("Email"), "sample@test.com");
        fillInput(body.getByPlaceholderText("Password"), "12345678");

        // Submit form
        fireEvent(submitButton, new MouseEvent("click"));

        expect(mockRegisterFn).toBeCalled();
    });

    it("Should not call the registration function if one field is empty", () => {
        const submitButton = body.getByText("Create Account");

        // Fill some inputs
        fillInput(body.getByPlaceholderText("Name"), "Juan Perez");
        fillInput(body.getByPlaceholderText("Email"), "sample@test.com");

        // Submit form
        fireEvent(submitButton, new MouseEvent("click"));

        expect(mockRegisterFn).not.toBeCalled();
    });
});

function RouterMock(component: JSX.Element) {
    return (
        <BrowserRouter>
            {component}
            <Route path={"/admin/dashboard"}>
                <span>Redirection successful</span>
            </Route>
        </BrowserRouter>
    );
}

describe("Registration", () => {
    afterEach(() => {
        cleanup();
    });

    it("Should display an error message on registration error", () => {
        const errorMock = jest.fn(() => new Promise<ResponseData>((resolve) => {
            resolve({
                ok: false,
                json: {message: ""},
            });
        }));

        const body = render(<Register registerFn={errorMock} />);
        const submitButton = body.getByText("Create Account");
        const registrationErrorEl = body.getByText("Registration error");

        // Fill inputs
        fillInput(body.getByPlaceholderText("Name"), "Juan Perez");
        fillInput(body.getByPlaceholderText("Email"), "sample@test.com");
        fillInput(body.getByPlaceholderText("Password"), "12345678");

        // Submit form
        fireEvent(submitButton, new MouseEvent("click"));

        waitFor(() => {
            expect(errorMock).toHaveBeenCalledTimes(1);
            expect(registrationErrorEl.style.display).not.toBe("none");
        });
    });

    it("Should redirect to dashboard after success", () => {
        const successMock = jest.fn(() => new Promise<ResponseData>((resolve) => {
            resolve({
                ok: true,
                json: {message: ""},
            });
        }));

        const body = render(RouterMock(<Register registerFn={successMock} />));
        const submitButton = body.getByText("Create Account");


        // Fill inputs
        fillInput(body.getByPlaceholderText("Name"), "Juan Perez");
        fillInput(body.getByPlaceholderText("Email"), "sample@test.com");
        fillInput(body.getByPlaceholderText("Password"), "12345678");

        // Submit form
        fireEvent(submitButton, new MouseEvent("click"));

        waitFor(() => {
            expect(successMock).toHaveBeenCalledTimes(1);
            expect(body.getByText("Redirection successful")).toBeInTheDocument();
        });
    });
});
