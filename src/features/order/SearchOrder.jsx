import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SearchOrder() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    if (!query.trim()) return;

    navigate(`/order/${query.trim()}`);
    setQuery("");
  }

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-3">
      <input
        type="search"
        aria-label="Search Order"
        placeholder="Search Order"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="
          rounded-full
          px-6 py-3
          w-64 sm:w-96
          bg-[#ffc300]
          text-[#000814]
          placeholder:text-[#001d3d]
          font-semibold
          text-base
          shadow-lg
          transition-all duration-300
          focus:outline-none
          focus:ring-4
          focus:ring-[#ffd60a]
          caret-[#001d3d]
        "
      />
      <button
        type="submit"
        disabled={!query.trim()}
        className="
          rounded-full
          bg-[#001d3d]
          text-[#ffc300]
          font-semibold
          px-6 py-3
          text-base
          shadow-xl
          hover:bg-[#003566]
          disabled:opacity-50
          disabled:cursor-not-allowed
          transition-colors duration-300
          select-none
        "
      >
        Search
      </button>
    </form>
  );
}
