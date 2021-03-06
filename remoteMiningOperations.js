"use strict";
var BodyCalulator = require("./bodyCalculator");
var roleCapturer = require("./capturer");
function manageRemoteMining(room) {
    var originSpawn = Game.spawns["OriginSpawn"];
    var roomSources = room.find(FIND_SOURCES);
    var _loop_1 = function (source) {
        if (!_.any(Game.creeps, function (creep) { return creep.memory.sourceid == source.id && creep.memory.role == "harvester"; })) {
            console.log("make remote harverster" + source.id);
            originSpawn.createCreep(BodyCalulator.getHarvesterBody(originSpawn.room), null, { role: "harvester", sourceid: source.id });
            return { value: void 0 };
        }
        else if (_.filter(Game.creeps, function (creep) { return creep.memory.sourceid == source.id && creep.memory.role == "mule"; }).length < 2) {
            console.log("make remote mule" + source.id);
            originSpawn.createCreep(BodyCalulator.getMuleBody(originSpawn.room), null, { role: "mule", sourceid: source.id });
            return { value: void 0 };
        }
    };
    for (var _i = 0, roomSources_1 = roomSources; _i < roomSources_1.length; _i++) {
        var source = roomSources_1[_i];
        var state_1 = _loop_1(source);
        if (typeof state_1 === "object")
            return state_1.value;
    }
}
function manageCapturer(flag) {
    var MINUMNCOSTCAPTURER = 650;
    var capturer = _.find(Game.creeps, function (creep) { return flag.memory.capturer && creep.name == flag.memory.capturer; });
    if (!capturer) {
        var originSpawn = Game.spawns["OriginSpawn"];
        if (originSpawn.room.energyCapacityAvailable >= MINUMNCOSTCAPTURER) {
            var creepName = originSpawn.createCreep(BodyCalulator.getCapturerBody(originSpawn.room), null, { role: "capturer" });
            flag.memory.capturer = creepName;
        }
        else {
            console.log("cant afford capturer, " + (MINUMNCOSTCAPTURER - originSpawn.room.energyCapacityAvailable) + " short");
        }
        return;
    }
    roleCapturer.run(capturer, flag);
}
module.exports = {
    run: function (flag) {
        if (flag.memory.type != "remote_mining")
            return;
        manageCapturer(flag);
        if (flag.room) {
            manageRemoteMining(flag.room);
        }
    }
};
