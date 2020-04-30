import { Howl } from "howler";
import Instruments from "./instruments";
import ISoundManager from "./ISoundManager";
import Sound from "./Sound";

const kick = new Howl({ src: "/bd01.mp3" });
const closedHH = new Howl({ src: "/hh01.mp3" });
const openHH = new Howl({ src: "/oh01.mp3" });
const clap = new Howl({ src: "/cp01.mp3" });
const hiTom = new Howl({ src: "/ht01.mp3" });
const medTom = new Howl({ src: "/mt01.mp3" });
const lowTom = new Howl({ src: "/lt01.mp3" });
const rimshot = new Howl({ src: "/rs01.mp3" });
const snare = new Howl({ src: "/sd04.mp3" });

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

export default class HowlSoundManager implements ISoundManager {
  tracks: Map<Instruments, Sound>;
  beats: Array<Set<Instruments>>;

  constructor() {
    // TODO: need to figure out best place to initialise Audio objects
    this.tracks = new Map<Instruments, Sound>();
    this.tracks.set(Instruments.Kick, new HowlSound(kick));
    this.tracks.set(Instruments.ClosedHH, new HowlSound(closedHH));
    this.tracks.set(Instruments.OpenHH, new HowlSound(openHH));
    this.tracks.set(Instruments.Clap, new HowlSound(clap));
    this.tracks.set(Instruments.HiTom, new HowlSound(hiTom));
    this.tracks.set(Instruments.MediumTom, new HowlSound(medTom));
    this.tracks.set(Instruments.LowTom, new HowlSound(lowTom));
    this.tracks.set(Instruments.Rimshot, new HowlSound(rimshot));
    this.tracks.set(Instruments.Snare, new HowlSound(snare));
    this.beats = new Array<Set<Instruments>>();
  }

  trigger(beat: number) {
    if (this.beats[beat] === undefined) {
      return;
    }
    this.beats[beat].forEach(sound => {
      this.tracks.get(sound)?.trigger();
    });
  }

  toggle(sound: Instruments, beat: number) {
    if (this.beats[beat] === undefined) {
      this.beats[beat] = new Set<Instruments>();
    }
    if (this.beats[beat].has(sound)) {
      this.beats[beat].delete(sound);
    } else {
      this.beats[beat].add(sound);
    }
  }
}
