/**
 * Created by Michael Root on 12/20/2015.
 */
var fs = require('fs');

function comb(k, list) {
    if (k === 0) {
        return [[]];
    }

    if (k === list.length) {
        return [list];
    }

    var currentItem = list[0];
    var everythingElse = list.slice(1);

    //k-1 assumes we choose currentItem and we recurse on everything else
    //the other side of recursion covers the other case
    return comb(k - 1, everythingElse).map(function (combination) {
            return [currentItem].concat(combination);
        })
        .concat(comb(k, everythingElse));
}

module.exports.solvePuzzle = function () {
    var containers = fs.readFileSync(__dirname + '/input.txt', 'utf-8').split('\n').map(c => +c);

    var meetsCriteria = 0;

    for (var i = 1; i < containers.length; i++) {
        meetsCriteria += comb(i, containers).map(function (combo) {
            return combo.reduce((prev, curr) => prev + curr);
        }).filter(total => total === 150).length;
    }

    return meetsCriteria;
};
