import '../styles/Button.css';

const Button = ({ onClick, children, typeInfo }) => {
  // Apply the "btn" class for consistent styling
  return <button type={typeInfo} onClick={onClick} className="btn">{children}</button>;
};

export default Button;