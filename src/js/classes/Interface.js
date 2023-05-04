class Interface {
    /**
     * Static function to draw the field of the game
     * @param {World} world
     */
    static drawField(world) {
        let img;
        let row;
        this.height = world.y_size;
        this.width = world.x_size;
        const mainDiv = document.getElementById('mainField');
        mainDiv.style.position = "absolute";
        mainDiv.style.top = "50%";
        mainDiv.style.left = "50%";
        mainDiv.style.msTransforms = "translate(-50%, -50%)";
        mainDiv.style.transform = "translate(-50%, -50%)";

        for (let k = 0; k < 2 * this.height; k++) {
            if (k % 2 === 0) {
                row = document.createElement('div');
                row.style.height = "40px";
                for (let i = 0; i < this.width / 2; i++) {
                    img = document.createElement("img");
                    img.src = charToImg(world.cellAt(new Pos( i * 2, k / 2)));
                    img.style.width = "45px";
                    img.style.height = "40px";
                    img.style.marginRight = "20px";
                    row.appendChild(img);
                }
                mainDiv.appendChild(row);
            } else {
                row = document.createElement('div');
                row.style.height = "20px";
                row.style.marginTop = "-20px";
                row.style.marginLeft = "25px";
                for (let i = 0; i < this.width / 2; i++) {
                    img = document.createElement("img");
                    img.src = charToImg(world.cellAt(new Pos((i * 2 + 1), (k - 1) / 2)));
                    img.style.width = "45px";
                    img.style.height = "40px";
                    img.style.marginLeft = "20px";
                    row.appendChild(img);
                }
                mainDiv.appendChild(row);
            }
        }
    }
}

/**
 * Conversion from cell of text field to image
 * @param {WorldCell} cell
 * @returns {string} path to the image
 */
function charToImg(cell) {
    if (cell === undefined) throw "Illegal cell value of text field";

    if (cell.isObstructed()) return 'img/rock.png';

    if (cell.isFriendlyBase(0)) return 'img/blackSwarm.png';

    if (cell.isFriendlyBase(1)) return 'img/redSwarm.png';

    return foods[cell.getFood()];
}

const foods = new Map([
    [0, 'img/freeCell.png'],
    [1, 'img/oneFood.png'],
    [2, 'img/twoFood.png'],
    [3, 'img/threeFood.png'],
    [4, 'img/manyFood.png'],
    [5, 'img/manyFood.png'],
    [6, 'img/manyFood.png'],
    [7, 'img/manyFood.png'],
    [8, 'img/manyFood.png'],
    [9, 'img/manyFood.png']
]);
