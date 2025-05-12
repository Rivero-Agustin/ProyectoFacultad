import MeasurementFlowContainer from "@/components/MeasurementFlowContainer";
import TitleCard from "@/components/TitleCard";
import Image from "next/image";

export default function Alternativo() {
  return (
    <>
      <TitleCard title="Corriente de Fuga del Equipo - Método Alternativo" />
      <div className="flex flex-col items-center">
        <Image
          src="/circuito_fugaequipo_alternativo.JPG"
          alt="Circuito del método alternativo para Corriente de Fuga del Equipo"
          width={600}
          height={600}
        />
        <MeasurementFlowContainer unidad="mA" sendParam="2" />
      </div>
    </>
  );
}
