#include <WiFi101.h>

#include <ThingSpeak.h>


// C++ code
//

const char* ssid = "SSID";
const char* password = "xxxxxxxxxx";





int a1 = 0;

int a2 = 0;

int a3 = 0;

long readUltrasonicDistance(int triggerPin, int echoPin)
{
  pinMode(triggerPin, OUTPUT);  // Clear the trigger
  digitalWrite(triggerPin, LOW);
  delayMicroseconds(2);
  // Sets the trigger pin to HIGH state for 10 microseconds
  digitalWrite(triggerPin, HIGH);
  delayMicroseconds(10);
  digitalWrite(triggerPin, LOW);
  pinMode(echoPin, INPUT);
  // Reads the echo pin, and returns the sound wave travel time in microseconds
  return pulseIn(echoPin, HIGH);
}

void setup()
{
  pinMode(D6, OUTPUT);
  pinMode(D7, OUTPUT);
  pinMode(D8, OUTPUT);
  Serial.begin(9600);
}

void loop()
{
  a1 = 0.01723 * readUltrasonicDistance(D0, D1);
  a2 = 0.01723 * readUltrasonicDistance(D2, D3);
  a3 = 0.01723 * readUltrasonicDistance(D4, D5);
  if (a1 < 10) {
    digitalWrite(D6, LOW);
  } else {
    digitalWrite(D6, HIGH);
  }
  if (a2 < 10) {
    digitalWrite(D7, LOW);
  } else {
    digitalWrite(D7, HIGH);
  }
  if (a3 < 10) {
    digitalWrite(D8, LOW);
  } else {
    digitalWrite(D8, HIGH);
  }
  Serial.println(a1);
  Serial.println(a2);
  Serial.println(a3);
  delay(15000);
}