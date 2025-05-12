import MeasurementFlowContainer from "@/components/MeasurementFlowContainer";
import TitleCard from "@/components/TitleCard";
import Image from "next/image";

export default function Directo() {
  return (
    <>
      <TitleCard title="Corriente de Fuga de las partes aplicables - Método Directo" />
      <div className="flex flex-col items-center">
        <Image
          src="/circuito_fugaparte_directo.JPG"
          alt="Circuito del método directo para Corriente de Fuga de Partes Aplicables"
          width={600}
          height={600}
        />
        <MeasurementFlowContainer unidad="mA" sendParam="3" />
      </div>
    </>
  );
}
