export default class WorldCell {
    
    constructor() {
        this.obstructed = false;
        this.bug = null;
        this.food = 0;
        this.marker = null;
        this.base = null;
    }

    isObstructed() {
        return this.obstructed;
    }

    isOccupied() {
        return this.obstructed && this.bug === null;
    }

    setBug(bug) {
        if (this.isOccupied())
            return false;
        
        this.bug = bug;
        return true;
    }

    getBug() {
        return this.bug;
    }

    removeBug() {
        if (this.isObstructed()) {
            return false;
        }
        this.bug = null;
        return true;
    }

    setFood(food) {
        this.food = food;
    }

    isFriendlyBase(color) {
        return this.base === color;
    }

    isEnemyBase(color) {
        return this.base === color;
    }

    setMarker(color, position) {
        // TODO("class Marker not implemented yet")
    }

    clearMarker() {
        this.marker = null;
    }

    isFriendlyMarker(color) {
        // TODO("class Marker not implemented yet")
    }

    isEnemyMarker(color) {
        // TODO("class Marker not implemented yet")
    }

    cellMatches(bugCondition) {
        // TODO("class BugCondition not implemented yet")
    }

    toString() {
        // TODO("not implemented yet")
    }
}