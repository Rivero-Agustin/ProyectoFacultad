"use client";

import { useRouter, usePathname } from "next/navigation";
import { useState } from "react";
import { useDataContext } from "@/context/DataContext";
import CustomModal from "@/components/CustomModal";
import { PDFViewer, PDFDownloadLink, pdf } from "@react-pdf/renderer";
import PDFReport from "@/components/PDFReport";
import PopupAgregarComentario from "./PopupAgregarComentario";
import { AppButton } from "./AppButton";
import { formatearFecha } from "@/utils/formatearFecha";
import { obtenerHorario } from "@/utils/obtenerHorario";
import { toast } from "sonner";

const GeneratePDFButton = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { measurements, datosEnsayo, clearMeasurements } = useDataContext();
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

  const handleFinalizar = () => {
    setShowPreview(false);
    clearMeasurements();
    router.push("/");
    toast.info("Ensayo finalizado.");
  };

  return (
    <div className="flex flex-col items-center">
      <AppButton onClick={handleGeneratePDF} variant="saveButton">
        Generar informe
      </AppButton>

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
              <AppButton
                onClick={() => setShowPreview(false)}
                variant="buttonRed"
              >
                Cerrar
              </AppButton>

              <AppButton variant="buttonCyan" onClick={handleFinalizar}>
                Finalizar ensayo
              </AppButton>

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
                className="m-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Descargar PDF
              </PDFDownloadLink>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GeneratePDFButton;
