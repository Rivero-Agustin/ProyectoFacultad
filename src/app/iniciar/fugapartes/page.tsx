import { AppLink } from "@/components/AppLink";

export default function Fugapartes() {
  return (
    <>
      <div className="flex flex-col items-center">
        <h1 className="mb-5">Corriente de Fuga de las partes aplicables</h1>
        <div>
          <AppLink href="/iniciar/fugapartes/directo">Método Directo</AppLink>
          <AppLink href="/iniciar/fugapartes/alternativo">
            Método Alternativo
          </AppLink>
        </div>
      </div>
    </>
  );
}
