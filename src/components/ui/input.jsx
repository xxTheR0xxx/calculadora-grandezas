export function Input({ label, value, onChange }) {
  return (
    <div className="flex flex-col">
      <label className="mb-1 font-medium">{label}</label>
      <input value={value} onChange={onChange} type="number" className="p-2 border rounded" />
    </div>
  );
}