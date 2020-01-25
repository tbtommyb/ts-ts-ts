import Instrument from "./Instrument";

export default interface SoundInterface {
  trigger(beat: number): void;
  toggle(instrument: Instrument, beat: number): void;
}
