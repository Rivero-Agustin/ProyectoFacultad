"use client";
import Modal from "react-modal";
import { useEffect } from "react";

interface BaseModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  title?: string;
  description?: string; // Nueva prop para descripción
  children?: React.ReactNode;
  footer?: React.ReactNode;
  contentClassName?: string;
  overlayClassName?: string;
  contentStyle?: React.CSSProperties;
  overlayStyle?: React.CSSProperties;
  contentLabel?: string;
}

export const BaseModal = ({
  isOpen,
  onRequestClose,
  title,
  description,
  children,
  footer,
  contentClassName = "",
  overlayClassName = "",
  contentStyle,
  overlayStyle,
  contentLabel = "Modal",
}: BaseModalProps) => {
  useEffect(() => {
    if (typeof window !== "undefined") {
      Modal.setAppElement(document.body); // Esto es importante para la accesibilidad en Next.js
    }
  }, []);

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel={contentLabel}
      style={{
        content: {
          top: "50%",
          left: "50%",
          right: "auto",
          bottom: "auto",
          marginRight: "-50%",
          transform: "translate(-50%, -50%)",
          padding: "2rem",
          borderRadius: "1rem",
          ...contentStyle,
        },
        overlay: {
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          ...overlayStyle,
        },
      }}
      className={contentClassName}
      overlayClassName={overlayClassName}
    >
      {title && (
        <h2 className="text-black text-xl font-bold mb-2 text-center">
          {title}
        </h2>
      )}
      {description && (
        <p className="text-base text-gray-700 text-center mb-4">
          {description}
        </p>
      )}
      <div>{children}</div>
      {footer && <div className="mt-4">{footer}</div>}
    </Modal>
  );
};
