/*
Implemented:
- Effect on/off
*/

function initDevice() {
    // Creating views
    arrangerCursorDevice = host.createEditorCursorDevice();

    arrangerCursorDevice.isEnabled().addValueObserver(function (deviceEnabled) {
        if (deviceEnabled) {
            host.getMidiOutPort(0).sendMidi(MIDI_CC, BUTTON_09_ONOFF, BUTTON_ON);
        } else {
            host.getMidiOutPort(0).sendMidi(MIDI_CC, BUTTON_09_ONOFF, BUTTON_OFF);
        }
    });

    return onMidiDevice;
}

function onMidiDevice(status, data1, data2) {
    // Check if message is MIDI CC
    if (isChannelController(status)) {
        switch (data1) {
            case BUTTON_09_ONOFF:
                handleDeviceOnOff(data2);
                break;
        }
    }
}


function handleDeviceOnOff(value) {
    if (buttonValueToBoolean(value)) {
        arrangerCursorDevice.isEnabled().toggle();
    }
}
