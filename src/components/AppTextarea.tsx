type AppTextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>;

export default function AppTextarea(props: AppTextareaProps) {
  return (
    <textarea
      className="w-full rounded border border-gray-300 p-2  focus:outline-none focus:ring-1 focus:ring-cyan-500  bg-gray-100 text-gray-900"
      {...props}
    />
  );
}
