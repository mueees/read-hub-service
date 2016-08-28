'use strict';

let _ = require('lodash');

function getChildIds(parentCategoryId, categories) {
    var firstChildIds = _(categories)
        .filter(function (category) {
            return String(category.parentId) === String(parentCategoryId);
        })
        .map('_id')
        .value();

    var childIds = [];

    _.each(firstChildIds, function (firstChildId) {
        childIds = childIds.concat(getChildIds(firstChildId, categories));
    });

    return childIds.concat(firstChildIds);
}

exports.getChildIds = getChildIds;