#include <DHT.h>
#include <DHT_U.h>

//#include "DHT.h"
//#include <Adafruit_Sensor.h>
#define DHTTYPE DHT11
#define dht_dpin 15
#include <stdio.h>

#include <LiquidCrystal_I2C.h>
#include <Wire.h>

LiquidCrystal_I2C lcd(0x27,16,2);

DHT dht(dht_dpin,DHTTYPE);


int disparador=2;
int entrada=0;
int movimiento=13;

void setup() {
  dht.begin();

  pinMode(movimiento,INPUT);
  pinMode(disparador,OUTPUT);
  pinMode(entrada,INPUT);
  Serial.begin(9600);

  lcd.begin();
  lcd.backlight();
  lcd.clear();
  
}

void loop() {
  lcd.clear();
  lcd.home();
  
  long tiempo;
  float distancia;

  float h=dht.readHumidity();
  float t= dht.readTemperature();

    
  digitalWrite(disparador,HIGH);
  delayMicroseconds(10);
  digitalWrite(disparador,LOW);


  tiempo=(pulseIn(entrada,HIGH)/2);

  distancia=float(tiempo*0.0343);
  //Serial.print("Distancia: ");
  //Serial.println(distancia);

  char str[32];
  sprintf(str,"Hum:%d Temp:%dº",(int)h,(int)t);
  
  lcd.setCursor(0,0);
  //Serial.println(str);
  lcd.print(str);
  lcd.setCursor(1,1);

  char prendido;
  long estado=digitalRead(movimiento);
  if(estado==HIGH){
     prendido='Y';
  }else{
    prendido='N';
  }
  
  char dist[16];
  int d=(int)distancia;
  char *c;
  if(d<10){
    c="cerca";
  }
  else if(d<30){
    c="medio";
  }
  else{
    c="lejos";
  }
  sprintf(dist,"%s M:%c",c,prendido);
  lcd.print(dist);

  
  delay(1000);
}
