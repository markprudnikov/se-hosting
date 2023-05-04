import { WorldCell } from "./WorldCell.js";

export class Pos {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

export class World {
    /**
     * @property x_size
     * @type {int}
     */
    x_size;

    /**
     * @property y_size
     * @type {int}
     */
    y_size;

    /**
     * @property map
     * @type {Map<int, WorldCell>}
     */
    #map;

    /**
     * Constructor, creates an instance of a class World
     * @param {String} textField
     */
    constructor(textField) {
        this.#map = new Map();
        let parsed = textField.split('\n');
        parsed = parsed.filter((v, i, arr) => v !== '');
        if (parsed.length < 2) throw 'Expected at least two lines in map file';
        this.x_size = parseInt(parsed[0]);
        this.y_size = parseInt(parsed[1]);
        if (isNaN(this.x_size) || isNaN(this.y_size)) {
            throw 'Invalid map size';
        }
        if (parsed.length !== this.y_size + 2) {
            throw 'Map height doesn\'t match';
        }
        for (let i = 2; i < parsed.length; i++) {
            let row = parsed[i];
            row = row.split(' ');
            if (row.length !== this.x_size) {
                throw 'Map width doesn\'t match';
            }
            for (let j = 0; j < row.length; j++) {
                if ((i === 2 || i === parsed.length - 1 || j === 0 || j === row.length) && row[j] !== '#') {
                    throw 'Map should be surrounded with obstructed cells';
                }
                const t = new WorldCell(row[j]);
                this.#map.set((i - 2) * this.x_size + j, t);
            }
        }
    }

    /**
     * Asserts that position is in the field
     * @param {Pos} pos
     */
    assertPos(pos) {
        if (!(pos.x >= 0 && pos.x < this.x_size && pos.y >= 0 && pos.y < this.y_size)) {
            throw RangeError('pos out of range');
        }
    }

    /**
     * Return cell by position
     * @param {Pos} pos
     * @returns {WorldCell}
     */
    cellAt(pos) {
        this.assertPos(pos);
        return this.#map.get(pos.y * this.x_size + pos.x);
    }

    adjacent(pos, dir) {
        // TODO
    }

    /**
     * Check if cell by position is obstructed
     * @param {Pos} pos
     * @returns {boolean}
     */
    isObstructedAt(pos) {
        return this.cellAt(pos).isObstructed();
    }

    /**
     * Check if cell by position is occupied
     * @param {Pos} pos
     * @returns {boolean}
     */
    isOccupiedAt(pos) {
        return this.cellAt(pos).isOccupied();
    }

    /**
     * Set bug at specific position and return true if succeeded, otherwise false
     * @param {Pos} pos
     * @param {Bug} bug
     * @returns {boolean}
     */
    setBugAt(pos, bug) {
        return this.cellAt(pos).setBug(bug);
    }

    /**
     * Return bug by specific position
     * @param {Pos} pos
     * @returns {Bug|undefined}
     */
    getBugAt(pos) {
        return this.cellAt(pos).getBug();
    }

    /**
     * Remove bug at specific position and return true if succeeded, otherwise false
     * @param {Pos} pos
     * @returns {boolean}
     */
    removeBugAt(pos) {
        return this.cellAt(pos).removeBug();
    }

    /**
     * Set food by position
     * @param {Pos} pos
     * @param {int} food
     */
    setFoodAt(pos, food) {
        this.cellAt(pos).setFood(food);
    }

    /**
     * Get food by position
     * @param {Pos} pos
     * @returns {number}
     */
    getFoodAt(pos) {
        return this.cellAt(pos).getFood();
    }

    /**
     * Return if base is friendly by position
     * @param {Pos} pos
     * @param {int} color
     * @returns {boolean}
     */
    isFriendlyBaseAt(pos, color) {
        return this.cellAt(pos).isFriendlyBase(color);
    }

    /**
     * Return if base is enemy's one by position
     * @param {Pos} pos
     * @param {int} color
     * @returns {boolean}
     */
    isEnemyBaseAt(pos, color) {
        return this.cellAt(pos).isEnemyBase(color);
    }

    /**
     * Set marker for position
     * @param {Pos} pos
     * @param {int} color
     * @param {int} marker
     */
    setMarkerAt(pos, color, marker) {
        this.cellAt(pos).setMarker(color, marker);
    }

    /**
     * Clear marker at position
     * @param {Pos} pos
     */
    clearMarkerAt(pos) {
        this.cellAt(pos).clearMarker();
    }

    /**
     * Check if marker is friendly at position
     * @param {Pos} pos
     * @param {int} color
     * @param {int} marker
     * @returns {boolean}
     */
    isFriendlyMarkerAt(pos, color, marker) {
        return this.cellAt(pos).isFriendlyMarker(color, marker);
    }

    /**
     * Check if marker is enemy's one at position
     * @param {Pos} pos
     * @param {int} color
     * @returns {boolean}
     */
    isEnemyMarkerAt(pos, color) {
        return this.cellAt(pos).isEnemyMarker(color);
    }

    /**
     * Pattern matching by condition for a specific position
     * @param {Pos} pos
     * @param {BugConditions} condition
     * @param {int} color
     * @returns {boolean}
     */
    cellMatchesAt(pos, condition, color) {
        return this.cellAt(pos).cellMatches(condition, color);
    }
}
