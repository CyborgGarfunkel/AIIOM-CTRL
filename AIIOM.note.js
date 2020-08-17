/*
Implemented:
- Play note C3
*/

function initNote() {
    // Creating views
    trackBank = host.createTrackBank(1, 1, 1, true);    // Number of tracks, sends, scenes, hasFlatList
    cursorTrack = host.createCursorTrack(1, 1); // Track cursor
    trackBank.followCursorTrack(cursorTrack);   // Sync cursor track of view and script

    return onMidiNote;
}

function onMidiNote(status, data1, data2) {
    // Check if message is MIDI CC
    if (isChannelController(status)) {
        switch (data1) {
            case BUTTON_08_MIDINOTE:
                handleNote(data2);
                break;
        }
    }
}

function handleNote(value) {
    if (buttonValueToBoolean(value)) {
        trackBank.getItemAt(0).startNote(NOTE_NUMBER, NOTE_VELOCITY);
    } else {
        trackBank.getItemAt(0).stopNote(NOTE_NUMBER, NOTE_VELOCITY);
    }
}