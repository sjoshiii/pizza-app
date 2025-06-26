import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { getCartTotalPrice, getCartTotalQuantity } from "./cartSlice";
import { formatCurrency } from "../../utils/helpers";

function CartOverview() {
  const totalCartQuantity = useSelector(getCartTotalQuantity);
  const totalCartPrice = useSelector(getCartTotalPrice);
  const location = useLocation();

  // ⛔ Add "/" to hide cart on homepage
  const hideOnRoutes = ["/", "/cart", "/order/new"];
  const isOrderPage = location.pathname.startsWith("/order/") && location.pathname !== "/order/new";
  const shouldHide = hideOnRoutes.includes(location.pathname) || isOrderPage;

  if (shouldHide || !totalCartQuantity) return null;

  return (
    <>
      {/* Desktop view */}
      <div className="hidden lg:flex fixed top-24 right-6 z-40 flex-col gap-3 bg-white p-4 rounded-xl shadow-xl w-72 border border-gray-200">
        <p className="text-lg font-semibold text-gray-800">
          <span className="block">{totalCartQuantity} pizzas</span>
          <span className="block">{formatCurrency(totalCartPrice)}</span>
        </p>
        <Link
          to="/cart"
          className="mt-2 inline-block text-center bg-yellow-400 hover:bg-yellow-300 text-[#001d3d] font-bold py-2 px-4 rounded transition duration-300"
        >
          Open Cart →
        </Link>
      </div>

      {/* Mobile view */}
      <div className="lg:hidden fixed bottom-4 left-4 right-4 z-50 flex items-center justify-between bg-white px-4 py-3 rounded-lg shadow-md border border-gray-300">
        <p className="text-sm font-medium text-gray-800">
          {totalCartQuantity} pizzas • {formatCurrency(totalCartPrice)}
        </p>
        <Link
          to="/cart"
          className="text-sm bg-yellow-400 hover:bg-yellow-300 text-[#001d3d] font-semibold px-3 py-1.5 rounded transition"
        >
          View Cart →
        </Link>
      </div>
    </>
  );
}

export default CartOverview;
