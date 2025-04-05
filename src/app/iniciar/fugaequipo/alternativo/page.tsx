import ButtonArduino from "@/components/ButtonArduino";
import { sendToArduino } from "@/utils/arduino";
import Image from "next/image";

export default function Alternativo() {
  return (
    <>
      <div className="flex flex-col items-center">
        <h1>Corriente de Fuga del Equipo - Método Alternativo</h1>
        <Image
          src="/circuito_fugaequipo_alternativo.JPG"
          alt="Circuito del método alternativo para Corriente de Fuga del Equipo"
          width={600}
          height={600}
        />
        <ButtonArduino sendToArduino={sendToArduino} sendParam="2" unidad="mA">
          Comenzar
        </ButtonArduino>
      </div>
    </>
  );
}
