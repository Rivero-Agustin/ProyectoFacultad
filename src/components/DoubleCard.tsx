type DoubleCardProps = {
  text: string;
  subtitle: string;
};

export default function DoubleCard({ text, subtitle }: DoubleCardProps) {
  return (
    <div className="grid grid-cols-3 mb-1 gap-1 mx-1">
      <h1 className="bg-primary-subtitlecard text-center text-lg p-2 rounded">
        {text}
      </h1>
      <h1 className="bg-primary-subtitlecard text-center text-lg p-2 rounded col-span-2 ">
        {subtitle}
      </h1>
    </div>
  );
}
