/**
 * Created by Michael Root on 12/3/2015.
 */
var fs = require('fs');
var House = require('./house');

var world = {};

// initialize world
// for each direction instruction
// update location
// North implies ++y
// South implies --y
// East implies ++x;
// West implies --x;

// check if location is already in world
// if so, deliver present to the house
// if not, create house w/ location, deliver present, add to world
fs.readFile('input.txt', 'utf-8', function (err, data) {
    if (err) {
        console.error('Error reading file' + err);
    }

    var location = [0, 0],
        roboLocation = [0, 0];
    var house = new House(location).deliverPresent();

    house.deliverPresent();
    world[house.getAddress()] = house;

    var length = data.length,
        i = 0,
        santaTurn = true;

    function updateLocation(direction, location) {
        if (direction === '>') {
            location[0]++;
        }
        else if (direction === '<') {
            location[0]--;
        }
        else if (direction === '^') {
            location[1]++;
        }
        else if (direction === 'v') {
            location[1]--;
        }
    }

    for (; i < length; i++) {
        var someonesLocation;

        if (santaTurn) {
            someonesLocation = location;
        } else {
            someonesLocation = roboLocation;
        }

        updateLocation(data[i], someonesLocation);

        house = world[someonesLocation] || new House(someonesLocation);
        world[someonesLocation] = house;
        house.deliverPresent();

        santaTurn = !santaTurn;
    }

    console.log(Object.keys(world).length);

});



