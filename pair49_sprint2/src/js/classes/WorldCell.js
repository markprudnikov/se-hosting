class WorldCell {

    #obstructed = false;
    #food = 0;
    #bug = undefined;
    #base = undefined;
    #marker = undefined;
    #marker_color = undefined;

    constructor(symb) {
        switch (symb) {
            case '#':
                this.#obstructed = true;
                break;
            case '.':
                break;
            case '-':
                this.#base = 1;
                break;
            case '+':
                this.#base = 0;
                break;
            default:
                if (!isNaN(symb)){
                    this.#food = parseInt(symb);
                } else {
                    throw "Unknown symbol '" + symb + "'";
                }
                break;
        }
    }

    // void -> bool
    isObstructed() {
        return this.#obstructed;
    }

    // void -> bool
    isOccupied() {
        return this.#bug !== undefined;
    }

    // bug -> bool
    setBug(bug) {
        if (this.isOccupied() || this.isObstructed()) {
            return false;
        }
        this.#bug = bug;
        return true;
    }

    // int -> bug?
    getBug() {
        return this.#bug;
    }

    // void -> bool
    removeBug() {
        if (this.#bug === undefined) {
            return false;
        }
        this.#bug = undefined;
        return true;
    }

    // int -> void
    setFood(food) {
        if (this.isObstructed()){
            return;
        }
        this.#food = food;
    }

    // void -> int
    getFood() {
        return this.#food;
    }

    // int -> bool
    isFriendlyBase(color){
        return (this.#base !== undefined) && (this.#base === color);
    }

    // int -> bool
    isEnemyBase(color) {
        return (this.#base !== undefined) && (this.#base !== color);
    }

    // int, int -> void
    setMarker(color, marker) {
        this.#marker = marker;
        this.#marker_color = color;
    }

    // void -> void
    clearMarker() {
        this.#marker = undefined;
        this.#marker_color = undefined;
    }

    // int, int -> bool
    isFriendlyMarker(color, marker) {
        return (this.#marker !== undefined) && (this.#marker_color === color) && (this.#marker === marker);
    }

    // int -> bool
    isEnemyMarker(color) {
        return (this.#marker !== undefined) && (this.#marker_color !== color);
    }

    // BugCondition, int -> bool
    cellMatches(condition, color) {
        switch (condition) {
            case BugConditions.FRIEND:
                return (this.#bug !== undefined) && (this.#bug.getColor() === color);
            case BugConditions.FOE:
                return (this.#bug !== undefined) && (this.#bug.getColor() !== color);
            case BugConditions.FRIEND_WITH_FOOD:
                return this.cellMatches(BugConditions.FRIEND, color) && this.#bug.hasFood();
            case BugConditions.FOE_WITH_FOOD:
                return this.cellMatches(BugConditions.FOE, color) && this.#bug.hasFood();
            case BugConditions.FOOD:
                return this.#food !== 0;
            case BugConditions.ROCK:
                return this.isObstructed();
            case BugConditions.MARKER:
                return (this.#marker !== undefined) && (this.#marker_color === color);
            case BugConditions.FOE_MARKER:
                return this.isEnemyMarker(color);
            case BugConditions.HOME:
                return this.isFriendlyBase(color);
            case BugConditions.FOE_HOME:
                return this.isEnemyBase(color);
        }
    }
}