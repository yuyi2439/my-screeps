/**
 * attach - attacks the target
 *
 * @param {object} creep - The attacker
 * @param {object} target - The target
 **/
function attack(creep: Creep, target: Creep | AnyOwnedStructure): void {
    // 防止离开房间
    if (target.pos.x > 0 && target.pos.x < 49 && target.pos.y > 0 && target.pos.y < 49) {
        creep.moveTo(target.pos);
    }
    creep.rangedAttack(target);
    creep.attack(target);
}

export function attacker(creep: Creep): void {
    // 如果自己没有可用的ATTACK部件，就自杀
    // 可以改成去spawn修复
    if (creep.getActiveBodyparts(ATTACK) === 0) {
        creep.suicide();
        return;
    }

    const inRange = creep.pos.findInRange(FIND_HOSTILE_CREEPS, 3);
    if (inRange.length > 0) {
        attack(creep, inRange[0]);
    }

    const hostileCreepsWithAttack = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS, {
        filter(c) {
            return c.getActiveBodyparts(ATTACK) !== 0;
        }
    });
    if (hostileCreepsWithAttack) {
        attack(creep, hostileCreepsWithAttack);
    }

    const hostileCreep = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
    if (hostileCreep) {
        attack(creep, hostileCreep);
    }

    const hostileStructure = creep.pos.findClosestByRange(FIND_HOSTILE_STRUCTURES);
    if (hostileStructure) {
        attack(creep, hostileStructure);
    }
}
