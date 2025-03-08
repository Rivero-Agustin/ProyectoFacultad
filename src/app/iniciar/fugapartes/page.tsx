import Button from "@/components/Button";

export default function Fugapartes() {
  return (
    <>
      <div className="flex flex-col items-center">
        <h1 className="mb-5">Corriente de Fuga de las partes aplicables</h1>
        <div>
          <Button href="/iniciar/fugapartes/directo">Método Directo</Button>
          <Button href="/iniciar/fugapartes/alternativo">
            Método Alternativo
          </Button>
        </div>
      </div>
    </>
  );
}
