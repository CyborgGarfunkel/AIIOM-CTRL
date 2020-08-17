loadAPI(12);    // Used API version
load("AIIOM.constants.js"); // Constants, magic numbers and configurations
load("AIIOM.transport.js"); // Play, stop, record...
load("AIIOM.track.js"); // Solo, mute...
load("AIIOM.note.js");  // MIDI note trigger
load("AIIOM.navigation.js");    // Change selection...
load("AIIOM.device.js");    // Effects and devices
load("AIIOM.forward.js");  // Loop unassigned controllers back

var midiListeners; // Array of MIDI listeners

host.defineController("AIIOM", "CTRL", "1.5", "34e44d8b-8f7b-43f3-a545-4c4edb422e55", "Frequture"); // Company, product, script version, UUID, author
host.defineMidiPorts(1, 1); // Number of in and out ports
host.addDeviceNameBasedDiscoveryPair(["AIIOM_CTRL"], ["AIIOM_CTRL"]);

// On load this script
function init() {
    // Creating views
    trackBank = host.createMainTrackBank (1, 0, 0), host.createCursorTrack ("AIIOM_CTRL", "Cursor Track", 0, 0, true);
    cursorTrack = host.createArrangerCursorTrack(1, 1); // Track cursor
    trackBank.followCursorTrack(cursorTrack);   // Sync cursor track of view and script

    host.getMidiInPort(0).setMidiCallback(onMidi);  // Configuring MIDI device

    // Initializing controller sections
    midiListeners = [
        initTransport(),
        initTrack(),
        initDevice(),
        initNote(),
        initNavigation(),
        initLoopback()
    ];
}

// Handle incomming MIDI message from controller
function onMidi(status, data1, data2) {
    printMidi(status, data1, data2);
    for (i = 0; i < midiListeners.length; i++) {
        midiListeners[i](status, data1, data2);
    }
}

// On unload this script
function exit() {
    for (i = 0; i < 128; i++) {
        host.getMidiOutPort(0).sendMidi(MIDI_CC, i, BUTTON_OFF);
    }
}

function buttonValueToBoolean(value) {
    if (value <= 63) {
        return false;
    }
    return true;
}
