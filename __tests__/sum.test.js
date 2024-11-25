const sum = require("../sum")

describe("sum function", () => {
    //Позитивні тести 
    test("adds 10 + 25 equal 35", () => {
        expect(sum(10, 25)).toBe(35);
    });

    test("adds -12 + -2 equal -14", () => {
        expect(sum(-12, -2)).toBe (-14);
    });

    test("adds 0 + 0 equal 0", () => {
        expect(sum(0, 0)).toBe(0);
    });

    //Негативні тести

    test("Видати помилку якщо заначення не числові", () => {
        expect(() => sum(1, "2")).toThrowError();
        expect(() => sum("1", 2)).toThrowError();
    });

    test("Видати помилку якщо значення пропущено", () => {
        expect(() => sum(1)).toThrowError();
        expect(() => sum()).toThrowError();
    });
})