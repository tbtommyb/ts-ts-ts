import React, { FC } from "react";
import cx from "classnames";
import { CellIdent } from "../store/types";

interface CellProps {
  ident: CellIdent
  selected: boolean
  current: boolean
  handleClick(ident: CellIdent): any
}

const Cell: FC<CellProps> = ({ ident, selected, current, handleClick }) => {
  const styles = cx("cell", selected && "selected", current && "current");

  return (
    <div className={styles} onClick={() => handleClick(ident)}></div>
  );

};

export default Cell;
