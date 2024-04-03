import "./prototype";

export function spawnMain(): void {
    for (const name in Game.spawns) {
        const spawn = Game.spawns[name];
        const room = spawn.room;
        let queue = spawn.memory.queue;

        if (!queue) {
            queue = [];
        }

        if (queue.length > 0) {
            const role = queue[0].role;
            const body = getBodyByRole(role);
            if (!spawn.spawning && spawn.my) {
                const newName = role + Game.time.toString();
                const r = spawn.spawnCreep(body, newName, {
                    memory: { role, room: room.name, working: false }
                });
                if (r === OK) {
                    queue.shift();
                } else if (r === ERR_INVALID_ARGS) {
                    // Body 没有被恰当地描述
                } else if (r === ERR_RCL_NOT_ENOUGH) {
                    // 您的房间控制器级别不足以使用此 spawn
                }
            }
        }
    }
}

function getBodyByRole(role: string): CreepBody {
    if (role === "attacker") {
        return [ATTACK, MOVE];
    } else {
        return [WORK, CARRY, MOVE];
    }
}

// function getBodyByRole(room: Room, role: string): CreepBody {
//     var sum: number;
//     var perBody: CreepBody;
//     var energy = room.energyCapacityAvailable;
//     switch (role) {
//         case 'harvester':
//             sum = (energy - energy % 250) / 250;
//             perBody = [WORK, WORK, MOVE];
//             break;
//         case 'builder':
//             sum = (energy - energy % 300) / 300;
//             perBody = [WORK, WORK, CARRY, MOVE];
//             break;
//         case 'carrier':
//             sum = (energy - energy % 300) / 300;
//             perBody = [WORK, CARRY, CARRY, MOVE, MOVE];
//             break;
//         case 'upgrader':
//             sum = (energy - energy % 350) / 350;
//             perBody = [WORK, WORK, CARRY, MOVE, MOVE];
//             break;
//         default:
//             sum = (energy - energy % 200) / 200;
//             perBody = [WORK, CARRY, MOVE];
//             break;
//     }
//     var body: CreepBody = [];
//     for (var i = 0; i < sum; i++) {
//         body = [...body, ...perBody];
//     }
//     return body;
// }
