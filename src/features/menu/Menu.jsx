import { useLoaderData } from "react-router-dom";
import { getMenu } from "../../services/apiRestaurant";
import MenuItem from "./MenuItem";

function Menu() {
  const menu = useLoaderData();

  if (!menu || menu.length === 0) {
    return (
      <p className="text-center text-dark2 py-10">
        No pizzas available right now. Please check back later!
      </p>
    );
  }

  return (
    <ul className="divide-y divide-dark2 px-4 sm:px-6 max-w-3xl mx-auto">
      {menu.map((pizza) => (
        <MenuItem pizza={pizza} key={pizza.id} />
      ))}
    </ul>
  );
}

export async function loader() {
  try {
    const menuDetails = await getMenu();
    return menuDetails;
  } catch (error) {
    console.error("Failed to load menu:", error);
    return [];
  }
}

export default Menu;
