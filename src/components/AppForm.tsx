type AppFormProps = {
  children: React.ReactNode;
  [key: string]: any;
};

export default function AppForm({ children, ...props }: AppFormProps) {
  return (
    <div className="mx-10 bg-gray-700 rounded-lg p-4">
      <form {...props}>{children}</form>
    </div>
  );
}
