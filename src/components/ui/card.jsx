export function Card({ children }) {
  return <div className="bg-green-800 rounded-lg shadow-md p-4">{children}</div>;
}

export function CardContent({ children, className }) {
  return <div className={className}>{children}</div>;
}