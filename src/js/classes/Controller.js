class Simulator {
    #world;
    #bugCodeRed;
    #bugCodeBlack;
    #iterations_limit;

    constructor(world, bugCodeRed, bugCodeBlack, limit) {
        this.#world = world;
        this.#bugCodeRed = bugCodeRed;
        this.#bugCodeBlack = bugCodeBlack;
        this.#iterations_limit = limit;
    }

    runTournament(tourNumber) {
        //TODO
    }

    drawField() {
        Interface.drawField(this.#world);
    }
}

async function createSimulator() {
    let bugsInstr = [{}, {}];
    let worldText = await getText("world-file", "world map");
    bugsInstr[0] = await getText("bug-file-1", "first bug assembler");
    bugsInstr[1] = await getText("bug-file-2", "second bug assembler");

    let iter_limit = document.getElementById("iterations-number")
    if (isNaN(iter_limit.value)) {
        throw "Specify number of iterations";
    }

    let limit = document.getElementById("iterations-number").value;
    let bugBrains = [{}, {}];
    let world = new World(worldText);

    bugBrains[0] = Assembler.assemble(bugsInstr[0]);
    bugBrains[1] = Assembler.assemble(bugsInstr[1]);

    return new Simulator(world, bugBrains[0], bugBrains[1], iter_limit.valueAsNumber);
}

function getText(id, fileName) {
    if (document.getElementById(id).files.length !== 1) {
        alert("You must upload " + fileName + " file!");
    }
    let file = document.getElementById(id).files[0];
    return new Promise((resolve, reject) => {
        let fr = new FileReader();
        fr.onload = () => { resolve(fr.result) };
        fr.onerror = reject;
        fr.readAsText(file);
    })
}
