// WizardFlow.tsx
"use client";

import { useMachine } from "@xstate/react";
import { flowMachine } from "../../utils/flowTest";
import { AppButton } from "../AppButton";

export default function WizardFlow() {
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

      {state.matches("seleccionTipo") && (
        <>
          <AppButton onClick={() => send({ type: "A" })}>
            Ir a Flujo A
          </AppButton>
          <AppButton onClick={() => send({ type: "B" })}>
            Ir a Flujo B
          </AppButton>
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
