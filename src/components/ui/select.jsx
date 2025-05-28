export function Select({ value, onValueChange, children }) {
  return <div className="relative">{children}</div>;
}

export function SelectTrigger({ children }) {
  return <button className="w-full bg-green-100 text-green-900 p-2 rounded">{children}</button>;
}

export function SelectValue({ placeholder }) {
  return <span>{placeholder}</span>;
}

export function SelectContent({ children }) {
  return <div className="absolute z-10 mt-2 w-full bg-white rounded shadow">{children}</div>;
}

export function SelectItem({ value, children }) {
  return <div className="px-4 py-2 hover:bg-green-200 cursor-pointer">{children}</div>;
}