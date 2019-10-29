void setup() {
  Serial.begin(9600);
  pinMode(14,INPUT_PULLUP);
  pinMode(12,OUTPUT);
}

void loop() {
  if(digitalRead(14)==0){
    Serial.println("Boton =1");
    digitalWrite(12,HIGH);
  }
  else{
    Serial.println("Boton=0");
    digitalWrite(12,LOW);
  }
  delay(500);
}
