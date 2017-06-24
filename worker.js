"use strict";
function calulateJob(creep, tower, construction, storage) {
    if (creep.carry.energy == creep.carryCapacity || (!storage && construction)) {
        if (construction)
            creep.memory.job = "constructing";
        else if (tower && tower.energy < tower.energyCapacity)
            creep.memory.job = "tower_refilling";
        else
            creep.memory.job = "upgrading";
    }
}
function constructStructure(creep, construction) {
    if (creep.build(construction) == ERR_NOT_IN_RANGE) {
        creep.moveTo(construction, { visualizePathStyle: { stroke: '#9af441' } });
    }
    if (creep.carry.energy == 0)
        creep.memory.job = "requesting_energy";
}
function upgradeController(creep, controller, storage) {
    if (controller && creep.upgradeController(controller) == ERR_NOT_IN_RANGE) {
        creep.moveTo(controller, { visualizePathStyle: { stroke: '#ffffff' } });
    }
    if (creep.carry.energy == 0)
        creep.memory.job = storage ? "collecting" : "requesting_energy";
}
function refillTower(creep, tower, storage) {
    if (creep.transfer(tower, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
        creep.moveTo(tower, { visualizePathStyle: { stroke: '#ffffff' } });
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
module.exports = {
    run: function (creep) {
        var controller = creep.room.controller;
        var storage = controller.pos.findInRange(FIND_STRUCTURES, 3, { filter: { structureType: STRUCTURE_STORAGE } })[0];
        var tower = _.find(creep.room.find(FIND_STRUCTURES), function (struct) { return struct.structureType == STRUCTURE_TOWER; });
        var construction = creep.room.find(FIND_CONSTRUCTION_SITES)[0];
        calulateJob(creep, tower, construction, storage);
        if (creep.memory.job == "upgrading") {
            upgradeController(creep, controller, storage);
        }
        else if (creep.memory.job == "constructing") {
            constructStructure(creep, construction);
        }
        else if (creep.memory.job == "tower_refilling") {
            refillTower(creep, tower, storage);
        }
        else if (storage) {
            collectFromStorage(creep, storage);
        }
    }
};
