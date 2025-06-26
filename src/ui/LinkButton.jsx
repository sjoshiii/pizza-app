import { Link, useNavigate } from "react-router-dom";

export default function LinkButton({ children, to }) {
  const navigate = useNavigate();

  // Define a base class for the link button
  const baseClass =
    "text-sm font-semibold text-accent1 hover:text-accent2 hover:underline transition-colors duration-200";

  if (to === "-1") {
    return (
      <button
        onClick={() => navigate(-1)}
        className={baseClass}
        aria-label="Go back"
      >
        {children}
      </button>
    );
  }

  return (
    <Link to={to} className={baseClass}>
      {children}
    </Link>
  );
}
