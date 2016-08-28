'use strict';

let Category = require('./category.resource');
let categoryUtils = require('./category-utils');
let _ = require('lodash');

function remove(categoryId) {
    return cascadeRemovingById(categoryId)
}

/**
 * Remove current and all child categories
 * */
function cascadeRemovingById(categoryId) {
    return new Promise(function (resolve, reject) {
        getChildCategoryIds(categoryId).then(function (categoryIds) {
            categoryIds.push(categoryId);

            Category.remove({
                _id: {
                    $in: categoryIds
                }
            }).then(resolve, reject);
        });
    });
}

function getChildCategoryIds(categoryId) {
    return new Promise(function (resolve, reject) {
        Category.find({}).then(function (categories) {
            categories = _.map(categories, function (category) {
                category = category.toObject();
                category._id = String(category._id);

                return category;
            });

            resolve(categoryUtils.getChildIds(categoryId, categories));
        }, reject);
    });
}

function update(query, data, options) {
    if (!data.parentId) {
        data.parentId = undefined;
    }

    return Category.update(query, data, options);
}

module.exports = {
    remove: remove,
    update: update,
    getChildCategoryIds: getChildCategoryIds
};