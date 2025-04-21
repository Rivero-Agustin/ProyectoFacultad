import { formatearFecha } from "@/utils/formatearFecha";
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import { Font } from "@react-pdf/renderer";

// Esto debería ir fuera del componente (por única vez)
Font.register({
  family: "NotoSans",
  fonts: [
    { src: "/fonts/NotoSans-Regular.ttf", fontWeight: "normal" },
    { src: "/fonts/NotoSans-Bold.ttf", fontWeight: "bold" },
  ],
});

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontSize: 12,
    fontFamily: "NotoSans",
  },
  title: {
    fontSize: 18,
    marginBottom: 10,
    textAlign: "center",
    fontWeight: "bold",
  },
  section: {
    fontSize: 12,
    marginBottom: 10,
    textAlign: "center",
    border: "1 solid #292929",
  },
  sectionItem1: {
    borderBottom: "1 solid #292929",
    paddingVertical: 5,
  },
  sectionItem2: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  table: {
    marginTop: 10,
    borderTop: "1 solid #292929",
    borderLeft: "1 solid #292929",
    borderRight: "1 solid #292929",
  },
  tableRow: {
    flexDirection: "row",
    borderBottom: "1 solid #292929",
  },
  tableCellHeaderMedicion: {
    flex: 2,
    fontWeight: "bold",
    paddingVertical: 5,
    paddingLeft: 10,
  },
  tableCellHeaderValor: {
    flex: 1,
    fontWeight: "bold",
    borderLeft: "1 solid #292929",
    paddingVertical: 5,
    paddingLeft: 10,
  },
  tableCellMedicion: {
    flex: 2,
    paddingVertical: 5,
    paddingLeft: 10,
  },
  tableCellValor: {
    flex: 1,
    borderLeft: "1 solid #292929",
    paddingVertical: 5,
    paddingLeft: 10,
  },
  comentariosTitle: {
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 5,
  },
  comentarios: {
    border: "1 solid #292929",
    padding: 10,
  },
  footer: {
    position: "absolute",
    fontSize: 10,
    bottom: 20,
    left: 40,
    right: 40,
    textAlign: "center",
    color: "grey",
  },
});

type Props = {
  datosEnsayo: {
    dispositivo: string;
    nombre: string;
    fecha: string;
  };
  measurements: {
    type: string;
    value: number;
    unit: string;
  }[];
};

const PDFReport = ({ datosEnsayo, measurements }: Props) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.title}>
          Informe de Mediciones Eléctricas - IEC 62353
        </Text>

        <View style={styles.section}>
          <Text style={styles.sectionItem1}>
            Dispositivo medido: {datosEnsayo.dispositivo}
          </Text>
          <View style={styles.sectionItem2}>
            <Text>Realizado por: {datosEnsayo.nombre}</Text>
            <Text>Fecha: {formatearFecha(datosEnsayo.fecha)}</Text>
          </View>
        </View>

        <View style={styles.table}>
          <View style={styles.tableRow}>
            <Text style={styles.tableCellHeaderMedicion}>Medición</Text>
            <Text style={styles.tableCellHeaderValor}>Valor</Text>
          </View>

          {measurements.map((m, index) => (
            <View key={index} style={styles.tableRow}>
              <Text style={styles.tableCellMedicion}>{m.type}</Text>
              <Text style={styles.tableCellValor}>
                {m.value.toFixed(2)} {m.unit}
              </Text>
            </View>
          ))}
        </View>

        <Text style={styles.comentariosTitle}>Comentarios del ensayo</Text>
        <Text style={styles.comentarios}>
          El ensayo se realizó de acuerdo a la norma IEC 62353. Lorem ipsum
          dolor sit amet consectetur, adipisicing elit. Inventore iste amet iure
          minus, ad saepe temporibus eos reprehenderit est quo quae aspernatur,
          perferendis alias quas possimus unde vero excepturi nostrum?
        </Text>

        {/* Pie de página */}
        <View style={styles.footer}>
          <Text>
            Ensayo de verificación realizado con el analizador de seguridad
            eléctrica de dispositivos biomédicos de acuerdo a la norma IEC
            62353, desarrollado como proyecto final de Ingeniería Electrónica de
            los alumnos Narbaes y Rivero.
          </Text>
          <Text>
            El ensayo realizado con este dispositivo NO certifica la norma IEC
            62353.
          </Text>
        </View>
      </Page>
    </Document>
  );
};

export default PDFReport;
