import React from "react";
import { useSelector, useDispatch } from "react-redux";
import Instruments from "../instruments";
import Cell from "./Cell";
import { toggleCell } from "../store/actions";

const numCells = 16;

interface GridProps {
  instruments: Instruments
}


const Grid: React.SFC<GridProps> = props => {
  const activeCells = useSelector(state => state.cells.activeCells;)
  const dispatch = useDispatch();
  const { instruments } = props;

  const cellArray = [...Array(numCells).keys()];

  return (
    <div>{
      Object.keys(instruments).map(instrument => (
        <div id={`row-${instrument}`} className="row align-centre" key={`${instrument}`}>
          <p className="label instrument-label">{instrument}</p>
          <div className="cells-row"> {
            cellArray.map(i => {
              let ident = `cell-${instrument}-${i}`;
              return <Cell ident={ident} key={ident} selected={activeCells.has(ident)} handleClick={ident => dispatch(toggleCell(ident)} />
            })
          }</div>
        </div>
      ))
    }</div >
  );
}

export default Grid;
