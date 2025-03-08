import Button from "@/components/Button";

export default function Fugaequipo() {
  return (
    <>
      <div className="flex flex-col items-center">
        <h1 className="mb-5">Corriente de Fuga del Equipo</h1>
        <div>
          <Button href="/iniciar/fugaequipo/directo">Método Directo</Button>
          <Button href="/iniciar/fugaequipo/alternativo">
            Método Alternativo
          </Button>
        </div>
      </div>
    </>
  );
}
