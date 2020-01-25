"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rxjs_1 = require("rxjs");
const Instrument_1 = require("./Instrument");
// TODO: replace with React
const bpmInput = document.getElementById("bpm");
const grid = document.getElementById("grid");
exports.resetCurrent = () => {
    const cells = document.querySelectorAll(".cell");
    for (let i = 0; i < cells.length; i++) {
        cells[i].classList.remove("current");
    }
};
exports.setCurrent = (n) => {
    exports.resetCurrent();
    document
        .querySelectorAll(`[id^='cell-'][id$='-${n}']`)
        .forEach(cell => cell.classList.add("current"));
};
exports.setSelection = (id) => {
    document.getElementById(id).classList.toggle("selected");
};
exports.bpmSource$ = rxjs_1.fromEvent(bpmInput, "input");
exports.gridClicks$ = rxjs_1.fromEvent(grid, "click");
exports.initialiseGrid = () => {
    for (let instrument in Instrument_1.default) {
        let rowElement = document.createElement("div");
        rowElement.classList.add("row", "align-center");
        rowElement.id = `row-${instrument}`;
        let label = document.createElement("p");
        label.classList.add("label", "instrument-label");
        label.innerHTML = instrument;
        rowElement.appendChild(label);
        let wrapper = document.createElement("div");
        wrapper.classList.add("cells");
        for (let i = 0; i < 16; i++) {
            let cell = document.createElement("div");
            cell.classList.add("cell");
            cell.id = `cell-${instrument}-${i}`;
            wrapper.appendChild(cell);
        }
        rowElement.appendChild(wrapper);
        grid.appendChild(rowElement);
    }
    ;
};
