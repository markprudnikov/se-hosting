class Pos {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

class World {

    x_size

    //int
    y_size

    //WorldCell[][]
    #map

    // constructor (string)
    constructor(textField) {
        this.#map = new Map();
        let parsed = textField.split('\n');
        parsed = parsed.filter((v, i, arr) => v !== "");
        if (parsed.length < 2) throw "Expected at least two lines in map file";
        this.x_size= parseInt(parsed[0]);
        this.y_size = parseInt(parsed[1]);
        if (isNaN(this.x_size) || isNaN(this.y_size)) {
            throw "Invalid map size";
        }
        if (parsed.length !== (this.y_size + 2)) {
            throw "Map height doesn't match";
        }
        for (let i = 2; i < parsed.length; i++) {
            let row = parsed[i];
            row = row.split(' ');
            if (row.length !== this.x_size) {
                throw "Map width doesn't match";
            }
            for (let j = 0; j < row.length; j++) {
                if ((i === 2 || i === (parsed.length - 1) || j === 0 || j === row.length) && row[j] !== '#') {
                    throw "Map should be surrounded with obstructed sells";
                }
                const t = new WorldCell(row[j]);
                this.#map. set((i - 2) * this.x_size + j, t);
            }
        }
    }

    assertPos(pos) {
        if (!(pos.x >= 0 && pos.x < this.x_size && pos.y >= 0 && pos.y < this.y_size)) {
            throw RangeError("pos out of range");
        }
    }

    // Position -> WorldCell
    cellAt(pos) {
        this.assertPos(pos);
        return this.#map.get(pos.y * this.x_size + pos.x);
    }

    adjacent(pos, dir) {
        //TODO
    }

    // Position -> bool
    isObstructedAt(pos) {
        return this.cellAt(pos).isObstructed();
    }

    // Position -> bool
    isOccupiedAt(pos) {
        return this.cellAt(pos).isOccupied();
    }

    // Position, Bug-> bool
    setBugAt(pos, bug) {
        return this.cellAt(pos).setBug(bug);
    }

    // Position -> Bug
    getBugAt(pos) {
        return this.cellAt(pos).getBug();
    }

    // pos -> bool
    removeBugAt(pos) {
        return this.cellAt(pos).removeBug();
    }

    // Position, int -> void
    setFoodAt(pos, food){
        this.cellAt(pos).setFood(food);
    }

    //Position -> void
    getFoodAt(pos) {
        return this.cellAt(pos).getFood();
    }

    // Position, int -> bool
    isFriendlyBaseAt(pos, color) {
        return this.cellAt(pos).isFriendlyBase(color);
    }

    // Position, int -> bool
    isEnemyBaseAt(pos, color) {
        return this.cellAt(pos).isEnemyBase(color);
    }

    // Position, int, int -> void
    setMarkerAt(pos, color, marker) {
        this.cellAt(pos).setMarker(color, marker);
    }

    // Position -> void
    clearMarkerAt(pos) {
        this.cellAt(pos).clearMarker();
    }

    //Position, int, int -> bool
    isFriendlyMarkerAt(pos, color, marker) {
        return this.cellAt(pos).isFriendlyMarker(color, marker);
    }

    //Position, int, int -> bool
    isEnemyMarkerAt(pos, color, marker) {
        return this.cellAt(pos).isEnemyMarker(color, marker);
    }

    cellMatchesAt(pos, condition, color) {
        return this.cellAt(pos).cellMatches(condition, color);
    }
}