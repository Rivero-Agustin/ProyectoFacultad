// components/PopupSimple.tsx
"use client";

import { AppButton } from "../AppButton";
import { BaseModal } from "./BaseModal";

type PopupSimpleProps = {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  message: string;
  className?: string;
};

export default function PopupSimple({
  isOpen,
  onClose,
  title,
  message,
}: PopupSimpleProps) {
  return (
    <BaseModal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Mensaje"
      title={title}
      description={message}
      footer={
        <div className="flex justify-center">
          <AppButton onClick={onClose} variant="default">
            Aceptar
          </AppButton>
        </div>
      }
    ></BaseModal>
  );
}
