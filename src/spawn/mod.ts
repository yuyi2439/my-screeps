import "./utils";

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
            // const body = getBodyByRole(room, role);
            const body = [WORK, CARRY, MOVE];
            if (!spawn.spawning && room.energyAvailable >= getEnergyByBody(body)) {
                const newName = role + Game.time.toString();
                spawn.spawnCreep(body, newName, {
                    memory: { role, room: room.name, working: false }
                });
                queue.shift();
            }
        }
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

function getEnergyByBody(body: CreepBody) {
    let energy = 0;
    for (const i of body) {
        switch (i) {
            case WORK:
                energy += 100;
                break;
            case CARRY:
                energy += 50;
                break;
            case MOVE:
                energy += 50;
                break;
        }
    }
    return energy;
}
