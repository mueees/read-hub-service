'use strict';

let TagResource = require('../resource/tag.resource');

class Tag {
    constructor(data){
        this.resource = new TagResource(data);
    }

    save (){
        let me = this;

        return this.resource.save().then(function (tagResource) {
            return me;
        });
    }

    get (property){
        return this.resource[property];
    }

    static isValid(data){
        return true;
    }

    static create (tagData){
        var tag = new Tag(tagData);

        return tag.save();
    }
}

module.exports = Tag;