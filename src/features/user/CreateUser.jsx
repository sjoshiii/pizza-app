import { useState } from "react";
import Button from "../../ui/Button";
import { useDispatch } from "react-redux";
import { updateName } from "./userSlice";
import { useNavigate } from "react-router-dom";

export default function CreateUser() {
  const [username, setUsername] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    if (!username.trim()) return;
    dispatch(updateName(username.trim()));
    navigate("/menu");
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col items-center">
      <p className="mb-4 text-base text-dark2 font-medium text-center">
        🍕 Ready to craft your perfect pizza? First, tell us your name:
      </p>

      <input
        type="text"
        placeholder="Enter your name"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="mb-8 w-72 rounded-full border-2 border-dark2 px-4 py-3 text-dark1 placeholder-dark2 focus:outline-none focus:ring-2 focus:ring-accent2 focus:border-accent2 transition"
      />

      {username.trim() !== "" && (
        <Button type="primary" className="px-8 py-3 text-lg rounded-full">
          Start Ordering
        </Button>
      )}
    </form>
  );
}
