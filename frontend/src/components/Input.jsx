const Input = ({
  id,
  value,
  label,
  type,
  placeholder = null,
  Logo=null,
  handleChange,
  Toggler = null,
  handleToggle = null,
}) => {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-gray-300">
        {label}
      </label>
      <div className="mt-1 relative rounded-md shadow-sm">
        {Logo && 
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Logo className="h-5 w-5 text-gray-400 " aria-hidden="true" />
        </div>
        }
        <input
          type={type}
          id={id}
          name={id}
          required
          placeholder={placeholder}
          autoComplete="off"
          value={value}
          onChange={handleChange}
          className={`block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm ${Logo ? 'pl-10' : ''}`}
        />
        {Toggler && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
            <Toggler
              className="h-5 w-5 text-gray-400 cursor-pointer"
              aria-hidden="true"
              onClick={handleToggle}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Input;
