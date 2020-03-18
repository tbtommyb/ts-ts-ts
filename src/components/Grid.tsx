import * as React from "react";
import Instruments from "../instruments";

const numCells = 16;

interface GridProps {
  instruments: Instruments
}

interface CellProps {
  instrument: Instruments
}

const Cells: React.SFC<CellProps> = ({ instrument }) => {
  const cellArray = [...Array(numCells).keys()];
  return (
    <div className="cells"> {
      cellArray.map(i => (
        <div className="cell" id={`cell-${instrument}-${i}`} key={`${instrument}-${i}`} ></div>
      ))
    } </div>
  );
};

const Grid: React.SFC<GridProps> = ({ instruments }) => (
  <div>
    {
      Object.keys(instruments).map(instrument => {
        return (
          <div id={`row-${instrument}`} className="row align-centre" key={`${instrument}`}>
            <p className="label instrument-label">{instrument}</p>
            <Cells instrument={instrument as Instruments} />
          </div>
        )
      })
    }
  </div >
);

export default Grid;
