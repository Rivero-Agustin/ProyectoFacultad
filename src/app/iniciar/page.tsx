import { AppLink } from "@/components/AppLink";

export default function Iniciar() {
  return (
    <>
      <h2 className="text-center">Seleccione la medición a realizar</h2>
      <div className="flex flex-col mx-20">
        <AppLink href="/iniciar/fugaequipo">
          Corriente de fuga del equipo
        </AppLink>
        <AppLink href="/iniciar/fugapartes">
          Corriente de fuga de partes aplicables
        </AppLink>
        <AppLink href="/iniciar/aislamiento">
          Resistencia de aislamiento
        </AppLink>
        <AppLink href="/iniciar/tierra">
          Resistencia de tierra de protección
        </AppLink>
      </div>
    </>
  );
}
