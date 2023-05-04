class Bug {
    #id
    #color

    position

    direction

    hasFood

    #brain

    state

    constructor(id, color, brain, pos) {
        this.#id = id;
        this.#color = color;
        this.#brain = brain;
        this.position = pos;
        this.direction = 0;
        this.hasFood = false;
        this.state = 0;
    }

    getColor() {
        return this.#color;
    }

    getInstruction() {
        return this.#brain[this.state];
    }

}
