//定义类
export default class{
    constructor(){
        this._id = (new Date()).getTime();
    }

    get id(){
        return this._id;
    }

    set id(value){
        this._id = value;
    }

    toString() {
        return 'this is a element';
    }
}