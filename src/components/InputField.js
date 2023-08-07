const InputField = ({
  label,
  name,
  type,
  value,
  onChange,
  errorMessage,
  ...props
}) => (
  <div className="mt-4">
    <label htmlFor={name} className="block text-sm font-medium text-white">
      {label}
    </label>
    <div className="flex flex-col items-start">
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        required
        className=" p-1 block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        {...props}
      />
      {errorMessage && <div className="text-red-500 mt-1">{errorMessage}</div>}
    </div>
  </div>
);

export default InputField;
