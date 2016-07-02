'use strict';

let CategoryResource = require('../resource/category.resource');

class Category {
    constructor(data){
        this.resource = new CategoryResource(data);
    }

    save (){
        let me = this;

        return this.resource.save().then(function (categoryResource) {
            return me;
        });
    }

    get (property){
        return this.resource[property];
    }

    static isValid(data){
        return true;
    }

    static create (categoryData){
        var category = new Category(categoryData);

        return category.save();
    }
}

module.exports = Category;