import React, { FC } from "react";
import cx from "classnames";
import { CellIdent } from "../store/types";

interface CellProps {
  ident: CellIdent
  selected: boolean
  handleClick(ident: CellIdent): any
}

const Cell: FC<CellProps> = ({ ident, selected, handleClick }) => {
  const styles = cx("cell", selected && "selected");

  return (
    <div className={styles} onClick={() => handleClick(ident)}></div>
  );

};

export default Cell;
