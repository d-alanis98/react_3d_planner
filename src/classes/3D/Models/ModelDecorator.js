/**
 * @author Damian Alanis Ramirez
 * @version 1.1.1
 */
export default class ModelDecorator {
    //Available styles
    static ACTIVE_STYLE = {
        color: { r: 0, g: 255, b: 255 }
    };

    static INACTIVE_STYLE = {
        color: { r: 1, g: 1, b: 1 }
    };


    /**
     * This method applies the selected styles object to the model's material.
     * @param {object} model 
     * @param {object} style 
     */
    static applyStyle = (model, style = null) => {
        let modelStyle = style || ModelDecorator.ACTIVE_STYLE; 
        if(!model.material)
            return;
        Object.entries(modelStyle).forEach(([property, value]) => {
            if(model.material[property])
                model.material[property] = value;
        })
    }

}