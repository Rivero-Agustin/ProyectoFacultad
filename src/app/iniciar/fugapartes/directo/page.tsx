import Button from "@/components/Button";
import MeasurementButton from "@/components/Measurement";
import { sendToArduino } from "@/utils/arduino";
import Image from "next/image";

export default function Directo() {
  return (
    <>
      <div className="flex flex-col items-center">
        <h1>Corriente de Fuga de Partes Aplicables - Método Directo</h1>
        <Image
          src="/circuito_fugaparte_directo.JPG"
          alt="Circuito del método directo para Corriente de Fuga de Partes Aplicables"
          width={600}
          height={600}
        />
        <Button sendToArduino={sendToArduino} sendParam="3" unidad="mA">
          Comenzar
        </Button>

        {/* <MeasurementButton unidad="mA" /> */}
      </div>
    </>
  );
}
