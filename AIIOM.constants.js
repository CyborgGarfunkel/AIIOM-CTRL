/*
The physical buttons on the controller send 2 msg on each press:
PRESS (127 = 7F) and RELEASE (0 = 00).
Data is send as CC from 0x00 to 0x20.
[0xB0, 0x00, 0x7F] = [MIDI CC channel 0, solo, press]
*/

// Buttons
const BUTTON_01_SOLO = 0x00;   // Solo
const BUTTON_02_MUTE = 0x01;   // Mute
const BUTTON_03_PLAYSTOP = 0x02;   // Play from loop start, toggle stop
const BUTTON_04_PRECUE = 0x03;   // Prev. cue Point
const BUTTON_05_NEXTCUE = 0x04;   // Next cue Point
const BUTTON_06_PRETRACK = 0x05;   // Select track before
const BUTTON_07_NEXTTRACK = 0x06;   // Select track after
const BUTTON_08_MIDINOTE = 0x07;   // Play MIDI C3
const BUTTON_09_ONOFF = 0x08;   // On/off (if effect selected), deactivate (if clip selected)
const BUTTON_10_LOOP = 0x09;   // Loop
const BUTTON_11_ARMREC = 0x0A;   // Arm
const BUTTON_12_RECORD = 0x0B;   // Record
const BUTTON_22_MIDICC = 0x0C;   //
const BUTTON_14 = 0x0D;   //
const BUTTON_15 = 0x0E;   //
const BUTTON_16 = 0x0F;   //
const BUTTON_17 = 0x10;   //
const BUTTON_18 = 0x11;   //
const BUTTON_19 = 0x12;   //
const BUTTON_20 = 0x13;   //
const BUTTON_21 = 0x14;   //
const BBUTTON_13 = 0x15;   // Send MIDI CC 0x15 to track

const ENC_BUTTON_01 = 0x16;   //
const ENC_BUTTON_02_STARTSTOP = 0x17;   // Normal start/stop
const ENC_BUTTON_03 = 0x18;   //
const ENC_BUTTON_04 = 0x19;   //

// Knobs
const KNOB_01_SCROLL = 0x1A;  // Scroll tracks
const KNOB_02_CURSOR = 0x1C;  // Scroll cursor
const KNOB_03 = 0x1E;  // Send MIDI CC 0x1E to track
const KNOB_04 = 0x20;  // Send MIDI CC 0x20 to track

// Knob velocity
const KNOB_01_SPEED = 1; // Sensivity of rotation
const KNOB_02_SPEED = 1; // Sensivity of rotation
const KNOB_03_SPEED = 1; // Sensivity of rotation
const KNOB_04_SPEED = 1; // Sensivity of rotation

// Button parameters
const NOTE_VELOCITY = 127;    // Velocity for note MIDI C3 trigger
const NOTE_NUMBER = 48; // MIDI note value C3
const BUTTON_ON = 127;  // On button press
const BUTTON_OFF = 0;   // On button release

// MIDI parameters
const MIDI_CC = 0xB0;   // MIDI CC on channel 0
