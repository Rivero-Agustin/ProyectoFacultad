import { AppLink } from "@/components/AppLink";

export default function Fugaequipo() {
  return (
    <>
      <div className="flex flex-col items-center">
        <h1 className="mb-5">Corriente de Fuga del Equipo</h1>
        <div>
          <AppLink href="/iniciar/fugaequipo/directo">Método Directo</AppLink>
          <AppLink href="/iniciar/fugaequipo/alternativo">
            Método Alternativo
          </AppLink>
        </div>
      </div>
    </>
  );
}
