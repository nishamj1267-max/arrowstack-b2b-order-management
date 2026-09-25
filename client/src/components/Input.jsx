
function Input({
  type = "text",
  placeholder,
  name,
  value,
  onChange,
}) {
  return (
    <input
      className="custom-input"
      type={type}
      placeholder={placeholder}
      name={name}
      value={value}
      onChange={onChange}
    />
  );
}

export default Input;