#include <FirebaseArduino.h>
#include <ESP8266WiFi.h>

#define FIREBASE_HOST "semana-i-2019.firebaseio.com"
#define FIREBASE_AUTH "cI9CjsnabuoNCJiFKemsTC2Gu92GhcB77ArXAzZW"
#define WIFI_SSID "Tec-IoT"
#define WIFI_PASSWORD "spotless.magnetic.bridge"

int led=12;
int sensor=13;
int led2=14;

void setup() {
  // put your setup code here, to run once:
  Serial.begin(9600);
  pinMode(sensor,INPUT);
  pinMode(led,OUTPUT);
  pinMode(led2,OUTPUT);
  
  WiFi.begin(WIFI_SSID,WIFI_PASSWORD);
  while(WiFi.status()!=WL_CONNECTED){
    delay(500);
    Serial.print(".");
  }
  Serial.println("");
  Serial.println("Connected");
  Firebase.begin(FIREBASE_HOST,FIREBASE_AUTH);
  Firebase.setInt("foco",1);
}

void loop() {
  long state=digitalRead(sensor);
  delay(1000);

  if(state==HIGH){
    Serial.println("Movimiento");
    Firebase.setInt("Movimiento",1);
  }
  else{
    Serial.println("Sin movimiento");
    Firebase.setInt("Movimiento",0);
  }

  if(Firebase.getInt("Movimiento")==1){
    digitalWrite(led,HIGH);
  }else{
    digitalWrite(led,LOW);
  }

  if(Firebase.getInt("foco")==1){
    digitalWrite(led2,HIGH);
  }else{
    digitalWrite(led2,LOW);
  }

}
