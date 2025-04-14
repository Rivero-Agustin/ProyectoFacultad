import ButtonArduino from "@/components/ButtonArduino";
import MeasurementFlowContainer from "@/components/MeasurementFlowContainer";
import { sendToArduino } from "@/utils/arduino";
import Image from "next/image";

export default function Tierra() {
  return (
    <>
      <div className="flex flex-col items-center">
        <h1>Resistencia de Tierra de Protección</h1>
        <Image
          src="/circuito_tierra.PNG"
          alt="Circuito de Tierra de Protección"
          width={600}
          height={600}
        />
        <MeasurementFlowContainer unidad="Ω" sendParam="6" />
      </div>
    </>
  );
}
