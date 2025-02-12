import Button from "@/components/Button";
import { sendToArduino } from "@/utils/arduino";

export default function Iniciar() {
  return (
    <>
      <h2 className="text-center">Seleccione la medición a realizar</h2>
      <div className="flex flex-col mx-20">
        <Button
          href="/iniciar/fugaequipo"
          sendToArduino={sendToArduino}
          sendParam="fugaequipo"
        >
          Corriente de fuga del equipo
        </Button>
        <Button
          href="/iniciar/fugapartes"
          sendToArduino={sendToArduino}
          sendParam="fugapartes"
        >
          Corriente de fuga de partes aplicables
        </Button>
        <Button
          href="/iniciar/aislamiento"
          sendToArduino={sendToArduino}
          sendParam="aislamiento"
        >
          Resistencia de aislamiento
        </Button>
        <Button
          href="/iniciar/tierra"
          sendToArduino={sendToArduino}
          sendParam="tierra"
        >
          Resistencia de tierra de protección
        </Button>
      </div>
    </>
  );
}
