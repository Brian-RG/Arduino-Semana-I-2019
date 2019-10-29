#include <DHT.h>
#include <DHT_U.h>
#include <FirebaseArduino.h>
#include <ESP8266WiFi.h>
#include <stdio.h>
#include <LiquidCrystal_I2C.h>
#include <Wire.h>


#define FIREBASE_HOST "semana-i-2019.firebaseio.com"
#define FIREBASE_AUTH "cI9CjsnabuoNCJiFKemsTC2Gu92GhcB77ArXAzZW"
#define WIFI_SSID "Tec-IoT"
#define WIFI_PASSWORD "spotless.magnetic.bridge"
#define DHTTYPE DHT11
#define dht_dpin 15

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

  //Wifi Init
  WiFi.begin(WIFI_SSID,WIFI_PASSWORD);
  while(WiFi.status()!=WL_CONNECTED){
    delay(500);
    Serial.print(".");
  }
  Serial.println("");
  Serial.println("Connected");

  //Firebase Init
  Firebase.begin(FIREBASE_HOST,FIREBASE_AUTH);
  
}

void loop() {
  lcd.clear();
  lcd.home();
  long tiempo;
  float distancia;

  int h=(int)dht.readHumidity();
  int t=(int)dht.readTemperature();
  Serial.println(h);
  if(h!=INT_MAX){
    Firebase.setInt("Humedad",h);
    Firebase.setInt("Temperatura",t);
  }
  digitalWrite(disparador,HIGH);
  delayMicroseconds(10);
  digitalWrite(disparador,LOW);
  tiempo=(pulseIn(entrada,HIGH)/2);
  distancia=float(tiempo*0.0343);

  Firebase.setInt("Distancia",(int)distancia);
  char str[32];

  int x,y;
  x=Firebase.getInt("Humedad");
  y=Firebase.getInt("Temperatura");
  Serial.println(x,y);
  //sprintf(str,"Hum:%d Temp:%d",Firebase.getInt("Humedad"),Firebase.getInt("Temperatura"));  
  sprintf(str,"test");
  lcd.setCursor(0,0);
  lcd.print(str);
  Serial.println(str);
  lcd.setCursor(1,1);
  
  if(digitalRead(movimiento)==HIGH){
     Firebase.setBool("on",true);
  }else{
    Firebase.setBool("on",false);
  }
  char dist[16];
  char *c;

  int d=Firebase.getInt("Distancia");
  if(d<10){
    c="cerca";
  }
  else if(d<30){
    c="medio";
  }
  else{
    c="lejos";
  }

  char prendido=(Firebase.getBool("on")?'Y':'N');
  Serial.println(prendido);
  //sprintf(dist,"%s M:%c",c,prendido);
  sprintf(dist,"test2");
  lcd.print(dist);

  int luz= analogRead(A0);
  luz=map(luz,650,10,100,0);
  Firebase.setInt("Luz",luz);
  
  
  
  delay(1000);
}
