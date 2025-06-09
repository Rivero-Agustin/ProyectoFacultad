type ParrafoProps = {
  children: React.ReactNode;
  className?: string;
};

export default function Parrafo({ children, className }: ParrafoProps) {
  const classes = `m-4 text-justify mx-8 ${className}`;

  return <div className={classes}>{children}</div>;
}
