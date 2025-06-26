import { useSelector } from "react-redux";

export default function Username() {
  const username = useSelector((store) => store.user.username);

  if (!username) return null; // Hide if no username set

  return (
    <div className="hidden md:block text-sm font-semibold text-dark3 select-none">
      Hello, {username}
    </div>
  );
}
