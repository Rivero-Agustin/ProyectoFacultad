import Image from "next/image";

type FiguraProps = {
  figura: string;
};

export default function Figura({ figura }: FiguraProps) {
  return (
    <div className="relative mx-auto my-4" style={{ width: 500, height: 200 }}>
      <Image
        src={`/${figura}`}
        alt="Figura"
        fill
        style={{ objectFit: "contain" }}
        className="flex"
      />
    </div>
  );
}
