/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useEffect } from "react";
import { useFetcher, useLoaderData } from "react-router-dom";
import { getOrder } from "../../services/apiRestaurant";
import OrderItem from "./OrderItem";
import UpdateOrder from "./UpdateOrder";
import { calcMinutesLeft, formatCurrency, formatDate } from "../../utils/helpers";

function Order() {
  const order = useLoaderData();
  const fetcher = useFetcher();

  useEffect(() => {
    if (!fetcher.data && fetcher.state === "idle") {
      fetcher.load("/menu");
    }
  }, [fetcher]);

  const {
    id,
    status,
    priority,
    priorityPrice,
    orderPrice,
    estimatedDelivery,
    cart,
  } = order;

  const deliveryIn = calcMinutesLeft(estimatedDelivery);

  return (
    <div className="px-4 py-8 space-y-8 max-w-3xl mx-auto">
      <div className="flex flex-wrap justify-between items-center gap-2">
        <h2 className="text-2xl font-extrabold text-[#001d3d] tracking-wide">
          Order #{id} Status
        </h2>
        <div className="flex flex-wrap gap-2">
          {priority && (
            <span className="rounded-full bg-[#ffd60a] px-3 py-1 text-sm font-semibold uppercase tracking-wider text-[#000814] shadow">
              Priority
            </span>
          )}
          <span className="rounded-full bg-[#003566] px-3 py-1 text-sm font-semibold uppercase tracking-wider text-white shadow">
            {status} Order
          </span>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 bg-[#fff3c4] border border-[#ffc300] rounded-lg px-6 py-4 shadow-sm">
        <p className="font-medium text-[#001d3d]">
          {deliveryIn >= 0
            ? `🚚 Only ${deliveryIn} minutes left until delivery!`
            : "✅ Your pizza should have arrived!"}
        </p>
        <p className="text-sm text-[#003566]">
          (Estimated delivery: {formatDate(estimatedDelivery)})
        </p>
      </div>

      <ul className="divide-y divide-[#e0e0e0] border-y border-[#ccc]">
        {cart.map((item) => {
          const pizza = fetcher.data?.find((el) => el.id === item.pizzaId);
          return (
            <OrderItem
              key={item.pizzaId}
              item={item}
              isLoadingIngredients={fetcher.state === "loading"}
              ingredients={pizza?.ingredients ?? []}
            />
          );
        })}
      </ul>

      <div className="bg-[#fef9e6] px-6 py-5 rounded-lg shadow-sm space-y-2 text-[#001d3d]">
        <p className="text-sm font-medium">
          🍕 Pizza total: {formatCurrency(orderPrice)}
        </p>
        {priority && (
          <p className="text-sm font-medium">
            ⚡ Priority fee: {formatCurrency(priorityPrice)}
          </p>
        )}
        <p className="text-lg font-bold border-t border-[#ffc300] pt-3">
          Total to pay: {formatCurrency(orderPrice + priorityPrice)}
        </p>
      </div>

      {!priority && <UpdateOrder order={order} />}
    </div>
  );
}

export async function loader({ params }) {
  const order = await getOrder(params.id);
  return order;
}

export default Order;
