export const Input = ({value, type, placeholder, onChange}) => {
    return (
        <input
          className={value !== "" ? "has-value input" : "input"}
          type={type}
          value={value}
          placeholder={placeholder}
          onChange={onChange}
        />
      );
  };