import ButtonArduino from "@/components/ButtonArduino";
import { sendToArduino } from "@/utils/arduino";
import Image from "next/image";

export default function Aislamiento() {
  return (
    <>
      <div className="flex flex-col items-center">
        <h1>Resistencia de Aislamiento</h1>
        <Image
          src="/circuito_aislacion_1.JPG"
          alt="Circuito de Resistencia de Aislamiento 1"
          width={600}
          height={600}
        />
        <Image
          src="/circuito_aislacion_2.JPG"
          alt="Circuito de Resistencia de Aislamiento 2"
          width={600}
          height={600}
        />
        <Image
          src="/circuito_aislacion_3.JPG"
          alt="Circuito de Resistencia de Aislamiento 3"
          width={600}
          height={600}
        />
        <ButtonArduino sendToArduino={sendToArduino} sendParam="5" unidad="Ω">
          Comenzar
        </ButtonArduino>
      </div>
    </>
  );
}
