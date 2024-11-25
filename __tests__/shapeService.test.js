import { ShapeService } from "../src/shapeService";

describe("ShapeService", () => {
    let shapeService;

    beforeEach(() => {
        shapeService = new ShapeService();
    });

    test("додає нову фігуру", () => {
        const shape = { type: "circle", color: "red", radius: 5 };
        const result = shapeService.addShape(shape);

        expect(result).toMatchObject(shape);
        expect(result.id).toBe(1);
        expect(shapeService.shapes).toHaveLength(1);
    });

    test("оновлює фігуру за ID", () => {
        const shape = { type: "square", color: "blue", size: 10 };
        const addedShape = shapeService.addShape(shape);

        const updatedShape = shapeService.updateShape(addedShape.id, { color: "green" });

        expect(updatedShape.color).toBe("green");
        expect(updatedShape.type).toBe("square");
    });

    test("видаляє фігуру за ID", () => {
        const shape = { type: "triangle", color: "yellow", height: 15 };
        const addedShape = shapeService.addShape(shape);

        const deletedShape = shapeService.deleteShape(addedShape.id);

        expect(deletedShape).toEqual(addedShape);
        expect(shapeService.shapes).toHaveLength(0);
    });

    test("отримує фігуру за ID", () => {
        const shape = { type: "circle", color: "red", radius: 5 };
        const addedShape = shapeService.addShape(shape);

        const result = shapeService.getShape(addedShape.id);

        expect(result).toEqual(addedShape);
    });

    test("кидає помилку, якщо фігура не знайдена за ID при оновленні", () => {
        expect(() => shapeService.updateShape(999, { color: "green" }))
            .toThrowError("Shape with ID 999 not found");
    });

    test("кидає помилку, якщо фігура не знайдена за ID при видаленні", () => {
        expect(() => shapeService.deleteShape(999))
            .toThrowError("Shape with ID 999 not found");
    });

    test("кидає помилку, якщо фігура не знайдена за ID при отриманні", () => {
        expect(() => shapeService.getShape(999))
            .toThrowError("Shape with ID 999 not found");
    });
});
