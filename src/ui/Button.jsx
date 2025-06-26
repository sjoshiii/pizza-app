import { Link } from "react-router-dom";

export default function Button({ children, disabled, to, type = "primary", onClick }) {
  const base =
    "inline-block rounded-full font-semibold uppercase tracking-wide transition-colors duration-300 focus:outline-none focus:ring-offset-2 disabled:cursor-not-allowed";

  const styles = {
    primary: `${base} bg-accent1 text-dark1 hover:bg-accent2 focus:ring-accent2 px-4 py-3 md:px-6 md:py-4 text-sm`,
    small: `${base} bg-accent1 text-dark1 hover:bg-accent2 focus:ring-accent2 px-4 py-2 md:px-5 md:py-2.5 text-xs`,
    round: `${base} bg-accent1 text-dark1 hover:bg-accent2 focus:ring-accent2 px-2.5 py-1 md:px-3.5 md:py-2 text-sm`,
    secondary: `${base} border-2 border-dark2 text-dark1 hover:bg-dark2 hover:text-white focus:ring-dark2 px-4 py-2.5 md:px-6 md:py-3.5 text-sm`,
  };

  const className = styles[type] || styles.primary;

  if (to) {
    return (
      <Link to={to} className={className}>
        {children}
      </Link>
    );
  }

  return (
    <button className={className} disabled={disabled} onClick={onClick}>
      {children}
    </button>
  );
}
