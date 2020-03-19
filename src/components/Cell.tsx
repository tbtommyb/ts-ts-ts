import React, { FC } from "react";
import cx from "classnames";

interface CellProps {
  ident: string
  selected: boolean
  handleClick(ident: string): any
}

const Cell: FC<CellProps> = ({ ident, selected, handleClick }) => {
  const styles = cx("cell", selected && "selected");

  return (
    <div className={styles} id={ident} key={ident} onClick={() => handleClick(ident)}></div>
  );

};

export default Cell;
