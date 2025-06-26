import { useRouteError } from "react-router-dom";
import LinkButton from "./LinkButton";

export default function Error() {
  const error = useRouteError();

  return (
    <div className="flex flex-col items-center justify-start pt-20 min-h-screen bg-[#fff7e6] px-6 text-center gap-6">
  <h1 className="text-5xl font-extrabold text-dark3 mb-2 uppercase tracking-widest drop-shadow-md select-none">
    Something went wrong!
  </h1>
  <p className="text-lg text-dark2 max-w-lg leading-relaxed">
    {error?.data || error?.message || "Unexpected error occurred."}
  </p>
  <LinkButton
  to="/"
  type="primary"
  className="px-8 py-4 text-lg rounded-full shadow-lg hover:shadow-2xl transition-shadow duration-300"
>
  &larr; Go Back
</LinkButton>

</div>


  );
}
