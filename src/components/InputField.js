const InputField = ({ placeholder,label, name, type, value, onChange, errorMessage, showLabel = false, ...props }) => (
  <div className="flex flex-col gap-1">
    {showLabel && (
      <label htmlFor={name} className="block text-sm font-medium text-black">
        {label}
      </label>
    )}

    <div className="flex flex-col items-start">
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required
        className="p-3 bg-[#F3F4F6] text-black block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        {...props}
      />
      {errorMessage && <div className="text-red-500 mt-1">{errorMessage}</div>}
    </div>
  </div>
);

export default InputField;
