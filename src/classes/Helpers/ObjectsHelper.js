export default class ObjectsHelper {
    constructor(object) {
        this.object = object;
    }

    static isEmpty = object => Object.keys(object).length === 0;

    getObject = () => this.object;

    getKeys = () => Object.keys(this.object);

    getValues = () => Object.values(this.object);

    getCount = key => this.object[key] || 0;

    static getCount = (object, key) => object[key] || 0;

    getIncreasedCount = key => this.object[key] ? this.object[key]++ : 1;
    
    getDecreasedCount = key => this.object[key] ? this.object[key]-- : 0;

    setIncreasedCount = key => {
        this.object = {
            ...this.object,
            [key]: this.getIncreasedCount(key)
        }
    }

    getObjectWithIncreasedCount = key => ({
        ...this.object,
        [key]: this.getIncreasedCount(key)
    });


}