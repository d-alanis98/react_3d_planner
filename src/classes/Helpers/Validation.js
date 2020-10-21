export default class Validation {
    static validateInputValue = inputValue => {

    }

    static areAllFieldsSet = (...values) => {
        let allFieldsSet = true;
        [...values].forEach(value => {
            if(!value)
                allFieldsSet = false;
        });
        return allFieldsSet;
    }

    static areAllPositive = (...numbers) => {
        let allPositive = true;
        [...numbers].forEach(number => {
            if(Validation.isNegative(number) || Validation.isZero(number))
                allPositive = false;
        });

        return allPositive;
    }

    static isZero = number => Number(number) === 0;
    static isNegative = number => Number(number) < 0;
    static isPositive = number => Number(number) >= 0;

}