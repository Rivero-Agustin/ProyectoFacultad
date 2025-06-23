import { createMachine, assign } from "xstate"; // flowMachine.ts

type TipoAlimentacion = "Permanentemente Instalado" | "Red" | "Bateria";

interface ContextoEnsayo {
  tipoAlimentacion: TipoAlimentacion;
}

type Evento =
  | { type: "INICIAR" }
  | { type: "SET_TIPO_ALIMENTACION"; value: TipoAlimentacion };

export const flowMachine = createMachine({
  id: "wizardFlow",
  initial: "inicio",
  context: {
    tipoAlimentacion: "" as "Permanentemente Instalado" | "Bateria" | "",
  },
  states: {
    inicio: {
      on: {
        SET_TIPO_ALIMENTACION: {
          actions: assign({
            tipoAlimentacion: (_, event) => event.value,
          }),
          target: "alimentacionAparato",
        },
      },
    },
    alimentacionAparato: {
      always: [
        {
          target: "caseMed1",
          cond: (context) =>
            context.tipoAlimentacion === "Permanentemente Instalado",
        },
        {
          target: "figura11",
          cond: (context) => context.tipoAlimentacion === "Bateria",
        },
      ],
    },
    claseMed1: {
      on: {
        Clase1: "figura7aperma",
        Clase2: "figura7bperma",
      },
    },
    figura7aperma: {
      on: {
        SIGUIENTE: "tipoParteAplicable",
      },
    },
    figura7bperma: {
      on: {
        SIGUIENTE: "tipoParteAplicable",
      },
    },
    figura11: {
      on: {
        RepetirFicha: "figura11",
        NoRepetirFicha: "tipoParteAplicable",
      },
    },
    aislarTierraAparato: {
      on: {
        NO: "claseMed3",
        SI: "claseMed4",
      },
    },
    claseMed3: {
      on: {
        Clase1: "figura6a",
        Clase2: "figura6b",
      },
    },
    figura6a: {
      on: {
        SIGUIENTE: "mayor1mA",
      },
    },
    figura6b: {
      on: {
        SIGUIENTE: "mayor1mA",
      },
    },
    mayor1mA: {
      on: {
        SI: "claseMed4",
        NO: "tipoParteAplicable",
      },
    },
    claseMed4: {
      on: {
        Clase1: "figura7a",
        Clase2: "figura7b",
      },
    },
    figura7a: {
      on: {
        RepetirFicha: "figura7a",
        NoRepetirFicha: "tipoParteAplicable",
      },
    },
    figura7b: {
      on: {
        RepetirFicha: "figura7b",
        NoRepetirFicha: "tipoParteAplicable",
      },
    },
    tipoParteAplicable: {
      on: {
        B: "textoNoMed",
        F: "fin",
      },
    },
    textoNoMed: {
      on: {
        SIGUIENTE: "fin",
      },
    },
    fin: {
      type: "final",
    },
  },
});
