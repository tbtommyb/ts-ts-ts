import { fromEvent, Observable } from "rxjs";
import { mapTo, tap, scan, startWith } from "rxjs/operators";
import Instrument from "./Instrument";
import State from "./State";

// TODO: replace with React
const getElem = (id: string): HTMLElement => {
  const elem = document.getElementById(id);
  if (elem == null) {
    throw new Error(`Could not find element ${id}`);
  }
  return elem;
}

export const resetCurrent = () => {
  const cells = document.querySelectorAll(".cell");
  for (let i = 0; i < cells.length; i++) {
    cells[i].classList.remove("current");
  }
};

export const setCurrent = (n: number) => {
  resetCurrent();
  document
    .querySelectorAll(`[id^='cell-'][id$='-${n}']`)
    .forEach(cell => cell.classList.add("current"));
};

export const setSelection = (id: string) => {
  const cell = document.getElementById(id);
  if (cell == null) {
    console.log(`setSelection: cell ID ${id} is invalid`)
    return
  }
  cell.classList.toggle("selected");
};

export const bpmSource$: Observable<Event> = fromEvent(getElem("bpm"), "input");
export const gridClicks$: Observable<Event> = fromEvent(getElem("grid"), "click");
export const pauseClicks$: Observable<State> = fromEvent(getElem("pause"), "click")
  .pipe(
    scan((acc: State, curr) => Object.assign({}, acc, { paused: !acc.paused }), { paused: false })
  );

export const initialiseGrid = () => {
  for (let instrument in Instrument) {
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
    getElem("grid").appendChild(rowElement);
  };
};
