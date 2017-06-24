"use strict";
var roleUpgrader = {
    run: function (creep) {
        var controller = creep.room.controller;
        var storage = controller.pos.findInRange(FIND_STRUCTURES, 3, { filter: { structureType: STRUCTURE_STORAGE } })[0];
        upgradeController(creep, controller, storage);
    }
};
function upgradeController(creep, controller, storage) {
    if (controller && creep.upgradeController(controller) == ERR_NOT_IN_RANGE) {
        creep.moveTo(controller, { visualizePathStyle: { stroke: '#ffffff' } });
    }
    if (creep.carry.energy == 0)
        creep.memory.job = storage ? "collecting" : "requesting_energy";
}
function collectFromStorage(creep, storage) {
    if (creep.memory.job == "requesting_energy")
        return;
    if (creep.withdraw(storage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
        creep.moveTo(storage, { visualizePathStyle: { stroke: '#ffffff' } });
    }
}
module.exports = roleUpgrader;
