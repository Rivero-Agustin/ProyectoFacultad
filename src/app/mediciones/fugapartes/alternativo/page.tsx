import MeasurementFlowContainer from "@/components/MeasurementFlowContainer";
import TitleCard from "@/components/TitleCard";
import Image from "next/image";

export default function Alternativo() {
  return (
    <>
      <TitleCard title="Corriente de Fuga de las partes aplicables - Método Alternativo" />
      <div className="flex flex-col items-center">
        <Image
          src="/circuito_fugaparte_alternativo.JPG"
          alt="Circuito del método alternativo para la Corriente de Fuga de Partes Aplicables"
          width={600}
          height={600}
        />
        <MeasurementFlowContainer unidad="mA" sendParam="4" />
      </div>
    </>
  );
}
