import Instruments from "./instruments";

export default interface ISoundManager {
  trigger(beat: number): void;
  toggle(instrument: Instruments, beat: number): void;
}
