export function upgrader(creep: Creep): void {
    if (creep.store[RESOURCE_ENERGY] === 0) {
        creep.harvestSourse();
    } else {
        const c = creep.room.controller;
        if (c === undefined) {
            console.log("creep %s: creep.room.controller is undefined", creep.name);
            return;
        }
        if (creep.upgradeController(c) === ERR_NOT_IN_RANGE) {
            creep.moveTo(c);
        }
    }
}
