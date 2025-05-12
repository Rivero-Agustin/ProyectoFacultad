type CardProps = {
  title: string;
  info: string;
};

export default function Card({ title, info }: CardProps) {
  return (
    <div className="flex flex-col bg-primary-card rounded">
      <h1 className="px-2 pt-1">{title}</h1>
      <p className="px-2 bg-primary-card-campo m-2 rounded">{info}</p>
    </div>
  );
}
