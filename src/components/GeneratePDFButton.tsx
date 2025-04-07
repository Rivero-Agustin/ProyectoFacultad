"use client";

import { useState } from "react";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import { useDataContext } from "@/context/DataContext";

const GeneratePDFButton = () => {
  const { measurements } = useDataContext();
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);

  const generatePDF = () => {
    if (measurements.length === 0) {
      alert("No hay datos para generar el PDF");
      return;
    }

    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text("Informe de Mediciones", 20, 20);

    const tableColumn = ["Indice", "Medición", "Valor"];
    const tableRows = measurements.map((m) => {
      return [m.indexType, m.type, m.value.toFixed(2) + m.unit];
    });

    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 30,
    });

    // Convertir a Blob y generar URL para previsualización
    const pdfBlob = doc.output("blob");
    const pdfUrl = URL.createObjectURL(pdfBlob);
    setPdfUrl(pdfUrl);
  };

  return (
    <div className="flex flex-col items-center">
      <button
        onClick={generatePDF}
        className="bg-green-500 text-white p-2 rounded-lg hover:bg-green-700"
      >
        Generar PDF
      </button>

      {pdfUrl && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-4 rounded-lg shadow-lg w-3/4 h-3/4 flex flex-col">
            <h2 className="text-xl font-bold mb-4">Vista Previa del PDF</h2>
            <iframe src={pdfUrl} className="flex-1 w-full"></iframe>
            <div className="flex justify-between mt-4">
              <button
                onClick={() => setPdfUrl(null)}
                className="bg-red-500 text-white p-2 rounded-lg hover:bg-red-700"
              >
                Cerrar
              </button>
              <a
                href={pdfUrl}
                download="informe_mediciones.pdf"
                className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-700"
              >
                Descargar PDF
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GeneratePDFButton;
