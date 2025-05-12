import MeasurementFlowContainer from "@/components/MeasurementFlowContainer";
import TitleCard from "@/components/TitleCard";
import Image from "next/image";

export default function Directo() {
  return (
    <>
      <TitleCard title="Corriente de Fuga del Equipo - Método Directo" />
      <div className="flex flex-col items-center">
        <Image
          src="/circuito_fugaequipo_directo.JPG"
          alt="Circuito del método directo para Corriente de Fuga del Equipo"
          width={600}
          height={600}
        />
        <MeasurementFlowContainer unidad="mA" sendParam="1" />
      </div>
    </>
  );
}
