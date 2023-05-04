# BugWorld, Sprint 3, team 49

Hosted at `https://markprudnikov.github.io/se-hosting/`

## Fixes
* Fixed `isEnemyMarkerAt` function signature in `World.js`
* Refactored `charToImg` function in `Interface.js`:
  * Used `Map` instead of object because of its better efficiency
  * Moved the map out of the function scope in order to avoid unnecessary creation in each function call
* Rewrote tests for `World` class

## Progress
* Features:
  * Implemented `Assembler` and all related classes: translation of bug assembly code to list of instructions
* Test:
  * Added `jest` package support for testing
  * Added tests for `WorldCell` class
* Visual:
  * Improved code style and formatted all files using standard style
* Documentation:
  * Improved existing documentation by using `JSDoc`

---

### Run tests
```
npm i # only for the first time
npm run test
``` 
