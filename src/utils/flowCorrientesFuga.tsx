import { createMachine, assign } from "xstate";

type TipoAlimentacion = "Permanentemente instalado" | "Red" | "Batería";
type ClaseProteccion = "Clase I" | "Clase II";
type TipoPartesAplicables = "0" | "B" | "BF" | "CF";
type UltimoEstado = "figura9a" | "figura9b" | "figura10a" | "figura10b";

interface ContextoEnsayo {
  tipoAlimentacion: TipoAlimentacion;
  claseProteccion: ClaseProteccion;
  tipoPartesAplicables: TipoPartesAplicables;
  ultimoEstado: UltimoEstado;
}

type Evento =
  | { type: "INICIAR" }
  | { type: "SET_TIPO_ALIMENTACION"; value: TipoAlimentacion }
  | { type: "SET_CLASE_PROTECCION"; value: ClaseProteccion }
  | { type: "SET_TIPO_PARTES_APLICABLES"; value: TipoPartesAplicables }
  | { type: "SIGUIENTE" }
  | { type: "SI" }
  | { type: "NO" }
  | { type: "ALTERNATIVO" }
  | { type: "DIRECTO" };

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
    tipoPartesAplicables: "0", // valor por defecto
    ultimoEstado: "figura9a",
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
        SET_TIPO_PARTES_APLICABLES: {
          actions: assign(({ event }) => ({
            tipoPartesAplicables: event.value,
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
      on: { SIGUIENTE: "repetirFichaEquipo" },
    },
    figura7b: {
      on: { SIGUIENTE: "repetirFichaEquipo" },
    },
    repetirFichaEquipo: {
      on: {
        SI: "aparatoDirecto",
        NO: "evaluarPartesAplicables",
      },
    },
    evaluarPartesAplicables: {
      always: [
        {
          target: "textoYaIncluida",
          guard: ({ context }) => context.tipoPartesAplicables === "B",
        },
        {
          target: "eleccionAlternativoDirecto",
          guard: ({ context }) =>
            context.tipoPartesAplicables === "BF" ||
            context.tipoPartesAplicables === "CF",
        },
      ],
    },
    textoYaIncluida: {
      on: {
        SIGUIENTE: "fin",
      },
    },
    eleccionAlternativoDirecto: {
      on: {
        ALTERNATIVO: "partesAlternativo",
        DIRECTO: "partesDirecto",
      },
    },
    partesAlternativo: {
      always: [
        {
          target: "figura9a",
          guard: ({ context }) => context.claseProteccion === "Clase I",
        },
        {
          target: "figura9b",
          guard: ({ context }) => context.claseProteccion === "Clase II",
        },
      ],
    },
    figura9a: {
      on: {
        SIGUIENTE: {
          target: "evaluarCF",
          actions: assign({ ultimoEstado: "figura9a" }),
        },
      },
    },
    figura9b: {
      on: {
        SIGUIENTE: {
          target: "evaluarCF",
          actions: assign({ ultimoEstado: "figura9b" }),
        },
      },
    },
    partesDirecto: {
      always: [
        {
          target: "figura10a",
          guard: ({ context }) => context.claseProteccion === "Clase I",
        },
        {
          target: "figura10b",
          guard: ({ context }) => context.claseProteccion === "Clase II",
        },
      ],
    },
    figura10a: {
      on: {
        SIGUIENTE: {
          actions: assign({ ultimoEstado: "figura10a" }),
          target: "repetirFichaPartes",
        },
      },
    },
    figura10b: {
      on: {
        SIGUIENTE: {
          actions: assign({ ultimoEstado: "figura10b" }),
          target: "repetirFichaPartes",
        },
      },
    },
    repetirFichaPartes: {
      on: {
        SI: "repetirFichaPartes2",
        NO: "evaluarCF",
      },
    },
    repetirFichaPartes2: {
      always: [
        {
          target: "figura10a",
          guard: ({ context }) => context.ultimoEstado === "figura10a",
        },
        {
          target: "figura10b",
          guard: ({ context }) => context.ultimoEstado === "figura10b",
        },
      ],
    },
    evaluarCF: {
      always: [
        {
          target: "repetirConexionUnica",
          guard: ({ context }) => context.tipoPartesAplicables === "CF",
        },
        {
          target: "repetirFuncionSimple",
          guard: ({ context }) => context.tipoPartesAplicables === "BF",
        },
      ],
    },
    repetirConexionUnica: {
      on: {
        SI: "repetirConexionUnica2",
        NO: "fin",
      },
    },
    repetirConexionUnica2: {
      always: [
        {
          target: "figura9a",
          guard: ({ context }) => context.ultimoEstado === "figura9a",
        },
        {
          target: "figura9b",
          guard: ({ context }) => context.ultimoEstado === "figura9b",
        },
        {
          target: "figura10a",
          guard: ({ context }) => context.ultimoEstado === "figura10a",
        },
        {
          target: "figura10b",
          guard: ({ context }) => context.ultimoEstado === "figura10b",
        },
      ],
    },
    repetirFuncionSimple: {
      on: {
        SI: "repetirFuncionSimple2",
        NO: "fin",
      },
    },
    repetirFuncionSimple2: {
      always: [
        {
          target: "figura9a",
          guard: ({ context }) => context.ultimoEstado === "figura9a",
        },
        {
          target: "figura9b",
          guard: ({ context }) => context.ultimoEstado === "figura9b",
        },
        {
          target: "figura10a",
          guard: ({ context }) => context.ultimoEstado === "figura10a",
        },
        {
          target: "figura10b",
          guard: ({ context }) => context.ultimoEstado === "figura10b",
        },
      ],
    },
    fin: {
      type: "final",
    },
  },
});
