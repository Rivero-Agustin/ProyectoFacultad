"use client";
import WizardFlowTest from "@/components/flows/WizardFlowTest";
import WizardFlowCorrientes from "@/components/flows/WizardFlowCorrientes";
import TitleCard from "@/components/TitleCard";

export default function FlujoPrueba() {
  return (
    <>
      <TitleCard title="Corrientes de Fuga"></TitleCard>
      {/* <WizardFlowTest></WizardFlowTest> */}
      <WizardFlowCorrientes></WizardFlowCorrientes>
    </>
  );
}
