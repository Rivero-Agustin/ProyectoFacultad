"use client";
import MeasurementFlowContainer from "@/components/MeasurementFlowContainer";
import Parrafo from "@/components/Parrafo";
import TitleCard from "@/components/TitleCard";
import Image from "next/image";

import { useEffect, useState } from "react";
import { useDataContext } from "@/context/DataContext";
import { AppButton } from "@/components/AppButton";
import { useRouter } from "next/navigation"; // Importa el hook useRouter de next/navigation

export default function Aislamiento() {
  const { datosEnsayo } = useDataContext();
  const [paso, setPaso] = useState(0);
  const [parte1, setParte1] = useState("la PARTE ALIMENTADA DESDE LA RED");
  const [parte2, setParte2] = useState("la TIERRA DE PROTECCIÓN");
  const [valorLimite, setValorLimite] = useState("1 MΩ");
  const [figura, setFigura] = useState("Figura 3-a.JPG");
  const router = useRouter(); // Inicializa el router
  const [indicePaso, setIndicePaso] = useState(0);
  const [paso7, setPaso7] = useState(false);
  let vectorPasos: number[] = [];

  // Define vectorPasos fuera del useEffect para que esté disponible en handleClick
  if (datosEnsayo.claseProteccion === "Clase I") {
    vectorPasos = [1, 2, 3, 4, 5, 6, 99];
  } else if (datosEnsayo.claseProteccion === "Clase II") {
    vectorPasos = [2, 3, 4, 6, 7, 99];
  }
  // El paso 99 redirige a la página de fuga de equipo

  // Efecto para establecer el paso inicial basado en la clase de protección
  //Para clase I inicia en paso 1
  // Para clase II inicia en paso 2
  useEffect(() => {
    setPaso(vectorPasos[0]); // Establece el paso inicial
  }, []);

  // Cuando se modifica el paso, actualiza las variables de estado correspondientes y la figura a mostrar
  useEffect(() => {
    switch (paso) {
      case 2:
        setParte1("la PARTE ALIMENTADA DESDE LA RED");
        setParte2("PARTES CONDUCTORAS ACCESIBLES (no puestas a tierra)");
        setValorLimite("7 MΩ");
        setFigura("Figura 3-b.JPG");
        break;
      case 3:
        setParte1("la PARTE ALIMENTADA DESDE LA RED");
        setParte2(
          "PARTES APLICABLES con todas las PARTES APLICABLES DEL TIPO B a ensayar conectadas juntas"
        );
        if (datosEnsayo.claseProteccion === "Clase I") {
          setValorLimite("2 MΩ");
        } else if (datosEnsayo.claseProteccion === "Clase II") {
          setValorLimite("7 MΩ");
        }
        setFigura("Figura 4.JPG");
        break;
      case 4:
        setParte1("la PARTE ALIMENTADA DESDE LA RED");
        setParte2(
          "PARTES APLICABLES con todas las PARTES APLICABLES DEL TIPO F a ensayar conectadas juntas"
        );
        setValorLimite("70 MΩ");
        setFigura("Figura 4.JPG");
        break;
      case 5:
        setParte1(
          "las PARTES APLICABLES DEL TIPO F que hacen una conexión al paciente"
        );
        setParte2("la TIERRA DE PROTECCIÓN");
        setValorLimite("70 MΩ");
        setFigura("Figura 5-a.JPG");
        break;
      case 6:
        setParte1(
          "las PARTES APLICABLES DEL TIPO F que hacen una conexión al paciente"
        );
        setParte2(
          "las PARTES CONDUCTORAS ACCESIBLES (que no están puestas a tierra)"
        );
        setValorLimite("70 MΩ");
        setFigura("Figura 5-b.JPG");
        break;
      case 7:
        setParte1("las PARTES APLICABLES DEL TIPO F");
        setParte2("la TIERRA FUNCIONAL");
        setPaso7(true);
        // Ver que acá hay que sacar el valor limite y la figura
        break;
      case 99:
        router.push("/mediciones/corrientesfuga");
        break;
    }
  }, [paso]);

  // Al hacer click, se incrementa el paso
  const handleClick = () => {
    //  React programa el cambio de estado para el próximo render
    setIndicePaso((prev) => prev + 1);
    setPaso(vectorPasos[indicePaso + 1]);
    // Por eso se suma 1 a indicePaso, porque todavia no se actualizó
    // Esto es una consecuencia del funcionamiento asíncrono de los estados en React
  };

  return (
    <>
      <TitleCard title="Resistencia de Aislación" />

      <Parrafo>
        El dispositivo es de{" "}
        <span className="font-bold">{datosEnsayo.claseProteccion}</span>
      </Parrafo>

      <Parrafo>
        Se mide la resistencia entre {parte1} y {parte2}.
      </Parrafo>

      {!paso7 && (
        <>
          <Parrafo>
            El valor de la medición debe ser mayor o igual a {valorLimite}.
          </Parrafo>

          <div
            className="relative mx-auto my-4"
            style={{ width: 500, height: 200 }}
          >
            <Image
              src={`/${figura}`}
              alt="Figura"
              fill
              style={{ objectFit: "contain" }}
              className="flex"
            />
          </div>
        </>
      )}

      <MeasurementFlowContainer unidad="mA" sendParam="5" paso={paso} />

      <AppButton
        className="flex mx-auto"
        variant="buttonCyan"
        onClick={handleClick}
      >
        Siguiente
      </AppButton>
    </>
  );
}
