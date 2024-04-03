export function upgrader(creep: Creep): void {
    // working 代表正在升级 controller
    const working = Memory.creeps[creep.name].working;
    if (working && creep.store.getUsedCapacity() === 0) {
        Memory.creeps[creep.name].working = false;
    } else if (!working && creep.store.getFreeCapacity() === 0) {
        Memory.creeps[creep.name].working = true;
    }

    if (Memory.creeps[creep.name].working) {
        const c = creep.room.controller;
        if (c === undefined) {
            console.log("creep %s: creep.room.controller is undefined", creep.name);
            return;
        }
        if (creep.upgradeController(c) === ERR_NOT_IN_RANGE) {
            creep.moveTo(c);
        }
    } else {
        creep.harvestSourse();
    }
}
