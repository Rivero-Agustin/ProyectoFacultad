"use client";

import ButtonArduino from "@/components/ButtonArduino";
import { sendToArduino } from "@/utils/arduino";
import Image from "next/image";
import GeneratePDFButton from "@/components/GeneratePDFButton";

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
        <ButtonArduino sendToArduino={sendToArduino} sendParam="6" unidad="Ω">
          Realizar medición
        </ButtonArduino>
        {/* <GeneratePDFButton /> */}
      </div>
    </>
  );
}
