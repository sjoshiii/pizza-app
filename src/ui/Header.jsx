import { Link } from "react-router-dom";
import SearchOrder from "../features/order/SearchOrder";
import Username from "../features/user/Username";

export default function Header() {
  return (
    <header className="flex items-center justify-between bg-[#ffc300] px-4 py-3 uppercase border-b border-[#001d3d] sm:px-6">
      <Link to="/" className="tracking-widest text-[#000814] text-lg font-bold">
        Cheezy Cart
      </Link>
      <SearchOrder />
      <Username />
    </header>
  );
}
