export function Card({ children }) {
  return <div className="border rounded-xl shadow p-4 bg-gray-50">{children}</div>;
}

export function CardContent({ children }) {
  return <div className="text-lg">{children}</div>;
}