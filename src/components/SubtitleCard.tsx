type SubtitleCardProps = {
  subtitle: string;
};

export default function SubtitleCard({ subtitle }: SubtitleCardProps) {
  return (
    <div className="mb-1">
      <h1 className="mx-1 bg-primary-subtitlecard text-center text-xl p-2 rounded">
        {subtitle}
      </h1>
    </div>
  );
}
