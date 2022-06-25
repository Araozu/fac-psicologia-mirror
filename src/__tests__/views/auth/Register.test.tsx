import React from "react";
import { screen, render, RenderResult } from "@testing-library/react";
import '@testing-library/jest-dom';
import Register from "@/views/auth/Register";

let documentBody: RenderResult;

describe("Register", () => {
    beforeEach(() => {
        documentBody = render(<Register />);
    });

    it("Must display a title", () => {
        expect(documentBody.getByText("Sign up with")).toBeInTheDocument();
    });
});

