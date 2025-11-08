const baseClasses =
  'w-full rounded border border-slate-300 px-3 py-2 text-sm focus:border-blue-600 focus:ring-2 focus:ring-blue-200';

const FormField = ({
  label,
  name,
  value,
  onChange,
  type = 'text',
  options = [],
  required = false,
  placeholder,
  disabled = false,
}) => {
  return (
    <label className="flex flex-col gap-1 text-sm text-slate-700">
      <span className="font-medium">{label}</span>
      {type === 'select' ? (
        <select
          name={name}
          value={value}
          onChange={onChange}
          required={required}
          disabled={disabled}
          className={`${baseClasses} ${disabled ? 'bg-slate-100 text-slate-500' : ''}`}
        >
          <option value="">Selecione</option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      ) : (
        <input
          name={name}
          value={value}
          onChange={onChange}
          required={required}
          type={type}
          placeholder={placeholder}
          disabled={disabled}
          className={`${baseClasses} ${disabled ? 'bg-slate-100 text-slate-500' : ''}`}
        />
      )}
    </label>
  );
};

export default FormField;
