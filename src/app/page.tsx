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
  const [deshabilitado, setDeshabilitado] = useState(false);
  const [mostrarMedicion, setMostrarMedicion] = useState(false);
  const [mensajeConexion, setMensajeConexion] = useState("");

  useEffect(() => {
    if (window.electron && window.electron.notifyFrontendReady) {
      window.electron.notifyFrontendReady();
    }
  }, []);

  // Efecto para escuchar la respuesta del Arduino
  useEffect(() => {
    if (window.electron) {
      // Configurar el listener
      window.electron.onArduinoData((data) => {
        console.log("Recibido de arduino: ", data);
        setArduinoData(data);
        setDeshabilitado(false);

        // Actualizar el mensaje de conexión basado en la respuesta
        if (data.trim() === "OK_ARDUINO") {
          setMensajeConexion("Conectado");
        } else {
          setMensajeConexion("Desconectado");
        }
      });

      // Enviar mensaje inicial después de configurar el listener
      /*setTimeout(() => {
        console.log("Enviando mensaje inicial al Arduino...");
        sendToArduino("0");
        setMostrarMedicion(true);
      }, 1000); */ // Esperar 1/2 segundo para asegurar que el listener está listo
    }

    // Solo limpiar el listener cuando el componente se desmonte
    return () => {
      if (window.electron) {
        window.electron.removeArduinoDataListener(() => {});
      }
    };
  }, []);

  // Desconexion de arduino
  useEffect(() => {
    if (window.electron) {
      window.electron.onArduinoDisconnected(() => {
        toast.error("Arduino desconectado");
      });
    }
  }, []);

  // Conexion de arduino
  useEffect(() => {
    if (window.electron) {
      window.electron.onArduinoReady(() => {
        console.log("📣 Arduino listo. Enviando '0' desde el frontend...");
        setTimeout(() => {
          sendToArduino("0");
          setMostrarMedicion(true);
          toast.success("Arduino conectado");
        }, 1000);
      });
    }

    return () => {
      if (window.electron) {
        window.electron.onArduinoReady(() => {}); // Limpia el listener
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
        <div className="flex flex-row items-center justify-center">
          <ButtonArduino
            sendParam="0"
            sendToArduino={sendToArduino}
            deshabilitado={deshabilitado}
            setDeshabilitado={setDeshabilitado}
            setMostrarMedicion={setMostrarMedicion}
          >
            Conectar
          </ButtonArduino>
          {mostrarMedicion && !deshabilitado && (
            <p>Estado: {mensajeConexion}</p>
          )}
        </div>
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
              // defaultValue={new Date().toISOString().split("T")[0]} // Establece la fecha actual como valor por defecto
            />
          </div>

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
        title="No se puede iniciar el ensayo"
        message="Complete los datos del ensayo para dar inicio al mismo."
      />
    </>
  );
};

export default Home;
