import { BugConditions } from "./BugConditions.js";

export class WorldCell {
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
                if (!isNaN(symb)) {
                    this.#food = parseInt(symb);
                } else {
                    throw "Unknown symbol '" + symb + "'";
                }
                break;
        }
    }

    /**
     * Check if field is obstructed
     * @returns {boolean}
     */
    isObstructed() {
        return this.#obstructed;
    }

    /**
     * Check if field is occupied
     * @returns {boolean}
     */
    isOccupied() {
        return this.#bug !== undefined;
    }

    /**
     * Set bug to this cell, if succeeded, return true, otherwise false
     * @param {Bug} bug
     * @returns {boolean}
     */
    setBug(bug) {
        if (this.isOccupied() || this.isObstructed()) {
            return false;
        }
        this.#bug = bug;
        return true;
    }

    /**
     * Get current bug in the cell
     * @returns {undefined | Bug}
     */
    getBug() {
        return this.#bug;
    }

    /**
     * Remove current bug from the cell, if succeeded, return true, otherwise false
     * @returns {boolean}
     */
    removeBug() {
        if (this.#bug === undefined) {
            return false;
        }
        this.#bug = undefined;
        return true;
    }

    /**
     * Set the amount of food in the cell
     * @param {int} food
     */
    setFood(food) {
        if (this.isObstructed()) {
            return;
        }
        this.#food = food;
    }

    /**
     * Get current amount of food in this cell
     * @returns {number}
     */
    getFood() {
        return this.#food;
    }

    /**
     * Check if the base is friendly according to color
     * @param {int} color
     * @returns {boolean}
     */
    isFriendlyBase(color) {
        return (this.#base !== undefined) && (this.#base === color);
    }

    /**
     * Check if the base is enemy's one according to color
     * @param {int} color
     * @returns {boolean}
     */
    isEnemyBase(color) {
        return (this.#base !== undefined) && (this.#base !== color);
    }

    /**
     * Set marker to the cell
     * @param {int} color
     * @param {int} marker
     */
    setMarker(color, marker) {
        this.#marker = marker;
        this.#marker_color = color;
    }

    /**
     * Clear marker
     */
    clearMarker() {
        this.#marker = undefined;
        this.#marker_color = undefined;
    }

    /**
     * Returns if the current marker is friendly
     * @param {int} color
     * @param {int} marker
     * @returns {boolean}
     */
    isFriendlyMarker(color, marker) {
        return this.#marker !== undefined && this.#marker_color === color && this.#marker === marker
    }

    /**
     * Return if the current marker is enemy's one
     * @param {int} color
     * @returns {boolean}
     */
    isEnemyMarker(color) {
        return this.#marker !== undefined && this.#marker_color !== color
    }

    /**
     * Pattern matching by condition
     * @param {BugConditions} condition
     * @param {int} color
     * @returns {*|boolean}
     */
    cellMatches(condition, color) {
        switch (condition) {
            case BugConditions.FRIEND:
                return this.#bug !== undefined && this.#bug.getColor() === color
            case BugConditions.FOE:
                return this.#bug !== undefined && this.#bug.getColor() !== color
            case BugConditions.FRIEND_WITH_FOOD:
                return this.cellMatches(BugConditions.FRIEND, color) && this.#bug.hasFood()
            case BugConditions.FOE_WITH_FOOD:
                return this.cellMatches(BugConditions.FOE, color) && this.#bug.hasFood()
            case BugConditions.FOOD:
                return this.#food !== 0
            case BugConditions.ROCK:
                return this.isObstructed()
            case BugConditions.MARKER:
                return this.#marker !== undefined && this.#marker_color === color
            case BugConditions.FOE_MARKER:
                return this.isEnemyMarker(color)
            case BugConditions.HOME:
                return this.isFriendlyBase(color)
            case BugConditions.FOE_HOME:
                return this.isEnemyBase(color)
        }
    }
}