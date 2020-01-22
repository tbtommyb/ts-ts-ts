const kick = require("./sounds/bd01.wav");

type InstrumentIdent = string;

class Instrument {
  ident: InstrumentIdent;
  sound: HTMLAudioElement;
  constructor(ident: InstrumentIdent, sound: HTMLAudioElement) {
    this.ident = ident;
    this.sound = sound;
  }

  trigger() {
    this.sound.pause();
    this.sound.currentTime = 0;
    this.sound.play();
  }
}

export class SoundManager {
  sounds: Map<InstrumentIdent, Instrument>;
  beats: Array<Set<InstrumentIdent>>;

  constructor(steps: number) {
    this.sounds = new Map<InstrumentIdent, Instrument>();
    this.sounds.set("kick", new Instrument("kick", new Audio(kick)));
    this.beats = new Array<Set<InstrumentIdent>>(steps);
  }

  triggerSound(sound: InstrumentIdent) {
    this.sounds.get(sound).trigger();
  }

  trigger(beat: number) {
    if (this.beats[beat] === undefined) {
      return;
    }
    this.beats[beat].forEach(sound => {
      console.log(sound);
      this.triggerSound(sound);
    });
  }

  toggleBeat(instrument: InstrumentIdent, beat: number) {
    if (this.beats[beat] === undefined) {
      this.beats[beat] = new Set<InstrumentIdent>();
    }
    if (this.beats[beat].has(instrument)) {
      this.beats[beat].delete(instrument);
    } else {
      this.beats[beat].add(instrument);
    }
  }
}
