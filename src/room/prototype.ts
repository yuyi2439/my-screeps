Room.prototype.findExitToGuard = function (this: Room): RoomPosition {
    // TODO 现在的实现方法太丑了，以后要改

    // const exitRanges = {
    //     [FIND_EXIT_TOP]: { top: 0, left: 0, bottom: 3, right: 49 },
    //     [FIND_EXIT_RIGHT]: { top: 0, left: 46, bottom: 49, right: 49 },
    //     [FIND_EXIT_BOTTOM]: { top: 46, left: 0, bottom: 49, right: 49 },
    //     [FIND_EXIT_LEFT]: { top: 0, left: 0, bottom: 49, right: 3 }
    // };

    const exits: { [key: number]: ExitConstant } = {};

    exits[this.lookForAtArea(LOOK_CREEPS, 0, 0, 3, 49, true).length / this.find(FIND_EXIT_TOP).length] = FIND_EXIT_TOP;
    exits[this.lookForAtArea(LOOK_CREEPS, 0, 46, 49, 49, true).length / this.find(FIND_EXIT_RIGHT).length] =
        FIND_EXIT_RIGHT;
    exits[this.lookForAtArea(LOOK_CREEPS, 46, 0, 49, 49, true).length / this.find(FIND_EXIT_BOTTOM).length] =
        FIND_EXIT_BOTTOM;
    exits[this.lookForAtArea(LOOK_CREEPS, 0, 0, 49, 3, true).length / this.find(FIND_EXIT_LEFT).length] =
        FIND_EXIT_LEFT;

    const min = Math.min(...Object.keys(exits).map(key => parseInt(key, 10)));
    const exit = exits[min];

    const poses = this.find(exit);
    if (poses.length >= 2) {
        return poses[Math.round(poses.length / 2) - 1];
    } else {
        return poses[0];
    }
};
