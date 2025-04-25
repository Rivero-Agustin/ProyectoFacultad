"use client";

import { useEffect, useState } from "react";
import { useDataContext } from "@/context/DataContext";
import CustomModal from "@/components/CustomModal";
import { PDFViewer, PDFDownloadLink, pdf } from "@react-pdf/renderer";
import PDFReport from "@/components/PDFReport";
import PopupAgregarComentario from "./PopupAgregarComentario";
import { toast } from "sonner";
import { AppButton } from "./AppButton";
import { saveAs } from "file-saver";
import { formatearFecha } from "@/utils/formatearFecha";
import { getHours } from "date-fns";
import { obtenerHorario } from "@/utils/obtenerHorario";

const GeneratePDFButton = () => {
  const { measurements, datosEnsayo } = useDataContext();
  const [showModal, setShowModal] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [showAgregarComentario, setShowAgregarComentario] = useState(false);

  const handleGeneratePDF = () => {
    //Al hacer click en generatePDFbutton, abre el popup para agregar comentario
    if (measurements.length === 0) {
      setShowModal(true);
      return;
    }
    setShowAgregarComentario(true);
  };

  // const handleDownload = async () => {
  //   const blob = await pdf(
  //     <PDFReport datosEnsayo={datosEnsayo} measurements={measurements} />
  //   ).toBlob();
  //   saveAs(blob, "informe_mediciones.pdf");
  //   toast.success("PDF descargado con éxito", {
  //     description: "El informe se ha descargado correctamente.",
  // //   });
  // };

  return (
    <div className="flex flex-col items-center">
      <button
        onClick={handleGeneratePDF}
        className="bg-green-600 text-white p-2 rounded-lg hover:bg-green-700"
      >
        Generar informe
      </button>

      <CustomModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title="No hay mediciones guardadas"
        message="Para genear el informe se deben realizar mediciones y guardarlas."
      />

      <PopupAgregarComentario
        isOpen={showAgregarComentario}
        onRequestClose={() => setShowAgregarComentario(false)}
        setShowPreview={setShowPreview}
      >
        <p className="text-black">Desea agregar un comentario del ensayo?</p>
      </PopupAgregarComentario>

      {showPreview && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-4 rounded-lg shadow-lg w-3/4 h-3/4 flex flex-col">
            <h2 className="text-xl font-bold mb-4 text-gray-900">
              Vista previa del informe
            </h2>

            {/* Vista previa del PDF */}
            <div className="flex-1 overflow-hidden border border-gray-300">
              <PDFViewer style={{ width: "100%", height: "100%" }}>
                <PDFReport
                  datosEnsayo={datosEnsayo}
                  measurements={measurements}
                />
              </PDFViewer>
            </div>

            <div className="flex justify-between mt-4">
              {/* Botón para cerrar */}
              <button
                onClick={() => setShowPreview(false)}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700"
              >
                Cerrar
              </button>

              {/* Botón para descargar */}
              <PDFDownloadLink
                document={
                  <PDFReport
                    datosEnsayo={datosEnsayo}
                    measurements={measurements}
                  />
                }
                fileName={`informe_iec62353_${formatearFecha(
                  datosEnsayo.fecha
                )}-${obtenerHorario()}.pdf`}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Descargar PDF
              </PDFDownloadLink>
              {/* <AppButton onClick={handleDownload}>Descargar PDF</AppButton> */}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GeneratePDFButton;
