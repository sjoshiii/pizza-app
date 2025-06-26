/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useDispatch, useSelector } from "react-redux";
import Button from "../../ui/Button";
import { formatCurrency } from "../../utils/helpers";
import { addItem } from "../cart/cartSlice";
import DeleteItem from "../cart/DeleteItem";
import UpdateItemQuantity from "../cart/UpdateItemQuantity";

function MenuItem({ pizza }) {
  const dispatch = useDispatch();
  const { id, name, unitPrice, ingredients, soldOut, imageUrl } = pizza;
  const currentQuantity = useSelector(
    (store) =>
      store.cart.cart.find((item) => item.pizzaId === id)?.quantity ?? 0,
  );
  const isInCart = currentQuantity > 0;

  function handleAddToCart() {
    const newItem = {
      pizzaId: id,
      name,
      quantity: 1,
      unitPrice,
      totalPrice: unitPrice * 1,
    };
    dispatch(addItem(newItem));
  }

  return (
    <li
      className={`flex flex-col sm:flex-row gap-4 p-5 rounded-lg shadow-md bg-white border border-dark3 transition hover:shadow-xl ${
        soldOut ? "opacity-60 grayscale pointer-events-none" : ""
      }`}
    >
      <img
        src={imageUrl}
        alt={name}
        className="w-full sm:w-36 h-28 sm:h-32 object-cover rounded-lg flex-shrink-0"
      />

      <div className="flex flex-col justify-between flex-grow">
        <div>
          <h3 className="text-xl font-bold text-dark3 mb-1">{name}</h3>
          <p className="text-sm italic text-dark2 mb-3">
            {ingredients.join(", ")}
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3">
          {!soldOut ? (
            <p className="text-lg font-semibold text-accent1">
              {formatCurrency(unitPrice)}
            </p>
          ) : (
            <p className="text-sm font-semibold uppercase text-dark2 tracking-wide">
              Sold Out
            </p>
          )}

          {isInCart ? (
            <div className="flex items-center gap-4">
              <UpdateItemQuantity pizzaId={id} currentQuantity={currentQuantity} />
              <DeleteItem pizzaId={id} />
            </div>
          ) : (
            !soldOut && (
              <Button type="small" onClick={handleAddToCart}>
                Add to cart
              </Button>
            )
          )}
        </div>
      </div>
    </li>
  );
}

export default MenuItem;
