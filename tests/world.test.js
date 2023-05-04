import {Pos, World} from "../src/js/classes/World.js";
import { BugConditions } from "../src/js/classes/BugConditions.js";

const test_world = new World("10\n10\n# # # # # # # # # #\n# 9 9 . . . . 3 3 #\n# 9 # . - - - - - #\n# . # - - - - - - #\n# . . 5 - - - - - #\n# + + + . + 5 . . #\n# + + + . + + # . #\n# + + + . + . # 9 #\n# 3 3 . . . . 9 9 #\n# # # # # # # # # #\n");

test("test check world's sizes after creation", () => {
    expect(test_world.x_size).toBe(10)
    expect(test_world.y_size).toBe(10)
})

test("test check created rocks", () => {
    for (let i = 0; i < 10; i++) {
        expect(test_world.cellAt(new Pos(0, i)).cellMatches(BugConditions.ROCK, 0)).toBe(true)
    }
})

test("test check created food", () => {
    expect(test_world.cellAt(new Pos(1, 1)).cellMatches(BugConditions.FOOD, 0)).toBe(true)
    expect(test_world.cellAt(new Pos(2, 1)).cellMatches(BugConditions.FOOD, 0)).toBe(true)
    expect(test_world.cellAt(new Pos(1, 2)).cellMatches(BugConditions.FOOD, 0)).toBe(true)
    expect(test_world.cellAt(new Pos(1, 8)).cellMatches(BugConditions.FOOD, 0)).toBe(true)
    expect(test_world.cellAt(new Pos(8, 1)).cellMatches(BugConditions.FOOD, 0)).toBe(true)
    expect(test_world.cellAt(new Pos(8, 7)).cellMatches(BugConditions.FOOD, 0)).toBe(true)
    expect(test_world.cellAt(new Pos(8, 8)).cellMatches(BugConditions.FOOD, 0)).toBe(true)
})
