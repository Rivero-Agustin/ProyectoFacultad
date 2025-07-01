"use client";
import { useMachine } from "@xstate/react";
import { flujoEnsayoMachine } from "../../utils/flowTest";
import { useEffect, useState, useRef } from "react";
import { useDataContext } from "@/context/DataContext";
import Parrafo from "../Parrafo";
import Figura from "../Figura";
import { stat } from "fs";
import DoubleCard from "../DoubleCard";
import MeasurementFlowContainer from "../MeasurementFlowContainer";
import PopupConfirm from "../popups/PopupConfirm";
import { set } from "date-fns";
import { AppButton } from "../AppButton";
import PopupSimple from "../popups/PopupSimple";
import AppForm from "../AppForm";
import AppInput from "../AppInput";

export default function WizardFlowTest() {
  const { datosEnsayo, measurements } = useDataContext();
  const [state, send] = useMachine(flujoEnsayoMachine);
  const [figuraON, setFiguraON] = useState(true);
  const [figura, setFigura] = useState("");
  const [aislarTierra, setAislarTierra] = useState(false);
  const [textoFichaON, setTextoFichaON] = useState(false);
  const [posicionFicha, setPosicionFicha] = useState("");
  const [disabledSave, setDisabledSave] = useState(false);
  const isFirstRender1 = useRef(true);
  const isFirstRender2 = useRef(true);

  // Cambia las variables a estados
  const [text, setText] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [unidad, setUnidad] = useState("mA");
  const [sendParam, setSendParam] = useState("");
  const [medicionON, setMedicionON] = useState(true);
  const [showPopup1mA, setShowPopup1mA] = useState(false);
  const [disabledNext, setDisabledNext] = useState(true);
  const [msgPopup1mA, setMsgPopup1mA] = useState("");
  const [showPopupRepetirFicha, setShowPopupRepetirFicha] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPosicionFicha(e.target.value);
  };

  const handleMedicionGuardada = () => {
    setDisabledNext(false); // Habilita el botón Siguiente
  };

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
    }
    if (state.matches("figura6a") || state.matches("figura6b")) {
      setSubtitle("Corriente de fuga del aparato - Método alternativo");
      setFiguraON(true);
      // La unica diferencia entre figura6a y figura6b es la figura a mostrar (proximamente tambien indicaciones de coenxion)
      state.matches("figura6a") && setFigura("Figura 6-a.JPG");
      state.matches("figura6b") && setFigura("Figura 6-b.JPG");

      setMedicionON(true);
      setSendParam("2");
    }

    if (state.matches("mayor1mA")) {
      if (measurements.length > 0) {
        const ultimaMedicion = measurements[measurements.length - 1];
        if (ultimaMedicion.value > 1) {
          setMsgPopup1mA(
            "El valor de la medición es mayor a 1 mA, por lo que se debe continuar con el MÉTODO DIRECTO."
          );
          setShowPopup1mA(true);
          //Crear popup de aviso de que va al directo
        } else {
          setMsgPopup1mA(
            "El valor de la medición es menor o igual a 1 mA, por lo que se continúa normalmente con la medición de corriente de fuga de partes aplicables."
          );
          setShowPopup1mA(true);

          //Enviar resp al flujo pa continuar normalmente
        }
      }
    }
    if (state.matches("figura7a") || state.matches("figura7b")) {
      setDisabledSave(true);
      setPosicionFicha("");
      setFiguraON(true);
      setMedicionON(true);
      setTextoFichaON(true);
      setSendParam("1");
      setSubtitle("Corriente de fuga del aparato - Método directo");

      state.matches("figura7a") && setFigura("Figura 7-a.JPG");
      state.matches("figura7b") && setFigura("Figura 7-b.JPG");
    }
    if (state.matches("repetirFicha")) {
      setShowPopupRepetirFicha(true);
      setMedicionON(false);
      setFiguraON(false);
    }
  }, [state, measurements]);

  useEffect(() => {
    if (state.matches("figura7a") || state.matches("figura7b")) {
      if (posicionFicha === "") {
        setDisabledSave(true);
      } else {
        setDisabledSave(false);
      }
    }
  }, [posicionFicha]);

  // Ejemplo: obtener la última medición agregada

  // Puedes usar ultimaMedicion donde lo necesites, por ejemplo:
  // <p>Última medición: {ultimaMedicion ? `${ultimaMedicion.value} ${ultimaMedicion.unit}` : "No hay mediciones"}</p>

  return (
    <div>
      <h1>Estado actual: {state.value.toString()}</h1>

      <DoubleCard text={text} subtitle={subtitle}></DoubleCard>
      {textoFichaON && (
        <div className="flex items-center justify-center">
          <Parrafo>
            Esta medición se debe realizar para todas las posiciones posibles de
            la FICHA DE RED.
          </Parrafo>
          <AppForm>
            <label htmlFor="posicionFicha">
              Posicion actual de la ficha de red
            </label>
            <AppInput
              type="string"
              name="posicionFicha"
              id="posicionFicha"
              onChange={handleChange}
              value={posicionFicha}
            />
          </AppForm>
        </div>
      )}
      {figuraON && <Figura figura={figura} />}
      {medicionON && (
        <MeasurementFlowContainer
          unidad={unidad}
          sendParam={sendParam}
          disabledSave={disabledSave}
          onGuardar={handleMedicionGuardada}
          textoFicha={posicionFicha}
        ></MeasurementFlowContainer>
      )}

      <PopupConfirm
        isOpen={aislarTierra}
        title={
          "Se puede aislar de tierra el aparato, excepto el CONDUCTOR DE TIERA DE PROTECCIÓN del CORDÓN DE ALIMENTACIÓN?"
        }
        message={
          "En caso de respuesta afirmativa, se procede con el MÉTODO DIRECTO, por el contrario, se continúa con el MÉTODO ALTERNATIVO."
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

      <PopupSimple
        isOpen={showPopup1mA}
        onClose={() => {
          setShowPopup1mA(false);
          send({ type: "SI" });
        }}
        title={"Aviso"}
        message={msgPopup1mA}
      ></PopupSimple>

      <PopupConfirm
        isOpen={showPopupRepetirFicha}
        title={
          "Se debe repetir la medición para todas las posiciones posibles de la FICHA DE RED"
        }
        message={
          "Falta realizar la medición en alguna posición de la ficha de red?"
        }
        onConfirm={() => {
          setShowPopupRepetirFicha(false);
          send({ type: "SI" });
        }}
        confirmText="Sí"
        onCancel={() => {
          setShowPopupRepetirFicha(false);
          send({ type: "NO" });
        }}
        cancelText="No"
      ></PopupConfirm>

      {!state.matches("fin") && (
        <AppButton
          onClick={() => {
            send({ type: "SIGUIENTE" });
            setDisabledNext(true);
            console.log(measurements);
          }}
          disabled={disabledNext}
        >
          Siguiente
        </AppButton>
      )}
    </div>
  );
}
