export function harvester(creep: Creep): void {
    if (creep.store.getFreeCapacity() > 0) {
        creep.harvestSourse();
    } else if (creep.transfer(Game.spawns.Spawn1, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
        creep.moveTo(Game.spawns.Spawn1);
    }
}
