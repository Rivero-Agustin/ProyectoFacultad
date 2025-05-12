"use client"; // Indica que este componente se ejecuta en el cliente

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; // Importa el hook useRouter de next/navigation
import { sendToArduino } from "@/utils/arduino";
// import Button from "@/components/ButtonArduino";
import Button from "next/link";
import { AppLink } from "@/components/AppLink";
import { AppButton } from "@/components/AppButton";
import { useDataContext } from "@/context/DataContext";
import CustomModal from "@/components/CustomModal";
import ButtonArduino from "@/components/ButtonArduino";
import { toast } from "sonner";
import { usePopupDesconexion } from "@/context/PopupDesconexionContext";

const Home = () => {
  const { setDatosEnsayo } = useDataContext();
  const [formData, setFormData] = useState({
    dispositivo: "",
    nombre: "",
    fecha: new Date().toISOString().split("T")[0],
  });
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { dispositivo, nombre, fecha } = formData;

    if (!dispositivo || !nombre || !fecha) {
      setShowModal(true);
      return;
    }
    setDatosEnsayo(formData);
    router.push("/iniciar");
  };

  return (
    <>
      <div className="m-4">
        <p className="text-center">*Agregar indicaciones*</p>
        <p>
          Conecte el dispositivo -- Lorem, ipsum dolor sit amet consectetur
          adipisicing elit. Amet, non ullam perspiciatis possimus fugiat commodi
          sint vitae, at eaque similique impedit. Nihil aspernatur corrupti
          voluptas, nemo laboriosam beatae unde natus?
        </p>
      </div>
      <div className="mx-20 bg-gray-700 rounded-lg p-4">
        <form
          action="/iniciar"
          onSubmit={handleSubmit}
          className="grid grid-cols-3 gap-4"
        >
          <legend className="text-xl text-center col-span-3">
            Ingrese los siguientes datos para comenzar con el ensayo
          </legend>
          <div className="col-span-1">
            <label htmlFor="dispositivo">Dispositivo</label>
            <input
              type="text"
              name="dispositivo"
              id="dispositivo"
              value={formData.dispositivo}
              onChange={handleChange}
              placeholder="Dispositivo"
              className="p-2 border text-black rounded w-full h-10"
            />
          </div>
          <div className="col-span-1">
            <label htmlFor="nombre">Técnico laboratorista</label>
            <input
              type="text"
              name="nombre"
              id="nombre"
              value={formData.nombre}
              onChange={handleChange}
              placeholder="Nombre y apellido"
              className="p-2 border text-black rounded w-full h-10"
            />
          </div>
          <div className="col-span-1">
            <label htmlFor="fecha">Fecha</label>
            <input
              type="date"
              name="fecha"
              id="fecha"
              value={formData.fecha}
              onChange={handleChange}
              className="p-2 border text-black rounded w-full h-10"
            />
          </div>

          <AppButton
            type="submit"
            className="col-span-3 mx-auto border-2 border-primary-border"
          >
            Iniciar medición
          </AppButton>
        </form>
      </div>
      <CustomModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title="No se puede iniciar el ensayo"
        message="Complete los datos del ensayo para comenzar."
      />
    </>
  );
};

export default Home;
