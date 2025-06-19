// flowMachine.ts
import { createMachine, assign } from "xstate";

type FlowEvent =
  | { type: "SIGUIENTE" }
  | { type: "A" }
  | { type: "B" }
  | { type: "REPETIR" };

export const flowMachine = createMachine({
  id: "wizardFlow",
  initial: "inicio",
  states: {
    //Si el estado es este, se muestra tal cosa
    inicio: {
      on: { SIGUIENTE: "seleccionTipo" }, // Si envío SIGUIENTE, paso al seleccionTipo
    },
    seleccionTipo: {
      on: {
        A: "flujoA",
        B: "flujoB",
      },
    },
    flujoA: {
      on: {
        REPETIR: "flujoA",
        SIGUIENTE: "fin",
      },
    },
    flujoB: {
      on: {
        REPETIR: "flujoB",
        SIGUIENTE: "fin",
      },
    },
    fin: {
      type: "final",
    },
  },
});
