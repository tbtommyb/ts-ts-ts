import { Howl, Howler } from "howler";

const kick = new Howl({ src: require("./sounds/bd01.wav") });
const closedHH = new Howl({ src: require("./sounds/hh01.wav") });
const openHH = new Howl({ src: require("./sounds/oh01.wav") });
const clap = new Howl({ src: require("./sounds/cp01.wav") });
const hiTom = new Howl({ src: require("./sounds/ht01.wav") });
const medTom = new Howl({ src: require("./sounds/mt01.wav") });
const lowTom = new Howl({ src: require("./sounds/lt01.wav") });
const rimshot = new Howl({ src: require("./sounds/rs01.wav") });
const snare = new Howl({ src: require("./sounds/sd04.wav") });

export type InstrumentIdent = string;

class Instrument {
  ident: InstrumentIdent;
  sound: Howl;
  id: number;
  constructor(ident: InstrumentIdent, sound: HTMLAudioElement) {
    this.ident = ident;
    this.sound = sound;
  }

  trigger() {
    if (this.sound.playing(this.id)) {
      this.sound.fade(1, 0, 0.1, this.id);
    }
    this.id = this.sound.play();
  }
}

export class SoundManager {
  sounds: Map<InstrumentIdent, Instrument>;
  beats: Array<Set<InstrumentIdent>>;

  constructor(steps: number) {
    // TODO: need to figure out best place to initialise Audio objects
    this.sounds = new Map<InstrumentIdent, Howl>();
    this.sounds.set("kick", new Instrument("kick", kick));
    this.sounds.set("closed-hihat", new Instrument("closed-hihat", closedHH));
    this.sounds.set("open-hihat", new Instrument("open-hihat", openHH));
    this.sounds.set("clap", new Instrument("clap", clap));
    this.sounds.set("hi-tom", new Instrument("hi-tom", hiTom));
    this.sounds.set("medium-tom", new Instrument("medium-tom", medTom));
    this.sounds.set("low-tom", new Instrument("low-tom", lowTom));
    this.sounds.set("rimshot", new Instrument("rimshot", rimshot));
    this.sounds.set("snare", new Instrument("snare", snare));
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
