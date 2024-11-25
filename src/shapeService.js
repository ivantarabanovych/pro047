export class ShapeService {
    constructor() {
        this.shapes = [];
        this.nextId = 1; 
    }

    addShape(shape) {
        const newShape = { id: this.nextId++, ...shape };
        this.shapes.push(newShape);
        return newShape;
    }

    updateShape(id, updatedData) {
        const shapeIndex = this.shapes.findIndex((shape) => shape.id === id);
        if (shapeIndex === -1) {
            throw new Error(`Shape with ID ${id} not found`);
        }
        this.shapes[shapeIndex] = { ...this.shapes[shapeIndex], ...updatedData };
        return this.shapes[shapeIndex];
    }

    deleteShape(id) {
        const shapeIndex = this.shapes.findIndex((shape) => shape.id === id);
        if (shapeIndex === -1) {
            throw new Error(`Shape with ID ${id} not found`);
        }
        const deletedShape = this.shapes.splice(shapeIndex, 1)[0];
        return deletedShape;
    }

    getShape(id) {
        const shape = this.shapes.find((shape) => shape.id === id);
        if (!shape) {
            throw new Error(`Shape with ID ${id} not found`);
        }
        return shape;
    }
}
