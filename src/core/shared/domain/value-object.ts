import { isEqual } from "lodash";

export abstract class ValueObject{
    public equals(vo: this): boolean {
        if (vo === null || vo === undefined) {
            return false;
        }
        
        if (this.constructor !== vo.constructor) {
            return false;
        }

        return isEqual(this, vo);
    }
}