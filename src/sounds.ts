import { Howl, Howler } from "howler";
import SoundInterface from "./SoundInterface";
import Instrument from "./Instrument";
import Sound from "./Sound";

const kick = new Howl({ src: require("./sounds/bd01.wav") });
const closedHH = new Howl({ src: require("./sounds/hh01.wav") });
const openHH = new Howl({ src: require("./sounds/oh01.wav") });
const clap = new Howl({ src: require("./sounds/cp01.wav") });
const hiTom = new Howl({ src: require("./sounds/ht01.wav") });
const medTom = new Howl({ src: require("./sounds/mt01.wav") });
const lowTom = new Howl({ src: require("./sounds/lt01.wav") });
const rimshot = new Howl({ src: require("./sounds/rs01.wav") });
const snare = new Howl({ src: require("./sounds/sd04.wav") });

class HowlSound implements Sound {
  sound: Howl;
  lastID: number;

  constructor(sound: Howl) {
    this.sound = sound;
    this.lastID = -1;
  }

  trigger() {
    if (this.sound.playing(this.lastID)) {
      this.sound.fade(1, 0, 0.1, this.lastID);
    }
    this.lastID = this.sound.play();
  }
}

export class SoundManager implements SoundInterface {
  tracks: Map<Instrument, Sound>;
  beats: Array<Set<Instrument>>;

  constructor(steps: number) {
    // TODO: need to figure out best place to initialise Audio objects
    this.tracks = new Map<Instrument, Sound>();
    this.tracks.set(Instrument.Kick, new HowlSound(kick));
    this.tracks.set(Instrument.ClosedHH, new HowlSound(closedHH));
    this.tracks.set(Instrument.OpenHH, new HowlSound(openHH));
    this.tracks.set(Instrument.Clap, new HowlSound(clap));
    this.tracks.set(Instrument.HiTom, new HowlSound(hiTom));
    this.tracks.set(Instrument.MediumTom, new HowlSound(medTom));
    this.tracks.set(Instrument.LowTom, new HowlSound(lowTom));
    this.tracks.set(Instrument.Rimshot, new HowlSound(rimshot));
    this.tracks.set(Instrument.Snare, new HowlSound(snare));
    this.beats = new Array<Set<Instrument>>(steps);
  }

  trigger(beat: number) {
    if (this.beats[beat] === undefined) {
      return;
    }
    this.beats[beat].forEach(sound => {
      this.tracks.get(sound) ?.trigger();
    });
  }

  toggle(sound: Instrument, beat: number) {
    if (this.beats[beat] === undefined) {
      this.beats[beat] = new Set<Instrument>();
    }
    if (this.beats[beat].has(sound)) {
      this.beats[beat].delete(sound);
    } else {
      this.beats[beat].add(sound);
    }
  }
}
