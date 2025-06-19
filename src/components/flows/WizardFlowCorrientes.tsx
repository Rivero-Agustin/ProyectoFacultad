// WizardFlowCorrientes.tsx
"use client";

import { useMachine } from "@xstate/react";
import { flowMachine } from "../../utils/flowCorrientes";
import { AppButton } from "../AppButton";

import { useDataContext } from "@/context/DataContext";

export default function WizardFlowCorrientes() {
  const { datosEnsayo } = useDataContext();
  const [state, send] = useMachine(flowMachine);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold">
        Estado actual: {state.value.toString()}
      </h2>

      {state.matches("inicio") && (
        <AppButton onClick={() => send({ type: "SIGUIENTE" })}>
          Comenzar
        </AppButton>
      )}

      {state.matches("alimentacionAparato") &&
        datosEnsayo.tipoAlimentacion === "Batería" && (
          <>
            <AppButton
              onClick={() => send({ type: "PermanentementeInstalado" })}
            >
              Perma
            </AppButton>
            <AppButton onClick={() => send({ type: "Bateria" })}>
              Bateria{" "}
            </AppButton>
            <AppButton onClick={() => send({ type: "Red" })}>Red </AppButton>
          </>
        )}

      {state.matches("flujoA") && (
        <>
          <p>Estás en el Flujo A</p>
          <AppButton onClick={() => send({ type: "REPETIR" })}>
            Repetir A
          </AppButton>
          <AppButton onClick={() => send({ type: "SIGUIENTE" })}>
            Finalizar
          </AppButton>
        </>
      )}

      {state.matches("flujoB") && (
        <>
          <p>Estás en el Flujo B</p>
          <AppButton onClick={() => send({ type: "REPETIR" })}>
            Repetir B
          </AppButton>
          <AppButton onClick={() => send({ type: "SIGUIENTE" })}>
            Finalizar
          </AppButton>
        </>
      )}

      {state.matches("fin") && <p>🎉 Proceso completado</p>}
    </div>
  );
}
