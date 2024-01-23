import { Link } from "react-router-dom";
import Container from "../Components/Shared/Container";
import useAuth from "../Hooks/useAuth";

const DashboardPage = () => {
  const { user, logOut } = useAuth();
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
      <Container>
        <div className="flex gap-4">
          <div className="flex-1 flex flex-col items-center">
            <p className="text-primary text-3xl font-semibold mt-5">Profile</p>
            <img
              className="rounded-full w-56 h-56 my-6"
              src="https://i.ibb.co/K9MC2KR/Linkdin1.jpg"
              alt=""
            />
            <p>{user.name}</p>
            <p>
              Role: {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
            </p>
            <p>E-mail: {user.email}</p>
            <p>Phone no: {user.phone}</p>
            {user?.role == "owner" && (
              <Link to="/add-a-house">
                <button className="mt-5 bg-primary text-white font-semibold px-4 py-2 rounded-full duration-300 active:scale-90">
                  Add New Home
                </button>
              </Link>
            )}
          </div>
          <div className="flex-1 flex justify-center">
            <p className="text-primary text-3xl font-semibold mt-5">
              My Houses
            </p>
          </div>
          <div className="flex-1 flex justify-center">
            <p className="text-primary text-3xl font-semibold mt-5">Bookings</p>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default DashboardPage;
