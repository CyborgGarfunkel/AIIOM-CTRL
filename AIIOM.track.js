/*
Implemented:
- Track solo
- Track mute
- Arm recording
*/

function initTrack() {
    // Publishing observers
    trackBank.getItemAt(0).mute().addValueObserver(function (isMuted) {
        if (isMuted) {
            host.getMidiOutPort(0).sendMidi(MIDI_CC, BUTTON_02_MUTE, BUTTON_ON);
        } else {
            host.getMidiOutPort(0).sendMidi(MIDI_CC, BUTTON_02_MUTE, BUTTON_OFF);
        }
    });

    trackBank.getItemAt(0).solo().addValueObserver(function (isSolo) {
        if (isSolo) {
            host.getMidiOutPort(0).sendMidi(MIDI_CC, BUTTON_01_SOLO, BUTTON_ON);
        } else {
            host.getMidiOutPort(0).sendMidi(MIDI_CC, BUTTON_01_SOLO, BUTTON_OFF);
        }
    });

    trackBank.getItemAt(0).arm().addValueObserver(function (isArmed) {
        if (isArmed) {
            host.getMidiOutPort(0).sendMidi(MIDI_CC, BUTTON_11_ARMREC, BUTTON_ON);
        } else {
            host.getMidiOutPort(0).sendMidi(MIDI_CC, BUTTON_11_ARMREC, BUTTON_OFF);
        }
    });

    return onMidiTrack;
}

function onMidiTrack(status, data1, data2) {
    // Check if message is MIDI CC
    if (isChannelController(status)) {
        switch (data1) {
            case BUTTON_01_SOLO:
                handleTrackSolo(data2);
                break;
            case BUTTON_02_MUTE:
                handleTrackMute(data2);
                break;
            case BUTTON_11_ARMREC:
                handleTrackArm(data2);
                break;
        }
    }
}

function handleTrackSolo(value) {
    if (buttonValueToBoolean(value)) {
        trackBank.getItemAt(0).solo().toggle();
    }
}

function handleTrackMute(value) {
    if (buttonValueToBoolean(value)) {
        trackBank.getItemAt(0).mute().toggle();
    }
}

function handleTrackArm(value) {
    if (buttonValueToBoolean(value)) {
        trackBank.getItemAt(0).arm().toggle();
    }
}