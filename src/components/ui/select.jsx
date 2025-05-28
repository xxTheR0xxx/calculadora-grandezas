export function Select({ label, value, options, onChange }) {
  return (
    <div className="flex flex-col">
      <label className="mb-1 font-medium">{label}</label>
      <select value={value} onChange={onChange} className="p-2 border rounded">
        {options.map(op => (
          <option key={op} value={op}>{op}</option>
        ))}
      </select>
    </div>
  );
}