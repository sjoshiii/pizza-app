/* eslint-disable react/prop-types */
import {
  Form,
  redirect,
  useActionData,
  useNavigation,
} from "react-router-dom";
import { useEffect } from "react";
import { createOrder } from "../../services/apiRestaurant";
import Button from "../../ui/Button";
import { useDispatch, useSelector } from "react-redux";
import { fetchAddress } from "../user/userSlice";
import { clearCart } from "../cart/cartSlice";

// Simple phone number validation
const isValidPhone = (str) => /^\+?\d{10,15}$/.test(str);

function CreateOrder() {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  const formErrors = useActionData();

  const { username, address, position, status, error: errorAddress } =
    useSelector((store) => store.user);
  const cart = useSelector((store) => store.cart.cart);
  const isLoadingAddress = status === "loading";

  // ✅ Clear Redux cart if flagged from order success
  useEffect(() => {
    if (localStorage.getItem("orderSuccess") === "true") {
      dispatch(clearCart());
      localStorage.removeItem("orderSuccess");
    }
  }, [dispatch]);

  return (
    <div className="px-4 py-6 max-w-2xl mx-auto">
      <h2 className="mb-8 text-2xl font-bold text-[#001d3d] uppercase tracking-wide">
        Ready to Order?
      </h2>

      <Form method="POST" className="space-y-6">
        {/* Name */}
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40 font-medium text-[#003566]">Name</label>
          <input
            type="text"
            name="customer"
            required
            defaultValue={username}
            className="input w-full"
          />
        </div>

        {/* Phone */}
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40 font-medium text-[#003566]">Phone Number</label>
          <div className="grow">
            <input
              type="tel"
              name="phone"
              required
              className="input w-full"
              placeholder="+977 98XXXXXXXX"
            />
            {formErrors?.phone && (
              <p className="mt-2 bg-red-100 text-red-700 text-xs p-2 rounded">
                {formErrors.phone}
              </p>
            )}
          </div>
        </div>

        {/* Address */}
        <div className="relative flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40 font-medium text-[#003566]">Address</label>
          <div className="grow">
            <input
              type="text"
              name="address"
              required
              disabled={isLoadingAddress}
              defaultValue={address}
              className="input w-full"
            />
            {status === "error" && (
              <p className="mt-2 bg-red-100 text-red-700 text-xs p-2 rounded">
                {errorAddress}
              </p>
            )}
          </div>
          {/* {!position.latitude && !position.longitude && (
            <span className="absolute right-2 top-1 sm:right-4 sm:top-1">
              <Button
                onClick={(e) => {
                  e.preventDefault();
                  dispatch(fetchAddress());
                }}
                disabled={isLoadingAddress}
                type="small"
              >
                Get Position
              </Button>
            </span>
          )} */}
        </div>

        {/* Priority Checkbox */}
        <div className="flex items-center gap-4">
          <input
            type="checkbox"
            name="priority"
            id="priority"
            className="h-5 w-5 accent-[#ffc300]"
          />
          <label htmlFor="priority" className="font-medium text-[#001d3d]">
            Want to prioritize your order?
          </label>
        </div>

        {/* Cart error */}
        {formErrors?.cart && (
          <p className="mt-2 bg-red-100 text-red-700 text-xs p-2 rounded">
            {formErrors.cart}
          </p>
        )}

        {/* Hidden inputs */}
        <input name="cart" type="hidden" value={JSON.stringify(cart)} />
        <input
          name="position"
          type="hidden"
          value={
            position.latitude && position.longitude
              ? `${position.latitude},${position.longitude}`
              : ""
          }
        />

        <Button disabled={isSubmitting || isLoadingAddress} type="primary">
          {isSubmitting ? "Placing your order..." : "Order Now"}
        </Button>
      </Form>
    </div>
  );
}

export async function action({ request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  const order = {
    ...data,
    cart: JSON.parse(data.cart),
    priority: data.priority === "on",
  };

  const errors = {};
  if (!isValidPhone(order.phone)) {
    errors.phone = "Please enter a valid phone number.";
  }
  if (order.cart.length === 0) {
    errors.cart = "Your cart is empty.";
  }
  if (Object.keys(errors).length > 0) return errors;

  const newOrder = await createOrder(order);

  // Clear localStorage and flag for Redux
  localStorage.removeItem("cart");
  localStorage.setItem("orderSuccess", "true");

  return redirect(`/order/${newOrder.id}`);
}

export default CreateOrder;
