class Bug {
    #id
    #color
    #brain
    position
    direction
    hasFood
    state

    constructor (id, color, brain, pos) {
        this.#id = id
        this.#color = color
        this.#brain = brain
        this.position = pos
        this.direction = 0
        this.hasFood = false
        this.state = 0
    }

    getColor () {
        return this.#color
    }

    getInstruction () {
        return this.#brain[this.state]
    }
}
