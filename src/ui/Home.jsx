import { useSelector } from "react-redux";
import CreateUser from "../features/user/CreateUser";
import Button from "./Button";

export default function Home() {
  const username = useSelector((store) => store.user.username);

  return (
    <div className="my-12 px-6 text-center sm:my-20 max-w-xl mx-auto">
      <h1 className="mb-6 text-3xl font-extrabold text-dark3 tracking-wide sm:text-4xl">
        Craving pizza?
      </h1>
      <p className="mb-10 text-lg text-dark2 leading-relaxed sm:text-xl">
        Experience the freshest slices, baked to perfection and delivered hot.
        Your perfect pizza journey starts here.
      </p>

      {username === "" ? (
        <CreateUser />
      ) : (
        <Button type="primary" to="/menu" className="px-8 py-4 text-lg rounded-full">
          Continue ordering, {username}!
        </Button>
      )}
    </div>
  );
}
