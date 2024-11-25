function sum (a, b){
    if(typeof a !== "number" || typeof b !== "number"){
        throw new Error("Обидва значення мають бути числовими!");
    }
    return a + b;
}

module.exports = sum;