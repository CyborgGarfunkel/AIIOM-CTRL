/*
Implemented:
- Play from loop/stop
- Record
- Loop on/off
- Prev./next cue marker
- Cursor
*/

function initTransport() {
    // Creating views
    transport = host.createTransport();
    transport.getInPosition().markInterested();
    transport.playStartPosition().markInterested();
    transport.timeSignature().markInterested();
    transport.getPosition().markInterested();

    // Publishing observers
    transport.isPlaying().addValueObserver(function (play) {
        if (play) {
            host.getMidiOutPort(0).sendMidi(MIDI_CC, BUTTON_03_PLAYSTOP, BUTTON_ON);
        } else {
            host.getMidiOutPort(0).sendMidi(MIDI_CC, BUTTON_03_PLAYSTOP, BUTTON_OFF);
        }
    });

    transport.isArrangerRecordEnabled().addValueObserver(function (record) {
        if (record) {
            host.getMidiOutPort(0).sendMidi(MIDI_CC, BUTTON_12_RECORD, BUTTON_ON);
        } else {
            host.getMidiOutPort(0).sendMidi(MIDI_CC, BUTTON_12_RECORD, BUTTON_OFF);
        }
    })

    transport.isArrangerLoopEnabled().addValueObserver(function (loop) {
        if (loop) {
            host.getMidiOutPort(0).sendMidi(MIDI_CC, BUTTON_10_LOOP, BUTTON_ON);
        } else {
            host.getMidiOutPort(0).sendMidi(MIDI_CC, BUTTON_10_LOOP, BUTTON_OFF);
        }
    })

    return onMidiTransport;
}

function onMidiTransport(status, data1, data2) {
    // Check if message is MIDI CC
    if (isChannelController(status)) {
        switch (data1) {
            case BUTTON_03_PLAYSTOP:
                handleTransportPlayStop(data2);
                break;
            case BUTTON_12_RECORD:
                handleTransportRecord(data2);
                break;
            case BUTTON_10_LOOP:
                handleTransportLoop(data2);
                break;
            case KNOB_02_CURSOR:
                handleTransportCursor(data2);
                break;
            case BUTTON_04_PRECUE:
                handleTransportPrevCue(data2);
                break;
            case BUTTON_05_NEXTCUE:
                handleTransportNextCue(data2);
                break;
            case ENC_BUTTON_02_STARTSTOP:
                handleTransportStartStop(data2);
                break;
        }
    }
}

function handleTransportPlayStop(value) {
    isPlaying = transport.isPlaying().get();
    if (buttonValueToBoolean(value)) {
        if (isPlaying) {
            transport.isPlaying().toggle();
        } else {
            inPosition = transport.getInPosition().get();   // punch in position
            transport.playStartPosition().set(inPosition);
            transport.play();
        }
    }
}

function handleTransportRecord(value) {
    if (buttonValueToBoolean(value)) {
        transport.isArrangerRecordEnabled().toggle();
    }
}

function handleTransportLoop(value) {
    if (buttonValueToBoolean(value)) {
        transport.isArrangerLoopEnabled().toggle();
    }
}

function handleTransportPrevCue(value) {
    if (buttonValueToBoolean(value)) {
        transport.jumpToPreviousCueMarker();
    }
}

function handleTransportNextCue(value) {
    if (buttonValueToBoolean(value)) {
        transport.jumpToNextCueMarker();
    }
}

function handleTransportStartStop(value) {
    isPlaying = transport.isPlaying().get();
    if (buttonValueToBoolean(value)) {
        transport.play();
    }
}

function handleTransportCursor(value) {
    position = transport.getPosition().get();
    numberOfBeatsPerBar = transport.timeSignature().getNumerator().get();

    if (isIncrementKnob02(value)) {
        evenBar = Math.floor(position / numberOfBeatsPerBar);
        evenPosition = evenBar * numberOfBeatsPerBar;
        newPosition = evenPosition + (numberOfBeatsPerBar * KNOB_02_SPEED);
        transport.getPosition().set(newPosition);
    } else {
        evenBar = Math.ceil(position / numberOfBeatsPerBar);
        evenPosition = evenBar * numberOfBeatsPerBar;
        newPosition = evenPosition - (numberOfBeatsPerBar * KNOB_02_SPEED);
        transport.getPosition().set(newPosition);
    }
}

function isIncrementKnob02(value) {
    if (value <= 63) {
        return false;
    }
    return true;
}