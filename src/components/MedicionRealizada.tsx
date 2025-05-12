import React from "react";

type MedicionRealizadaProps = {
  realizada: boolean;
  className?: string;
};

export default function MedicionRealizada({
  realizada,
  className,
}: MedicionRealizadaProps) {
  return (
    <>
      <div
        className={`${className} flex flex-col items-center justify-center relative`}
      >
        <p className="w-8 h-8 text-green-aux text-2xl border-primary-border border-2 rounded bg-primary-fondos text-center absolute right-2">
          {realizada && "✔"}
        </p>
      </div>
    </>
  );
}
