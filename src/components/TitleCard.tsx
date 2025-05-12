type TitleCardProps = {
  title: string;
};

export default function TitleCard({ title }: TitleCardProps) {
  return (
    <div className="mb-1">
      <h1 className="w-full bg-primary-titlecard text-center text-2xl mx-1  p-2 rounded">
        {title}
      </h1>
    </div>
  );
}
