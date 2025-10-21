import '../styles/Button.css';

function Button({ onClick, children, typeInfo }) {
  return <button type={typeInfo} onClick={onClick} className="btn">{children}</button>;
}

export default Button;