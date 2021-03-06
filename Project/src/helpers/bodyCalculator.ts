class BodyCalculator {
    getHarvesterBody = (room: Room): string[] => {
        var bodyTemplate = [MOVE, WORK, WORK, WORK, WORK, WORK];

        return this.makeBestBodyCurrentlyPossible(room, bodyTemplate);
    }

    getMuleBody = (room: Room): string[] => {
        var bodyTemplate = [MOVE, CARRY, MOVE, CARRY, MOVE, CARRY, MOVE, CARRY, MOVE, CARRY, MOVE, CARRY, MOVE, CARRY, MOVE, CARRY, MOVE, CARRY];

        return this.makeBestBodyCurrentlyPossible(room, bodyTemplate);
    }

    getWorkerBody = (room: Room): string[] => {
        var bodyTemplate = [MOVE, CARRY, WORK, WORK, WORK, WORK, WORK, CARRY];

        return this.makeBestBodyCurrentlyPossible(room, bodyTemplate);
    }

    getCapturerBody = (room: Room): string[] => {
        var bodyTemplate = [MOVE, CLAIM, CLAIM, MOVE];

        return this.makeBestBodyCurrentlyPossible(room, bodyTemplate);
    }

    getBuilderBody = (room: Room): string[] => {
        var bodyTemplate = [MOVE, WORK, CARRY, WORK, CARRY, MOVE, WORK, CARRY, MOVE];

        return this.makeBestBodyCurrentlyPossible(room, bodyTemplate);
    }

    getProtectorBody = (room: Room): string[] => {
        var bodyTemplate = [MOVE, RANGED_ATTACK, ATTACK, RANGED_ATTACK, ATTACK, ATTACK, MOVE, MOVE, MOVE, TOUGH, MOVE, TOUGH, MOVE, MOVE];

        return this.makeBestBodyCurrentlyPossible(room, bodyTemplate);
    }

    getHealerBody = (room: Room): string[] => {
        var bodyTemplate = [MOVE, HEAL, MOVE, HEAL, MOVE, HEAL, MOVE, TOUGH, MOVE, TOUGH, MOVE, TOUGH, MOVE, TOUGH, MOVE, TOUGH, MOVE];

        return this.makeBestBodyCurrentlyPossible(room, bodyTemplate);
    }

    calculateCost = (body: string[]): number => {
        return _.sum(body.map((b) => BODYPART_COST[b]));
    }

    private makeBestBodyCurrentlyPossible(room: Room, bodyTemplate: string[]): string[] {
        var desiredCost = room.find(FIND_MY_CREEPS).length < 3 ? SPAWN_ENERGY_CAPACITY : room.energyCapacityAvailable;

        while (this.calculateCost(bodyTemplate) > desiredCost && this.calculateCost(bodyTemplate) % 2 == 0) {
            bodyTemplate = _.dropRight(bodyTemplate);
        }

        return bodyTemplate.reverse();
    }
}

export = new BodyCalculator();