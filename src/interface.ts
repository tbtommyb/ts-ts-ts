import { fromEvent } from "rxjs";

// TODO: replace with React
const bpmInput = document.getElementById("bpm");
const cells = document.querySelectorAll(".cell");
const grid = document.getElementById("grid");

export const resetCurrent = () => {
  for (let i = 0; i < cells.length; i++) {
    cells[i].classList.remove("current");
  }
};

export const setCurrent = (n: number) => {
  resetCurrent();
  document.getElementById(`cell-kick-${n}`).classList.add("current");
};

export const setSelection = (id: string) => {
  document.getElementById(id).classList.toggle("selected");
};

export const bpmSource$ = fromEvent(bpmInput, "input");
export const gridClicks$ = fromEvent(grid, "click");
