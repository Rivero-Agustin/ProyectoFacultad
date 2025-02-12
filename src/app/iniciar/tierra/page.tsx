import Button from "@/components/Button";
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
        <div>
          <Button>Método Directo</Button>
          <Button>Método Alternativo</Button>
        </div>
      </div>
    </>
  );
}
