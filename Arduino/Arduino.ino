void setup() {
    Serial.begin(9600); // Inicia la comunicación serial a 9600 baudios
}

void loop() {
    float resultado;

    // Si hay datos recibidos desde la app, léelos
    if (Serial.available() > 0) {
        String data = Serial.readStringUntil('\n'); // Lee hasta encontrar un salto de línea
        
        int comando = data.toInt();

        //char comando = Serial.read();

        switch(comando) {
          case 1:
            Serial.println("Método directo - Corriente de fuga del equipo"); // Responde a la aplicación con el mensaje recibido
            Serial.println("Midiendo");  //Midiendo
            delay(5000);
            resultado = random();
            Serial.println(resultado);

            break; 

          case 2:
            Serial.println("Método alternativo - Corriente de fuga del equipo");
            Serial.println("Midiendo");  //Midiendo
            delay(5000);
            resultado = random();
            Serial.println(resultado);
            break;
            
          case 3:
            Serial.println("Método directo - Corriente de fuga de partes aplicables");
            Serial.println("Midiendo");  //Midiendo
            delay(5000);
            resultado = random();
            Serial.println(resultado);
            break;

          case 4:
            Serial.println("Método alternativo - Corriente de fuga de partes aplicables");
            Serial.println("Midiendo");  //Midiendo
            delay(5000);
            resultado = random();
            Serial.println(resultado);
            break;

          case 5:
            Serial.println("Resistencia de aislamiento");
            Serial.println("Midiendo");  //Midiendo
            delay(5000);
            resultado = random();
            Serial.println(resultado);
            break;

          case 6:
            //Serial.println("Tierra de protección");
            Serial.println("Midiendo");    //Midiendo
            delay(5000);
            resultado = random();
            Serial.println(resultado);
            break;

          default:
            Serial.println("Recibido: " + data);
            break; 

        }
    }else{
      //Serial.println("Sensor: " + String(random(10, 100)));   // Simula el envío de datos desde Arduino cada 2 segundos
    }


    delay(2000);
}
