/*
Implemented:
- Prev. track
- Next track
- Scroll tracks
*/

function initNavigation() {
    return onMidiNavigation;
}

function onMidiNavigation(status, data1, data2) {
    // Check if message is MIDI CC
    if (isChannelController(status)) {
        switch (data1) {
            case BUTTON_06_PRETRACK:
                handleNavigationPre(data2);
                break;
            case BUTTON_07_NEXTTRACK:
                handleNavigationNext(data2);
                break;
            case KNOB_01_SCROLL:
                handleNavigationScrollTracks(data2);
                break;
        }
    }
}

function handleNavigationPre(value) {
    if (buttonValueToBoolean(value)) {
        cursorTrack.selectPrevious();
    }
}

function handleNavigationNext(value) {
    if (buttonValueToBoolean(value)) {
        cursorTrack.selectNext();
    }
}

function handleNavigationScrollTracks(value) {
    if (isIncrementKnob01(value)) {
        cursorTrack.selectNext();
    } else {
        cursorTrack.selectPrevious();
    }
}

function isIncrementKnob01(value) {
    if (value <= 63) {
        return false;
    }
    return true;
}