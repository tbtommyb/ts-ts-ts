const kick = require("./sounds/bd01.wav");
const closedHH = require("./sounds/hh01.wav");
const openHH = require("./sounds/oh01.wav");
const clap = require("./sounds/cp01.wav");
const hiTom = require("./sounds/ht01.wav");
const medTom = require("./sounds/mt01.wav");
const lowTom = require("./sounds/lt01.wav");
const rimshot = require("./sounds/rs01.wav");
const snare = require("./sounds/sd04.wav");

export type InstrumentIdent = string;

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
    // TODO: need to figure out best place to initialise Audio objects
    this.sounds = new Map<InstrumentIdent, Instrument>();
    this.sounds.set("kick", new Instrument("kick", new Audio(kick)));
    this.sounds.set(
      "closed-hihat",
      new Instrument("closed-hihat", new Audio(closedHH))
    );
    this.sounds.set(
      "open-hihat",
      new Instrument("open-hihat", new Audio(openHH))
    );
    this.sounds.set("clap", new Instrument("clap", new Audio(clap)));
    this.sounds.set("hi-tom", new Instrument("hi-tom", new Audio(hiTom)));
    this.sounds.set(
      "medium-tom",
      new Instrument("medium-tom", new Audio(medTom))
    );
    this.sounds.set("low-tom", new Instrument("low-tom", new Audio(lowTom)));
    this.sounds.set("rimshot", new Instrument("rimshot", new Audio(rimshot)));
    this.sounds.set("snare", new Instrument("snare", new Audio(snare)));
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
