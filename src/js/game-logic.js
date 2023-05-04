let simulator;
let gui = new Interface();

async function startSimulation() {
    try {
        simulator = await createSimulator();
    } catch (error) {
        alert(error);
        return;
    }

    document.getElementById('mainField').innerHTML = "";
    pageSwitch('selectPage', 'mainPage');
    simulator.drawField();
}

function pageSwitch(divShow, divHide) {
    let frameOne = document.getElementById(divHide);
    let frameTwo = document.getElementById(divShow);

    frameOne.style.display = (frameOne.style.display === "none" ? "block" : "none");
    frameTwo.style.display = (frameTwo.style.display === "none" ? "block" : "none");
}
