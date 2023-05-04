import World from "../src/js/classes/World";

const world1 = new World("10\n10\n# # # # # # # # # #\n# 9 9 . . . . 3 3 #\n# 9 # . - - - - - #\n# . # - - - - - - #\n# . . 5 - - - - - #\n# + + + . + 5 . . #\n# + + + . + + # . #\n# + + + . + . # 9 #\n# 3 3 . . . . 9 9 #\n# # # # # # # # # #\n");
for (let i = 0; i < 10; i++)
    if (world1.field.get("0, " + i).type !== CellType.rock) throw "failed test";

if (world1.field.get("1, 1").type !== CellType.food) throw "failed test";
if (world1.field.get("1, 2").type !== CellType.food) throw "failed test";
if (world1.field.get("2, 1").type !== CellType.food) throw "failed test";
if (world1.field.get("1, 7").type !== CellType.food) throw "failed test";
if (world1.field.get("1, 8").type !== CellType.food) throw "failed test";
if (world1.field.get("4, 3").type !== CellType.food) throw "failed test";
if (world1.field.get("8, 1").type !== CellType.food) throw "failed test";
if (world1.field.get("8, 2").type !== CellType.food) throw "failed test";
if (world1.field.get("4, 3").type !== CellType.food) throw "failed test";
if (world1.field.get("4, 3").type !== CellType.food) throw "failed test";
if (world1.field.get("8, 7").type !== CellType.food) throw "failed test";
if (world1.field.get("8, 8").type !== CellType.food) throw "failed test";

if (world1.field.get("2, 4").type !== CellType.swarm) throw "failed test";
if (world1.field.get("4, 4").type !== CellType.swarm) throw "failed test";