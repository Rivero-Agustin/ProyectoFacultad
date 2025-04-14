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

const Home = () => {
  const [arduinoData, setArduinoData] = useState("");
  const { setDatosEnsayo } = useDataContext();
  const [formData, setFormData] = useState({
    dispositivo: "",
    nombre: "",
    fecha: new Date().toISOString().split("T")[0], // Establece la fecha actual como valor por defecto
  });
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (window.electron) {
      window.electron.onArduinoData((data) => {
        setArduinoData(data);
      });
    }

    return () => {
      if (window.electron) {
        window.electron.onArduinoData(() => {}); // Limpia el listener al desmontar
      }
    };
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target; // Desestructura el evento
    setFormData((prev) => ({ ...prev, [name]: value })); // Actualiza el estado del formulario
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // Evita el comportamiento por defecto del formulario
    const { dispositivo, nombre, fecha } = formData;

    if (!dispositivo || !nombre || !fecha) {
      setShowModal(true);
      return;
    }
    setDatosEnsayo(formData);
    router.push("/iniciar"); // Redirige a la página de inicio de medicion
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
        {/* <h1>Datos de Arduino: {arduinoData}</h1>
        <Button sendToArduino={sendToArduino} sendParam="hola">
          Enviar a Arduino
        </Button> */}
      </div>

      <div className="flex flex-col gap-4 mx-20 bg-slate-500 p-4 rounded-lg">
        <h1 className="font-bold">Ingrese los siguientes datos</h1>
        <form
          action="/iniciar"
          onSubmit={handleSubmit}
          className="grid grid-cols-3 gap-4 "
        >
          <input
            type="text"
            name="dispositivo"
            value={formData.dispositivo}
            onChange={handleChange}
            placeholder="Dispositivo"
            className="p-2 border text-black rounded"
          />
          <input
            type="text"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            placeholder="Nombre y apellido"
            className="p-2 border text-black rounded"
          />
          <input
            type="date"
            name="fecha"
            value={formData.fecha}
            onChange={handleChange}
            className="p-2 border text-black rounded"
            // defaultValue={new Date().toISOString().split("T")[0]} // Establece la fecha actual como valor por defecto
          />
          <AppButton
            type="submit"
            className="col-span-3 mx-auto border-2 border-black"
          >
            Iniciar medición
          </AppButton>
        </form>
      </div>
      <CustomModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title="Error"
        message="Complete los campos antes de comenzar con la medición"
      />
    </>
  );
};

export default Home;
