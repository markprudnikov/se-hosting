import { WorldCell } from "../src/js/classes/WorldCell.js";

test("test world cell represents rock creation", () => {
    const wc = new WorldCell('#')
    expect(wc.isObstructed()).toBe(true)
})

test("test world cell creation", () => {
    const wc = new WorldCell('.')
    expect(wc.isObstructed()).toBe(false)
})

test("test world cell creation", () => {
    const wc = new WorldCell('+')
    expect(wc.isObstructed()).toBe(false)
})

test("test world cell creation", () => {
    const wc = new WorldCell('-')
    expect(wc.isObstructed()).toBe(false)
})