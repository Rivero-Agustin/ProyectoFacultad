import ButtonArduino from "@/components/ButtonArduino";
import { sendToArduino } from "@/utils/arduino";
import Image from "next/image";

export default function Directo() {
  return (
    <>
      <div className="flex flex-col items-center">
        <h1>Corriente de Fuga del Equipo - Método Directo</h1>
        <Image
          src="/circuito_fugaequipo_directo.JPG"
          alt="Circuito del método directo para Corriente de Fuga del Equipo"
          width={600}
          height={600}
        />
        <ButtonArduino sendToArduino={sendToArduino} sendParam="1" unidad="mA">
          Comenzar
        </ButtonArduino>

        {/* <MeasurementButton unidad="mA" /> */}
      </div>
    </>
  );
}
