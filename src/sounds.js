"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const howler_1 = require("howler");
const Instrument_1 = require("./Instrument");
const kick = new howler_1.Howl({ src: require("./sounds/bd01.wav") });
const closedHH = new howler_1.Howl({ src: require("./sounds/hh01.wav") });
const openHH = new howler_1.Howl({ src: require("./sounds/oh01.wav") });
const clap = new howler_1.Howl({ src: require("./sounds/cp01.wav") });
const hiTom = new howler_1.Howl({ src: require("./sounds/ht01.wav") });
const medTom = new howler_1.Howl({ src: require("./sounds/mt01.wav") });
const lowTom = new howler_1.Howl({ src: require("./sounds/lt01.wav") });
const rimshot = new howler_1.Howl({ src: require("./sounds/rs01.wav") });
const snare = new howler_1.Howl({ src: require("./sounds/sd04.wav") });
class HowlSound {
    constructor(sound) {
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
class SoundManager {
    constructor(steps) {
        // TODO: need to figure out best place to initialise Audio objects
        this.tracks = new Map();
        this.tracks.set(Instrument_1.default.Kick, new HowlSound(kick));
        this.tracks.set(Instrument_1.default.ClosedHH, new HowlSound(closedHH));
        this.tracks.set(Instrument_1.default.OpenHH, new HowlSound(openHH));
        this.tracks.set(Instrument_1.default.Clap, new HowlSound(clap));
        this.tracks.set(Instrument_1.default.HiTom, new HowlSound(hiTom));
        this.tracks.set(Instrument_1.default.MediumTom, new HowlSound(medTom));
        this.tracks.set(Instrument_1.default.LowTom, new HowlSound(lowTom));
        this.tracks.set(Instrument_1.default.Rimshot, new HowlSound(rimshot));
        this.tracks.set(Instrument_1.default.Snare, new HowlSound(snare));
        this.beats = new Array(steps);
    }
    trigger(beat) {
        if (this.beats[beat] === undefined) {
            return;
        }
        this.beats[beat].forEach(sound => {
            var _a;
            (_a = this.tracks.get(sound)) === null || _a === void 0 ? void 0 : _a.trigger();
        });
    }
    toggle(sound, beat) {
        if (this.beats[beat] === undefined) {
            this.beats[beat] = new Set();
        }
        if (this.beats[beat].has(sound)) {
            this.beats[beat].delete(sound);
        }
        else {
            this.beats[beat].add(sound);
        }
    }
}
exports.SoundManager = SoundManager;
