export function upgrader(creep: Creep, updateMemory: boolean): void {
    // working 代表正在升级controller
    const name = creep.name;
    let working: boolean;

    if (updateMemory) {
        if (Memory.creeps[name].working && creep.store.getUsedCapacity() === 0) {
            Memory.creeps[name].working = false;
        } else if (!Memory.creeps[name].working && creep.store.getFreeCapacity() === 0) {
            Memory.creeps[name].working = true;
        }

        working = Memory.creeps[name].working;
    } else {
        working = creep.store.getFreeCapacity() === 0;
    }

    if (working) {
        const c = creep.room.controller;
        if (c === undefined) {
            console.log("creep %s: creep.room.controller is undefined", name);
            return;
        }
        if (creep.upgradeController(c) === ERR_NOT_IN_RANGE) {
            creep.moveTo(c);
        }
    } else {
        creep.harvestSourse();
    }
}
