import React from "react";
import cx from "classnames";

interface CellProps {
  ident: string
  selected: boolean
  handleClick(ident: string): any
}

const Cell: React.SFC<CellProps> = ({ ident, selected, handleClick }) => {
  const styles = cx("cell", selected && "selected");

  return (
    <div className={styles} id={ident} key={ident} onClick={() => handleClick(ident)}></div>
  );

};

export default Cell;
