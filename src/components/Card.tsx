type CardProps = {
  title: string;
  info: string;
};

export default function Card({ title, info }: CardProps) {
  return (
    <div className="flex flex-col bg-gray-700 rounded">
      <h1 className="px-2 pt-1">{title}</h1>
      <p className="px-2 bg-gray-600 m-2 rounded">{info}</p>
    </div>
  );
}
