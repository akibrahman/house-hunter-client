import { Link, Navigate } from "react-router-dom";
import useAuth from "../Hooks/useAuth";

const AddAHousePage = () => {
  const { user, logOut } = useAuth();
  if (user.role != "owner") return <Navigate to={"/"}></Navigate>;
  return (
    <div>
      <div className="bg-primary py-4 flex items-center justify-between px-10">
        <Link to="/">
          <button className="z-20 text-xl w-28 h-10 rounded-full before:block before:absolute before:inset-0 before:bg-sky-600 before:duration-500 after:duration-500 duration-300 hover:before:skew-y-12 after:block after:absolute after:inset-0 after:bg-white hover:after:-skew-y-12 before:-z-10 after:-z-10 inline-block relative text-primary font-medium">
            <span>Home</span>
          </button>
        </Link>
        <p className="text-center text-white text-3xl font-semibold">
          Dashboard
        </p>
        <button
          onClick={logOut}
          className="z-20 text-xl w-28 h-10 rounded-full before:block before:absolute before:inset-0 before:bg-sky-600 before:duration-500 after:duration-500 duration-300 hover:before:skew-y-12 after:block after:absolute after:inset-0 after:bg-white hover:after:-skew-y-12 before:-z-10 after:-z-10 inline-block relative text-primary font-medium"
        >
          <span>Log Out</span>
        </button>
      </div>
      <p>Add New House</p>
    </div>
  );
};

export default AddAHousePage;
