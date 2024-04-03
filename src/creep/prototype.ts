Creep.prototype.harvestSourse = function (this: Creep) {
    if (this.getActiveBodyparts(WORK) === 0) {
        return;
    }

    const source = this.pos.findClosestByPath(FIND_SOURCES);
    if (source == null) {
        console.log("creep %s can't find source", this.name);
        return;
    }
    if (this.harvest(source) === ERR_NOT_IN_RANGE) {
        this.moveTo(source);
    }
};
