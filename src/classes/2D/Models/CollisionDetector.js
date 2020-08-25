/**
 * @author Damián Alanís Ramírez
 * @version 1.0.0
 */

export default class CollisionDetector {
    static haveIntersection(fixedObject, movingObject) {
        return !(
          movingObject.x > fixedObject.x + fixedObject.width + 0.01 ||
          movingObject.x + movingObject.width < fixedObject.x + 0.01 ||
          movingObject.y > fixedObject.y + fixedObject.height + 0.01 ||
          movingObject.y + movingObject.height < fixedObject.y + 0.01
        );
    }

    static calculateIntersection(fixedObject, movingObject) { 
        let position = {
            x: movingObject.x,
            y: movingObject.y
        }
        //Si esta intersectando en x por la derecha
        if(
            movingObject.x > fixedObject.x + 0.1 && 
            movingObject.x < fixedObject.x + fixedObject.width + 0.1
        ){
            console.log(`Se recorrerá el objeto ${fixedObject.x+ fixedObject.width - movingObject.x}`)
            position.x = (fixedObject.x + 1.5*fixedObject.width);
            return position;
        }
        //Si esta intersectando en x por la izquierda
        if(
            movingObject.x < fixedObject.x && 
            movingObject.x + movingObject.width < fixedObject.x + fixedObject.width
        ){
            console.log(`Se recorrerá el objeto ${fixedObject.x+ fixedObject.width - movingObject.x}`)
            position.x = (fixedObject.x - .5*fixedObject.width);
            return position;
        }
        
        //Si esta intersectando en y por arriba
        if(
            movingObject.y > fixedObject.y && 
            movingObject.y < fixedObject.y + fixedObject.height
        ){
            position.y = fixedObject.y - .5*fixedObject.height;
        }
        return position;

    }
    static detectCollisions = (event, model) => {

        return;
        const {
            haveIntersection
        } = CollisionDetector;
        let { 
            target,
            target: { parent: layer },
            currentTarget,
            currentTarget: { attrs: { x, y }},
            
        } = event;
        let targetRect = target.getClientRect();
        let snapPosition = {
            x, y
        }
        

        layer.children.forEach(group => {
            //Do not check intersection with itself
            if(group === target) {
              return;
            }

            //If there is an intersection we restore the previous position
            if (haveIntersection(group.getClientRect(), targetRect)) {
                console.log({ groupRect: group.getClientRect(), currentTarget })
                let { parent: stage } = layer;
                model.position(this.calculateIntersection(group.getClientRect(), targetRect))
                stage.batchDraw();

            }
          });
    }
}