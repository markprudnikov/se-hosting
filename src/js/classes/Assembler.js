class Sense {
    constructor(dir, cond, label1, label2) {
        this.dir = dir;
        this.cond = cond;
        this.label1 = label1;
        this.label2 = label2;
    }
}

class Mark {
    constructor(mark, label) {
        this.mark = mark;
        this.label = label;
    }
}

class Unmark {
    constructor(mark, label) {
        this.mark = mark;
        this.label = label;
    }
}

class PickUp {
    constructor(label1, label2) {
        this.label1 = label1;
        this.label2 = label2;
    }
}

class Drop {}

class Turn {
    constructor(dir) {
        this.dir = dir;
    }
}

class Move {
    constructor(label1, label2) {
        this.label1 = label1;
        this.label2 = label2;
    }
}

class Flip {
    constructor(flip, label1, label2) {
        this.flip = flip;
        this.label1 = label1;
        this.label2 = label2;
    }
}

class Direction {
    constructor(dir, label1, label2) {
        this.dir = dir;
        this.label1 = label1;
        this.label2 = label2;
    }
}

const Instruction = {
    Sense,
    Mark,
    Unmark,
    PickUp,
    Drop,
    Turn,
    Move,
    Flip,
    Direction,
}

class Label {
    constructor(label) {
        this.label = label;
    }
}

class Here {}
class LeftAhead {}
class RightAhead {}
class Ahead {}

const DirectionEnum = {
    Here,
    LeftAhead,
    RightAhead,
    Ahead,
}

class Left {}
class Right {}

const LeftRight = {
    Left,
    Right,
}

class Friend {}
class Foe {}
class FriendWithFood {}
class FoeWithFood {}
class Food {}
class Rock {}
class Marker {
    constructor(mark) {
        this.mark = mark;
    }
}
class FoeMarker {}
class Home {}
class FoeHome {}

const Condition = {
    Friend,
    Foe,
    FriendWithFood,
    FoeWithFood,
    Food,
    Rock,
    Marker,
    FoeMarker,
    Home,
    FoeHome,
}

class BugParser {
    constructor(program) {
        this.tokens = this.tokenize(program);
        this.pos = 0;
    }

    tokenize(input) {
        const lines = input.split("\n");
        const linesWithoutComments = lines.map(line => line.split(";")[0]);
        const linesWithTokens = linesWithoutComments.map(line => line.split(/\s+/)).flat();
        return linesWithTokens.filter(line => line.length > 0);
    }

    match(expected) {
        return this.tokens[this.pos] === expected;
    }

    consume() {
        this.pos++;
    }

    parseProgram() {
        const program = [];
        while (this.pos < this.tokens.length) {
            program.push(this.parseInstruction());
        }
        return program;
    }

    parseInstruction() {
        if (this.match("sense")) {
            return this.parseSense();
        } else if (this.match("mark")) {
            return this.parseMark();
        } else if (this.match("unmark")) {
            return this.parseUnmark();
        } else if (this.match("pickUp")) {
            return this.parsePickUp();
        } else if (this.match("drop")) {
            return this.parseDrop();
        } else if (this.match("turn")) {
            return this.parseTurn();
        } else if (this.match("move")) {
            return this.parseMove();
        } else if (this.match("flip")) {
            return this.parseFlip();
        } else if (this.match("direction")) {
            return this.parseDirection();
        } else {
            return this.parseLabel();
        }
    }

    parseSense() {
        this.consume();
        const dir = this.parseDir();
        const label1 = this.parseLabel();
        const label2 = this.parseLabel();
        const cond = this.parseCond();
        return new Instruction.Sense(dir, cond, label1, label2);
    }

    parseMark() {
        this.consume();
        const mark = this.parseInteger();
        const label = this.parseLabel();
        return new Instruction.Mark(mark, label);
    }

    parseUnmark() {
        this.consume();
        const mark = this.parseInteger();
        const label = this.parseLabel();
        return new Instruction.Unmark(mark, label);
    }

    parsePickUp() {
        this.consume();
        const label1 = this.parseLabel();
        const label2 = this.parseLabel();
        return new Instruction.PickUp(label1, label2);
    }

    parseDrop() {
        this.consume();
        return new Instruction.Drop();
    }

    parseTurn() {
        this.consume();
        const dir = this.parseLeftRight();
        return new Instruction.Turn(dir);
    }

    parseMove() {
        this.consume();
        const label1 = this.parseLabel();
        const label2 = this.parseLabel();
        return new Instruction.Move(label1, label2);
    }

    parseFlip() {
        this.consume();
        const flip = this.parseInteger();
        const label1 = this.parseLabel();
        const label2 = this.parseLabel();
        return new Instruction.Flip(flip, label1, label2);
    }

    parseDirection() {
        this.consume();
        const dir = this.parseDir();
        const label1 = this.parseLabel();
        const label2 = this.parseLabel();
        return new Instruction.Direction(dir, label1, label2);
    }

    parseInteger() {
        const int = this.tokens[this.pos];
        this.consume();
        return parseInt(int);
    }

    parseLabel() {
        const label = this.tokens[this.pos];
        this.consume();
        return new Label(label);
    }

    parseLeftRight() {
        if (this.match("Left")) {
            this.consume();
            return new LeftRight.Left();
        } else if (this.match("Right")) {
            this.consume();
            return new LeftRight.Right();
        } else {
            throw new Error("Expected left or right");
        }
    }

    parseDir() {
        if (this.match("Here")) {
            this.consume();
            return new DirectionEnum.Here();
        } else if (this.match("LeftAhead")) {
            this.consume();
            return new DirectionEnum.LeftAhead();
        } else if (this.match("RightAhead")) {
            this.consume();
            return new DirectionEnum.RightAhead();
        } else if (this.match("Ahead")) {
            this.consume();
            return new DirectionEnum.Ahead();
        } else {
            throw new Error("Expected direction");
        }
    }

    parseCond() {
        if (this.match("Friend")) {
            this.consume();
            return new Condition.Friend();
        } else if (this.match("Foe")) {
            this.consume();
            return new Condition.Foe();
        } else if (this.match("FriendWithFood")) {
            this.consume();
            return new Condition.FriendWithFood();
        } else if (this.match("FoeWithFood")) {
            this.consume();
            return new Condition.FoeWithFood();
        } else if (this.match("Food")) {
            this.consume();
            return new Condition.Food();
        } else if (this.match("Rock")) {
            this.consume();
            return new Condition.Rock();
        } else if (this.match("Marker")) {
            this.consume();
            return new Condition.Marker();
        } else if (this.match("FoeMarker")) {
            this.consume();
            return new Condition.FoeMarker();
        } else if (this.match("Home")) {
            this.consume();
            return new Condition.Home();
        } else if (this.match("FoeHome")) {
            this.consume();
            return new Condition.FoeHome();
        } else {
            throw new Error("Expected condition");
        }
    }
}

class Assembler {
    constructor() {
        throw new TypeError("Assembler is not constructible");
    }

    static assemble(bugAsm) {
        const parser = new BugParser(bugAsm);
        return parser.parseProgram();
    }
}
