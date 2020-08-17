/*
 ***************************************** 
 SET USB TYPE:
 MIDI
 *****************************************
*/


#include <Encoder.h> 
#include <Control_Surface.h> 
USBMIDI_Interface midi;

/*
using namespace MIDI_Notes;
// Instantiate a NoteButton object
NoteButton button = {
  5,                       // Push button on pin 5
  {note(C, 4), CHANNEL_1}, // Note C4 on MIDI channel 1
};
*/

/*
CCButtonLatched button[] = {
  { 0, { 0x00, CHANNEL_1 } },
};
*/

// Instantiate a CCButton object
CCButton buttons[] = {
  {0, {0x00, CHANNEL_1}},
  {1, {0x01, CHANNEL_1}},
  {2, {0x02, CHANNEL_1}},
  {3, {0x03, CHANNEL_1}},
  {4, {0x04, CHANNEL_1}},
//  {5, {0x05, CHANNEL_1}},
//  {6, {0x06, CHANNEL_1}},
  {7, {0x07, CHANNEL_1}},
  {8, {0x08, CHANNEL_1}},
  {9, {0x09, CHANNEL_1}},
  {10, {0xA, CHANNEL_1}},
  {11, {0xB, CHANNEL_1}},
  {12, {0xC, CHANNEL_1}},
  {13, {0xD, CHANNEL_1}},
  {14, {0xE, CHANNEL_1}},
  {15, {0xF, CHANNEL_1}},
//  {16, {0x10, CHANNEL_1}},
//  {17, {0x11, CHANNEL_1}},
  {18, {0x12, CHANNEL_1}},
  {19, {0x13, CHANNEL_1}},
//  {20, {0x14, CHANNEL_1}},
//  {21, {0x15, CHANNEL_1}},
  {22, {0x16, CHANNEL_1}},
  {23, {0x17, CHANNEL_1}},
  {24, {0x18, CHANNEL_1}},
  {25, {0x19, CHANNEL_1}},
};

/*
CCValueLED led = {
  5,                  // Pin of the LED, must be PWM pin
  {0x00, CHANNEL_1}, // Note C4 on MIDI channel 1
};
*/

CCValueLED leds[] = {
  {5, {0x00, CHANNEL_1}}, // LED pin, address (note number, channel, cable)
  {6, {0x01, CHANNEL_1}}, // LED pin, address (note number, channel, cable)
  {16, {0x02, CHANNEL_1}}, // LED pin, address (note number, channel, cable)
  {17, {0x08, CHANNEL_1}}, // LED pin, address (note number, channel, cable)
  {20, {0xA, CHANNEL_1}}, // LED pin, address (note number, channel, cable)
  {21, {0xB, CHANNEL_1}}, // LED pin, address (note number, channel, cable)
  
};



// Encoder CC: 26
CCRotaryEncoder encoder[] = {
  {{27, 26},{0x1A, CHANNEL_1}, 1},
  {{29, 28},{0x1C, CHANNEL_1}, 1},
  {{30, 31},{0x1E, CHANNEL_1}, 1},
  {{33, 32},{0x20, CHANNEL_1}, 1},
};


void setup() {
  // Select the correct relative MIDI CC mode.
  // Options:
  //   - TWOS_COMPLEMENT (default)
  //   - BINARY_OFFSET
  //   - SIGN_MAGNITUDE
  //   - NEXT_ADDRESS
  // Aliases:
  //   - REAPER_RELATIVE_1
  //   - REAPER_RELATIVE_2
  //   - REAPER_RELATIVE_3
  //   - TRACKTION_RELATIVE
  //   - MACKIE_CONTROL_RELATIVE
  //   - KORG_KONTROL_INC_DEC_1
  RelativeCCSender::setMode(relativeCCmode::MACKIE_CONTROL_RELATIVE);
  Control_Surface.begin(); // Initialize Control Surface
//    pinMode(ledPin, OUTPUT);
}

void loop() {
  Control_Surface.loop(); // Update the Control Surface
  /*
  if (button.getButtonState() == Button::Rising)
    digitalWrite(ledPin, LOW);
  else if(button.getButtonState() == Button::Falling)
    digitalWrite(ledPin, HIGH);
    */
}
