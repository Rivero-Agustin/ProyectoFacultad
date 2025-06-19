"use client"; // Indica que este componente se ejecuta en el cliente

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation"; // Importa el hook useRouter de next/navigation
// import Button from "@/components/ButtonArduino";
import { AppButton } from "@/components/AppButton";
import {
  useDataContext,
  OPCIONES_TIPO_ENSAYO,
  TipoEnsayo,
  OPCIONES_CLASE_PROTECCION,
  ClaseProteccion,
  OPCIONES_TIPO_ALIMENTACION,
  TipoAlimentacion,
  OPCIONES_TIPO_PARTE_APLICABLE,
  TipoParteAplicable,
  OPCIONES_CONEXION_RED,
  ConexionRed,
} from "@/context/DataContext";
import PopupSimple from "@/components/popups/PopupSimple";
import AppForm from "@/components/AppForm";
import AppInput from "@/components/AppInput";
import AppSelect from "@/components/AppSelect";
import { set } from "date-fns";

const Home = () => {
  const { datosEnsayo, setDatosEnsayo } = useDataContext();
  const [formData, setFormData] = useState({
    organizacionEnsayo: "",
    nombrePersona: "",
    tipoEnsayo: "" as TipoEnsayo | "",
    organizacionResponsable: "",
    dispositivo: "",
    numeroIdentificacion: "",
    tipoDispositivo: "",
    numeroSerie: "",
    fabricante: "",
    tipoAlimentacion: "" as TipoAlimentacion | "",
    claseProteccion: "" as ClaseProteccion | "",
    tipoParteAplicable: "" as TipoParteAplicable | "",
    conexionRed: "" as ConexionRed | "",
    accesorios: "",
    fecha: new Date().toISOString().split("T")[0],
  });
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const [disabledConexionRed, setDisabledConexionRed] = useState(false);
  const [disabledClaseProteccion, setDisabledClaseProteccion] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const {
      organizacionEnsayo,
      nombrePersona,
      tipoEnsayo,
      organizacionResponsable,
      dispositivo,
      numeroIdentificacion,
      tipoDispositivo,
      numeroSerie,
      fabricante,
      tipoAlimentacion,
      claseProteccion,
      tipoParteAplicable,
      conexionRed,
      accesorios,
      fecha,
    } = formData;

    if (tipoAlimentacion === "Batería") {
      if (!tipoAlimentacion || !tipoParteAplicable) {
        setShowModal(true);
        return;
      }
    } else if (
      !tipoAlimentacion ||
      !claseProteccion ||
      !tipoParteAplicable ||
      !conexionRed
    ) {
      setShowModal(true);
      return;
    }

    setDatosEnsayo({
      ...formData,
      tipoEnsayo: tipoEnsayo as TipoEnsayo,
      tipoAlimentacion: tipoAlimentacion as TipoAlimentacion,
      tipoParteAplicable: tipoParteAplicable as TipoParteAplicable,
      claseProteccion: claseProteccion as ClaseProteccion,
      conexionRed: conexionRed as ConexionRed,
    });
    router.push("/inspeccion");
  };

  // Efecto para actualizar otros campos si se selecciona "Batería"
  useEffect(() => {
    if (formData.tipoAlimentacion === "Batería") {
      setFormData((prev) => ({
        ...prev,
        conexionRed: "",
        claseProteccion: "",
      }));
      setDisabledConexionRed(true);
      setDisabledClaseProteccion(true);
    } else {
      setDisabledConexionRed(false);
      setDisabledClaseProteccion(false);

      setFormData((prev) => ({
        ...prev,
        claseProteccion: "",
        conexionRed: "",
      }));
    }
  }, [formData.tipoAlimentacion]);

  return (
    <>
      <div className="m-4">
        <p className="text-justify mx-8">
          Previamente a los ensayos, se debe consultar los documentos
          acompañantes para identificar las recomendaciones de mantenimiento del
          fabricante, incluyendo cualquier condición especial y precauciones que
          haya que tener en cuenta.
        </p>
      </div>

      <AppForm onSubmit={handleSubmit} className="grid grid-cols-5 gap-3">
        <legend className="text-xl text-center col-span-5">
          Ingrese los siguientes datos para comenzar con el ensayo
        </legend>
        <div className="col-span-3">
          <label htmlFor="organizacionEnsayo">
            Organización que realiza el ensayo
          </label>
          <AppInput
            type="text"
            name="organizacionEnsayo"
            id="organizacionEnsayo"
            value={formData.organizacionEnsayo}
            onChange={handleChange}
            placeholder="Organización"
          />
        </div>
        <div className="col-span-3">
          <label htmlFor="nombrePersona">
            Nombre de la persona que realiza el ensayo
          </label>
          <AppInput
            type="text"
            name="nombrePersona"
            id="nombrePersona"
            value={formData.nombrePersona}
            onChange={handleChange}
            placeholder="Nombre y apellido"
          />
        </div>
        <div className="col-span-2">
          <label htmlFor="organizacionResponsable">
            Organización responsable
          </label>
          <AppInput
            type="text"
            name="organizacionResponsable"
            id="organizacionResponsable"
            value={formData.organizacionResponsable}
            onChange={handleChange}
            placeholder="Organización responsable"
          />
        </div>
        <div className="col-span-2 row-start-2 col-start-4">
          <label htmlFor="tipoEnsayo">Tipo de ensayo</label>
          <AppSelect
            name="tipoEnsayo"
            id="tipoEnsayo"
            value={formData.tipoEnsayo}
            onChange={handleChange}
          >
            <option value="" disabled hidden className="text-gray-500">
              Seleccione una opción
            </option>
            {OPCIONES_TIPO_ENSAYO.map((op) => (
              <option key={op} value={op}>
                {op}
              </option>
            ))}
          </AppSelect>
        </div>

        <div className="col-span-3">
          <label htmlFor="dispositivo">Dispositivo</label>
          <AppInput
            type="text"
            name="dispositivo"
            id="dispositivo"
            value={formData.dispositivo}
            onChange={handleChange}
            placeholder="Dispositivo"
          />
        </div>

        <div className="col-span-2">
          <label htmlFor="numeroIdentificacion">Número de identificación</label>
          <AppInput
            type="text"
            name="numeroIdentificacion"
            id="numeroIdentificacion"
            value={formData.numeroIdentificacion}
            onChange={handleChange}
            placeholder="Número de identificación"
          />
        </div>
        <div className="col-span-2">
          <label htmlFor="tipoDispositivo">Tipo de dispositivo</label>
          <AppInput
            type="text"
            name="tipoDispositivo"
            id="tipoDispositivo"
            value={formData.tipoDispositivo}
            onChange={handleChange}
            placeholder="Tipo de dispositivo"
          />
        </div>
        <div className="col-span-1">
          <label htmlFor="numeroSerie">N° de serie</label>
          <AppInput
            type="text"
            name="numeroSerie"
            id="numeroSerie"
            value={formData.numeroSerie}
            onChange={handleChange}
            placeholder="N° de serie"
          />
        </div>

        <div className="col-span-2">
          <label htmlFor="fabricante">Fabricante</label>
          <AppInput
            type="text"
            name="fabricante"
            id="fabricante"
            value={formData.fabricante}
            onChange={handleChange}
            placeholder="Fabricante"
          />
        </div>

        <div className="col-span-2">
          <label htmlFor="claseProteccion">Tipo de Alimentación</label>
          <AppSelect
            name="tipoAlimentacion"
            id="tipoAlimentacion"
            value={formData.tipoAlimentacion}
            onChange={handleChange}
          >
            <option value="" disabled hidden className="text-gray-500">
              Seleccione una opción
            </option>
            {OPCIONES_TIPO_ALIMENTACION.map((op) => (
              <option key={op} value={op}>
                {op}
              </option>
            ))}
          </AppSelect>
        </div>

        <div className="col-span-3">
          <label htmlFor="claseProteccion">Clase de protección</label>
          <AppSelect
            name="claseProteccion"
            id="claseProteccion"
            value={formData.claseProteccion}
            onChange={handleChange}
            disabled={disabledClaseProteccion}
          >
            <option value="" disabled hidden className="text-gray-500">
              Seleccione una opción
            </option>
            {OPCIONES_CLASE_PROTECCION.map((op) => (
              <option key={op} value={op}>
                {op}
              </option>
            ))}
          </AppSelect>
        </div>

        <div className="col-span-2">
          <label htmlFor="tipoParteAplicable">Tipo de parte aplicable</label>
          <AppSelect
            name="tipoParteAplicable"
            id="tipoParteAplicable"
            value={formData.tipoParteAplicable}
            onChange={handleChange}
          >
            <option value="" disabled hidden className="text-gray-500">
              Seleccione una opción
            </option>
            {OPCIONES_TIPO_PARTE_APLICABLE.map((op) => (
              <option key={op} value={op}>
                {op}
              </option>
            ))}
          </AppSelect>
        </div>

        <div className="col-span-3">
          <label htmlFor="conexionRed">Conexión a red</label>
          <AppSelect
            name="conexionRed"
            id="conexionRed"
            value={formData.conexionRed}
            onChange={handleChange}
            disabled={disabledConexionRed}
          >
            <option value="" disabled hidden className="text-gray-500">
              Seleccione una opción
            </option>
            {OPCIONES_CONEXION_RED.map((op) => (
              <option key={op} value={op}>
                {op}
              </option>
            ))}
          </AppSelect>
        </div>

        <div className="col-span-3">
          <label htmlFor="accesorios">Accesorios</label>
          <AppInput
            type="text"
            name="accesorios"
            id="accesorios"
            value={formData.accesorios}
            onChange={handleChange}
            placeholder="Accesorios"
          />
        </div>

        <div className="col-span-2">
          <label htmlFor="fecha">Fecha</label>
          <AppInput
            type="date"
            name="fecha"
            id="fecha"
            value={formData.fecha}
            onChange={handleChange}
          />
        </div>

        <AppButton
          type="submit"
          className="col-span-5 mx-auto border-2 border-primary-border"
        >
          Iniciar ensayo
        </AppButton>
      </AppForm>

      <PopupSimple
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title="No se puede iniciar el ensayo"
        message="Complete los datos del ensayo para comenzar."
      />
    </>
  );
};

export default Home;
