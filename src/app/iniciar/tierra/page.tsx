import MeasurementFlowContainer from "@/components/MeasurementFlowContainer";
import TitleCard from "@/components/TitleCard";
import Image from "next/image";

export default function Tierra() {
  return (
    <>
      <TitleCard title="Resistencia de Tierra de Protección" />

      <div className="flex flex-col items-center m-1">
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
