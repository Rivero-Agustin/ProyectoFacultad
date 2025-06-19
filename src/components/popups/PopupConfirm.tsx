import React from "react";
import { BaseModal } from "./BaseModal";
import { AppButton } from "../AppButton";

type PopupConfirmProps = {
  isOpen: boolean;
  title?: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel: () => void;
};

export default function PopupConfirm({
  isOpen,
  title,
  message,
  confirmText = "Aceptar",
  cancelText = "Cancelar",
  onConfirm,
  onCancel,
}: PopupConfirmProps) {
  return (
    <BaseModal
      isOpen={isOpen}
      onRequestClose={onCancel}
      title={title}
      description={message}
      footer={
        <div className="flex justify-items-stretch gap-20">
          <AppButton variant="buttonRed" onClick={onCancel} className="w-full">
            {cancelText}
          </AppButton>
          <AppButton
            variant="buttonCyan"
            onClick={onConfirm}
            className="w-full"
          >
            {confirmText}
          </AppButton>
        </div>
      }
    ></BaseModal>
  );
}
