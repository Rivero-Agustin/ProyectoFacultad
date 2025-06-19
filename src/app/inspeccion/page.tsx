"use client";
import { AppButton } from "@/components/AppButton";
import AppForm from "@/components/AppForm";
import Parrafo from "@/components/Parrafo";
import TitleCard from "@/components/TitleCard";
import AppTextarea from "@/components/AppTextarea";

import { useRouter } from "next/navigation"; // Importa el hook useRouter de next/navigation
import { use, useState } from "react";
import { useDataContext } from "@/context/DataContext";

export default function Inspeccion() {
  const router = useRouter();
  const [comment, setComment] = useState("");
  const { setDatosEnsayo, datosEnsayo } = useDataContext(); // Función del contexto

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = e.target; // Desestructura el evento
    setComment(value); // Actualiza el estado del comentario
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // Evita el comportamiento por defecto del formulario
    setDatosEnsayo({ inspeccionVisual: comment }); // Guarda el valor del comentario
    setComment(""); // Limpia la variable de comentario
    if (datosEnsayo.tipoAlimentacion === "Batería") {
      router.push("/mediciones/corrientesfuga");
    } else {
      router.push("/mediciones/tierra"); // Redirige a la página de tierra
    }
  };

  return (
    <>
      <TitleCard title="Inspección Visual"></TitleCard>

      <Parrafo className="space-y-2">
        <p>Las cubiertas y gabinetes se deben abrir sólo:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>
            si se requiere en los documentos acompañantes del aparato EM; o
          </li>
          <li>si hay un indicio de seguridad inadecuada.</li>
        </ul>
        <p>Se debe poner especial atención en lo siguiente:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>
            el marcado, las etiquetas y el etiquetado relacionados con la
            seguridad sean legibles y completos,
          </li>
          <li>la integridad de las partes mecánicas,</li>
          <li>
            cualquier daño o contaminación, por ejemplo, cualquier evidencia de
            derrame;
          </li>
          <li>
            evaluar los accesorios apropiados junto con el aparato EM (por
            ejemplo, cordones de alimentación desconectables o fijos, cables de
            paciente, tuberías), y
          </li>
          <li>
            la documentación requerida debe estar presente y debe reflejar la
            revisión actual y/o la configuración del aparato EM.
          </li>
        </ul>
        <p>
          Después de los ensayos, de una reparación o de un ajuste, verificar
          que el aparato EM vuelve a las condiciones necesarias para su uso
          previsto antes de volver a ponerlo en servicio.
        </p>
      </Parrafo>

      <AppForm onSubmit={handleSubmit}>
        <div className="flex flex-col gap-2">
          <label>Comentarios de inspección visual</label>
          <AppTextarea value={comment} onChange={handleChange} />
          <AppButton className="mx-auto" type="submit">
            Siguiente
          </AppButton>
        </div>
      </AppForm>
    </>
  );
}
