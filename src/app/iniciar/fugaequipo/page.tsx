import { AppLink } from "@/components/AppLink";
import TitleCard from "@/components/TitleCard";

export default function Fugaequipo() {
  return (
    <>
      <TitleCard title="Corriente de Fuga del Equipo" />
      <div className="flex flex-col items-center">
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
