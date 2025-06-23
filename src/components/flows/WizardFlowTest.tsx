"use client";
import { useMachine } from "@xstate/react";
import { flujoEnsayoMachine } from "../../utils/flowTest";
import { useEffect, useState } from "react";
import { useDataContext } from "@/context/DataContext";
import Parrafo from "../Parrafo";
import Figura from "../Figura";
import { stat } from "fs";
import DoubleCard from "../DoubleCard";
import MeasurementFlowContainer from "../MeasurementFlowContainer";
import PopupConfirm from "../popups/PopupConfirm";

export default function WizardFlowTest() {
  const { datosEnsayo, measurements } = useDataContext();
  const [state, send] = useMachine(flujoEnsayoMachine);
  const [figuraON, setFiguraON] = useState(true);
  const [figura, setFigura] = useState("");
  const [aislarTierra, setAislarTierra] = useState(false);

  // Cambia las variables a estados
  const [text, setText] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [unidad, setUnidad] = useState("mA");
  const [sendParam, setSendParam] = useState("");
  const [medicionON, setMedicionON] = useState(true);
  const [showPopup1mA, setShowPopup1mA] = useState(false);

  useEffect(() => {
    send({ type: "SET_CLASE_PROTECCION", value: datosEnsayo.claseProteccion });
    const tipo = datosEnsayo.tipoAlimentacion;
    if (tipo === "Batería") {
      send({ type: "SET_TIPO_ALIMENTACION", value: tipo });
    } else {
      if (datosEnsayo.conexionRed === "Permanentemente instalado") {
        send({
          type: "SET_TIPO_ALIMENTACION",
          value: datosEnsayo.conexionRed,
        });
      } else {
        send({
          type: "SET_TIPO_ALIMENTACION",
          value: "Red",
        });
      }
    }
  }, []);

  useEffect(() => {
    // Actualiza los estados según el estado de la máquina
    if (state.matches("figura11")) {
      setText(`Tipo de alimentación: ${datosEnsayo.tipoAlimentacion}`);
      setSubtitle("Corriente de fuga de la Parte Aplicable - Método Directo");
      setFigura("Figura 11.JPG");
      setSendParam("3");
      setUnidad("mA");
      setMedicionON(true);
      setFiguraON(true);
    } else if (state.matches("figura7")) {
      setText(`Tipo de alimentación: ${datosEnsayo.tipoAlimentacion}`);
      setSubtitle(
        "Corriente de contacto de partes conductoras accesibles que no están a tierra"
      );
      setSendParam("1");
      setUnidad("mA");
      setMedicionON(true);
      setFiguraON(true);
      if (datosEnsayo.claseProteccion === "Clase I") {
        setFigura("Figura 7-a.JPG");
      } else if (datosEnsayo.claseProteccion === "Clase II") {
        setFigura("Figura 7-b.JPG");
      }
    } else if (state.matches("fugaAparato")) {
      setText("Tipo de alimentación: Alimentado desde la red");
      setSubtitle("Corriente de fuga del aparato");
      setFiguraON(false);
      setMedicionON(false);
      setAislarTierra(true);
    } else if (state.matches("figura6a")) {
      setFiguraON(true);
      setFigura("Figura 6-a.JPG");
      setMedicionON(true);
    }
    if (state.matches("mayor1mA")) {
      if (measurements.length > 0) {
        const ultimaMedicion = measurements[measurements.length - 1];
        if (ultimaMedicion.value > 1) {
          setShowPopup1mA(true);
          //Crear popup de aviso de que va al directo
        } else {
          //Enviar resp al flujo pa continuar normalmente
        }
      }
    }
  }, [state]);

  // Ejemplo: obtener la última medición agregada

  // Puedes usar ultimaMedicion donde lo necesites, por ejemplo:
  // <p>Última medición: {ultimaMedicion ? `${ultimaMedicion.value} ${ultimaMedicion.unit}` : "No hay mediciones"}</p>

  return (
    <div>
      <h1>Estado actual: {state.value.toString()}</h1>

      <DoubleCard text={text} subtitle={subtitle}></DoubleCard>
      {figuraON && <Figura figura={figura} />}
      {medicionON && (
        <MeasurementFlowContainer
          unidad={unidad}
          sendParam={sendParam}
        ></MeasurementFlowContainer>
      )}

      <PopupConfirm
        isOpen={aislarTierra}
        title={
          "Se puede aislar de tierra el aparato, excepto el CONDUCTOR DE TIERA DE PROTECCIÓN del CORDÓN DE ALIMENTACIÓN?"
        }
        message={
          "En caso de respeusta afirmativa, se procede con el MÉTODO DIRECTO, por el contrario, se continúa con el MÉTODO ALTERNATIVO."
        }
        confirmText="Sí"
        cancelText="No"
        onConfirm={() => {
          setAislarTierra(false);
          send({ type: "SI" });
        }}
        onCancel={() => {
          setAislarTierra(false);
          send({ type: "NO" });
        }}
      ></PopupConfirm>

      {!state.matches("fin") && (
        <button onClick={() => send({ type: "SIGUIENTE" })}>Siguiente</button>
      )}
    </div>
  );
}
