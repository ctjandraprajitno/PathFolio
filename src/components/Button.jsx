const Button = ({ onClick, children, typeInfo }) => {
  return <button type={typeInfo} onClick={onClick}>{children}</button>;
};

export default Button;