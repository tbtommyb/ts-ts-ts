import React, { FC } from "react";
import { useSelector } from "react-redux";
import Instruments from "../instruments";
import Cell from "./Cell";
import { CellIdent } from "../store/types";
import { RootState } from "../store/reducers";

const numCells = 16;

interface GridProps {
  instruments: Array<Instruments>
  onClick: (ident: CellIdent) => any
}

const Grid: FC<GridProps> = props => {
  const activeCells = useSelector((state: RootState) => state.activeCells);
  const step = useSelector((state: RootState) => state.step);

  const { instruments } = props;
  const cellArray = [...Array(numCells).keys()];

  return (
    <div>{
      instruments.map(instrument => (
        <div id={`row-${instrument}`} className="row align-centre" key={`${instrument}`}>
          <p className="label instrument-label">{instrument}</p>
          <div className="cells-row"> {
            cellArray.map(position => {
              let ident = `cell-${instrument}-${position}`;
              return <Cell key={ident} ident={ident} selected={activeCells.has(ident)} current={position === step} handleClick={props.onClick} />
            })
          }</div>
        </div>
      ))
    }</div >
  );
}

export default Grid;
