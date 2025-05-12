import { AppLink } from "@/components/AppLink";
import TitleCard from "@/components/TitleCard";

export default function Fugapartes() {
  return (
    <>
      <TitleCard title="Corriente de Fuga de las partes aplicables" />
      <div className="flex flex-row justify-center gap-3">
        <AppLink href="/iniciar/fugapartes/directo">Método Directo</AppLink>
        <AppLink href="/iniciar/fugapartes/alternativo">
          Método Alternativo
        </AppLink>
      </div>
    </>
  );
}
