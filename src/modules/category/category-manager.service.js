'use strict';

let Category = require('./category.resource');
let _ = require('lodash');

/**
 * Remove current and all child categories
 * */
function cascadeRemovingById(categoryId) {
    return new Promise(function (resolve, reject) {
        getChildCategoryIds(categoryId).then(function (categoryIds) {
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
            resolve(_getChildCategoryIds(categoryId, categories));
        }, reject);
    });
}

function _getChildCategoryIds(categoryId, categories) {
    var categoryIds = _(categories)
        .filter(function (category) {
            return String(category.parentId) === categoryId;
        })
        .map('_id')
        .value();

    var ids = [];

    _.each(categoryIds, function (categoryId) {
        ids = ids.concat(_getChildCategoryIds(categoryId, categories));
    });

    ids.push(categoryId);

    return ids.concat(categoryIds);
}

function update(query, data, options) {
    if (!data.parentId) {
        data.parentId = undefined;
    }

    return Category.update(query, data, options);
}

function remove(categoryId) {
    return cascadeRemovingById(categoryId)
}

module.exports = {
    remove: remove,
    update: update
};