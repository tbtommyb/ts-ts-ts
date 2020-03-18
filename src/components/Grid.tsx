import React from "react";
import Instruments from "../instruments";
import Cell from "./Cell";

const numCells = 16;

interface GridProps {
  instruments: Instruments
}


const Grid: React.SFC<GridProps> = ({ instruments }) => {
  const cellArray = [...Array(numCells).keys()];
  const [activeCells, setActiveCells] = React.useState(new Set());

  const handleClick = (ident: string) => {
    let newCells = new Set(activeCells);
    if (newCells.has(ident)) {
      newCells.delete(ident);
    } else {
      newCells.add(ident);
    }
    setActiveCells(newCells);
  }

  return (
    <div>{
      Object.keys(instruments).map(instrument => (
        <div id={`row-${instrument}`} className="row align-centre" key={`${instrument}`}>
          <p className="label instrument-label">{instrument}</p>
          <div className="cells-row"> {
            cellArray.map(i => {
              let ident = `cell-${instrument}-${i}`;
              return <Cell ident={ident} key={ident} selected={activeCells.has(ident)} handleClick={handleClick} />
            })
          }</div>
        </div>
      ))
    }</div >
  );
}

export default Grid;
