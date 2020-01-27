import Instrument from "./Instrument";

export default interface CellClick {
  id: string,
  sound: Instrument,
  beat: number,
};
