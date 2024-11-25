import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Button from "../src/button";

describe("Button component", () => {
    test("Рендерить кнопку з правильним текстом", () => {
        render(<Button/>);
        const buttonElement = screen.getByText(/click me!/i);
        expect(buttonElement).toBeInTheDocument(); 
    });

    test("викликає функцію обробки події після кліку", () => {
        const mockOnClick = jest.fn();
        render(<Button onClick={mockOnClick} />);

        const buttonElement = screen.getByText(/click me!/i);
        fireEvent.click(buttonElement);

        expect(mockOnClick).toHaveBeenCalledTimes(1);
    });
})