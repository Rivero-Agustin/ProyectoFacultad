import ButtonArduino from "@/components/ButtonArduino";
import MeasurementFlowContainer from "@/components/MeasurementFlowContainer";
import TitleCard from "@/components/TitleCard";
import { sendToArduino } from "@/utils/arduino";
import Image from "next/image";

export default function Aislamiento() {
  return (
    <>
      <TitleCard title="Resistencia de Aislamiento" />

      <div className="flex flex-col items-center">
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
        <MeasurementFlowContainer unidad="mA" sendParam="5" />
      </div>
    </>
  );
}
