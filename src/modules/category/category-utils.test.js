'use strict';

let expect = require('chai').expect;
let categoryUtils = require('./category-utils');

describe('Category urils', function () {
    it('should return empty array when parentCategoryId was not passed', function () {
        let ids = categoryUtils.getChildIds();

        expect(ids.length).to.equal(0);
    });

    it('should return empty array, because parentCategoryId does not have children', function () {
        let categories = [
            {
                _id: '111'
            }
        ];

        let ids = categoryUtils.getChildIds('111', categories);

        expect(ids.length).to.equal(0);
    });

    it('should return one child', function () {
        let categories = [
            {
                _id: '111'
            },
            {
                _id: '222',
                parentId: '111'
            }
        ];

        let ids = categoryUtils.getChildIds('111', categories);

        expect(ids.length).to.equal(1);
        expect(ids[0]).to.equal(categories[1]._id);
    });

    it('should return deep child ids', function () {
        let categories = [
            {
                _id: '111'
            },
            {
                _id: '222',
                parentId: '111'
            },
            {
                _id: '333',
                parentId: '222'
            },
            {
                _id: '444',
                parentId: '333'
            }
        ];

        let ids = categoryUtils.getChildIds('111', categories);

        expect(ids.length).to.equal(3);
    });
});