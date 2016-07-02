'use strict';

let BookResource = require('../resource/book.resource');

class Book {
    constructor(data){
        this.resource = new BookResource(data);
    }

    save (){
        let me = this;

        return this.resource.save().then(function (bookResource) {
            return me;
        });
    }

    get (property){
        return this.resource[property];
    }

    static isValid(data){
        return true;
    }

    static create (bookData){
        var book = new Book(bookData);

        return book.save();
    }
}

module.exports = Book;