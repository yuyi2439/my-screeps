import { upgrader } from "./upgrader";

export function harvester(creep: Creep): void {
    if (creep.store.getFreeCapacity() > 0) {
        creep.harvestSourse();
    } else {
        const room = creep.room;
        if (room.energyCapacityAvailable === room.energyAvailable) {
            // 房间能量满了后，作为upgrader工作
            upgrader(creep, false);
        }

        if (creep.transfer(Game.spawns.Spawn1, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
            creep.moveTo(Game.spawns.Spawn1);
        }
    }
}
