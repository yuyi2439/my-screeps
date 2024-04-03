import "./prototype";
import { attacker } from "./attack";
import { harvester } from "./harvester";
import { upgrader } from "./upgrader";

export function creepMain(): void {
    for (const name in Memory.creeps) {
        const creep = Game.creeps[name];

        if (!creep) {
            console.log("这只爬爬死了:", name);
            Game.spawns.Spawn1.addQueue(Memory.creeps[name].role);
            delete Memory.creeps[name];
            return;
        }

        switch (creep.memory.role) {
            case "harvester":
                harvester(creep);
                break;
            case "upgrader":
                upgrader(creep);
                break;
            case "attacker":
                attacker(creep);
                break;
        }
    }
}
