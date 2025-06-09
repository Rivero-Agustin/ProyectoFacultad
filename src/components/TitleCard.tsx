type TitleCardProps = {
  title: string;
};

export default function TitleCard({ title }: TitleCardProps) {
  return (
    <div className="mb-1">
      <h1 className="mx-1 bg-primary-titlecard text-center text-2xl p-2 rounded">
        {title}
      </h1>
    </div>
  );
}
