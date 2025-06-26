import { createMachine, assign } from "xstate";

type TipoAlimentacion = "Permanentemente instalado" | "Red" | "Batería";
type ClaseProteccion = "Clase I" | "Clase II";

interface ContextoEnsayo {
  tipoAlimentacion: TipoAlimentacion;
  claseProteccion: ClaseProteccion;
}

type Evento =
  | { type: "INICIAR" }
  | { type: "SET_TIPO_ALIMENTACION"; value: TipoAlimentacion }
  | { type: "SET_CLASE_PROTECCION"; value: ClaseProteccion }
  | { type: "SIGUIENTE" }
  | { type: "SI" }
  | { type: "NO" };

export const flujoEnsayoMachine = createMachine({
  types: {} as {
    context: ContextoEnsayo;
    events: Evento;
  },
  id: "flujoEnsayo",
  initial: "inicio",
  context: {
    tipoAlimentacion: "Batería", // valor por defecto
    claseProteccion: "Clase I", // valor por defecto
  },
  states: {
    inicio: {
      on: {
        SET_TIPO_ALIMENTACION: {
          actions: assign(({ event }) => ({
            tipoAlimentacion: event.value,
          })),
          target: "evaluarAlimentacion",
        },
        SET_CLASE_PROTECCION: {
          actions: assign(({ event }) => ({
            claseProteccion: event.value,
          })),
        },
      },
    },
    evaluarAlimentacion: {
      always: [
        {
          target: "figura7",
          guard: ({ context }) =>
            context.tipoAlimentacion === "Permanentemente instalado",
        },
        {
          target: "fugaAparato",
          guard: ({ context }) => context.tipoAlimentacion === "Red",
        },
        {
          target: "figura11",
          guard: ({ context }) => context.tipoAlimentacion === "Batería",
        },
      ],
    },
    figura7: {
      on: { SIGUIENTE: "fin" },
    },
    fugaAparato: {
      on: { SI: "aparatoDirecto", NO: "aparatoAlternativo" },
    },
    figura11: {
      on: { SIGUIENTE: "fin" },
    },
    aparatoAlternativo: {
      always: [
        {
          target: "figura6a",
          guard: ({ context }) => context.claseProteccion === "Clase I",
        },
        {
          target: "figura6b",
          guard: ({ context }) => context.claseProteccion === "Clase II",
        },
      ],
    },
    aparatoDirecto: {
      always: [
        {
          target: "figura7a",
          guard: ({ context }) => context.claseProteccion === "Clase I",
        },
        {
          target: "figura7b",
          guard: ({ context }) => context.claseProteccion === "Clase II",
        },
      ],
    },
    figura6a: {
      on: { SIGUIENTE: "mayor1mA" },
    },
    figura6b: {
      on: { SIGUIENTE: "mayor1mA" },
    },
    mayor1mA: {
      on: {
        SI: "aparatoDirecto",
        NO: "fin",
      },
    },
    figura7a: {
      on: { SIGUIENTE: "repetirFicha" },
    },
    figura7b: {
      on: { SIGUIENTE: "repetirFicha" },
    },
    repetirFicha: {
      on: {
        SI: "aparatoDirecto",
        NO: "fin",
      },
    },
    fin: {
      type: "final",
    },
  },
});
