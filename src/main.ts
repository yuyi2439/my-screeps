import "./room/mod";
import { ErrorMapper } from "utils/ErrorMapper";
import { creepMain } from "creep/mod";
import { generatePixel } from "utils/mod";
import { spawnMain } from "spawn/mod";

export const loop = ErrorMapper.wrapLoop(() => {
    // console.log(`Current game tick is ${Game.time}`);

    generatePixel();
    spawnMain();
    creepMain();
});

declare global {
    interface CreepMemory {
        role: string;
        room: string;
        working: boolean;
    }

    interface Creep {
        /**
         * 挖 Source
         */
        harvestSourse(): void;
    }

    interface SpawnMemory {
        /**
         * 该 spawn 的队列
         */
        queue: {
            role: string;
        }[];
    }

    interface StructureSpawn {
        /**
         * 添加队列
         */
        addQueue(role: string): void;
    }

    interface Room {
        findExitToGuard(this: Room): RoomPosition;
    }

    type CreepBody = BodyPartConstant[];
}
