


module.exports = class Validator {

    self;
    constructor(){
        this.self = this;
    }

    isString(value){
        return (typeof value === "string")   
    }

    isNotEmpty(value){    
        return (value !== '' && value !== null && typeof value !== 'undefined');
    }

    isInt(value){
        return Number.isInteger(value);
    }

    validate(value, rules){
        return rules.every((rule)=>{
            return this.self[rule](value)
        })
    }

} 

