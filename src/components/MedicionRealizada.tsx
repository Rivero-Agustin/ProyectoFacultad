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
      <div className={`${className} flex flex-col items-center justify-center`}>
        <p className="w-8 h-8 text-green-600 text-xl border-white border-2 rounded bg-zinc-800 text-center px-1">
          {realizada && "✔"}
        </p>
      </div>
    </>
  );
}
