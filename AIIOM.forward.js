/*
Implemented:
- Knobs 3, 4
- Button 22
*/

function initLoopback() {
    return onMidiLoopback;
}

function onMidiLoopback(status, data1, data2) {
    // Check if message is MIDI CC
    if (isChannelController(status)) {
        switch (data1) {
            case KNOB_03:
                var value_03 = data2 > 64 ? 64 - data2 : data2;
                trackBank.getItemAt (0).volume ().inc (value_03, 128);
                break;
            case KNOB_04:
                var value_04 = data2 > 64 ? 64 - data2 : data2;
                trackBank.getItemAt (0).pan ().inc (value_04, 128);
//              trackBank.getItemAt(0).sendMidi(MIDI_CC, KNOB_04, data2);
                break;
            case BUTTON_22_MIDICC:
                trackBank.getItemAt(0).sendMidi(MIDI_CC, BUTTON_22_MIDICC, data2);
                break;
        }
    }
}
/*
case KNOB_03:
var value = data2 > 64 ? 64 - data2 : data2;
this.trackbank.getItemAt (0).sendMidi(MIDI_CC, KNOB_03, data2).inc (value, 128);
return true;
break;
*/
