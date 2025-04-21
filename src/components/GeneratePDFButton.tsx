"use client";

import { useState } from "react";
import { useDataContext } from "@/context/DataContext";
import CustomModal from "@/components/CustomModal";
import { PDFViewer, PDFDownloadLink } from "@react-pdf/renderer";
import PDFReport from "@/components/PDFReport";

const GeneratePDFButton = () => {
  const { measurements, datosEnsayo } = useDataContext();
  const [showModal, setShowModal] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  const handleGeneratePDF = () => {
    if (measurements.length === 0) {
      setShowModal(true);
      return;
    }

    setShowPreview(true);
  };

  return (
    <div className="flex flex-col items-center">
      <button
        onClick={handleGeneratePDF}
        className="bg-green-500 text-white p-2 rounded-lg hover:bg-green-700"
      >
        Generar PDF
      </button>

      <CustomModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title="Error"
        message="No se han guardado mediciones"
      />

      {showPreview && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-4 rounded-lg shadow-lg w-3/4 h-3/4 flex flex-col">
            <h2 className="text-xl font-bold mb-4 text-gray-900">
              Vista previa del PDF
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
                fileName="informe_mediciones.pdf"
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
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
