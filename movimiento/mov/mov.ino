
#include <LiquidCrystal_I2C.h>
#include <Wire.h>

LiquidCrystal_I2C lcd(0x27,16,2);

//int led=12;
//int sensor=13;


void setup() {
  Serial.begin(9600);
  lcd.begin();
  lcd.backlight();
  lcd.clear();

  lcd.home();
  lcd.setCursor(1,1);
  lcd.print("Hola mundo");
  /*
  pinMode(sensor,INPUT);
  pinMode(led,OUTPUT);
  Serial.begin(9600);*/
}

void loop() {
  
  
  /*long state = digitalRead(sensor);
  delay(1000);
  if(state==HIGH){
    digitalWrite(led,HIGH);
    Serial.println("Movimiento detectado");
  }
  else{
    digitalWrite(led,LOW);
    Serial.println("Sin movimiento");
  }*/
}
