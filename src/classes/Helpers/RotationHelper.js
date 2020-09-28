/**
 * @author Damián Alanís Ramírez
 * @version 1.2.1
 * Helper methods for the rotation angles and number of turns
 */
export default class RotationHelper {
    /**
     * Auxiliar method, receives the rotation expresed in radians and returns the rotation expresed in degrees.
     * @param {number} rotationInRadians 
     */
    static getRotationInDegrees = rotationInRadians => rotationInRadians * 180 / Math.PI;

    /**
     * Auxiliar method, receives the rotation expresed in degrees and returns the rotation expresed in radians.
     * @param {number} rotationInDegrees 
     */
    static getRotationInRadians = rotationInDegrees => rotationInDegrees * Math.PI / 180;

    /**
     * Returns true if the number of turns (90° or -90° for each turn) is odd, otherwise returns false.
     * @param {number} rotationInDegrees 
     */
    static isNumberOfTurnsOdd = rotationInDegrees => !rotationInDegrees || ((rotationInDegrees / 90) % 2 === 0);
}