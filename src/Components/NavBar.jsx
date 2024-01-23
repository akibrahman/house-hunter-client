import { Link } from "react-router-dom";
import Container from "./Shared/Container";

const NavBar = () => {
  console.log(Number.MAX_SAFE_INTEGER.toString());
  return (
    <div className="bg-primary text-white">
      <Container>
        <nav className="flex items-center justify-between font-medium py-4">
          <div className="text-2xl">House Hunter</div>
          <div className="flex items-center gap-4">
            <p>Home</p>
            <p>About</p>
            <p>Contact</p>
            <p>Blogs</p>
          </div>
          <div className="">
            <Link to="/login">
              {/* <button className="bg-white text-primary px-4 py-1 rounded-md font-bold duration-300 active:scale-90">
                Login
              </button> */}
              <button className="z-20 text-xl w-28 h-10 rounded-full before:block before:absolute before:inset-0 before:bg-sky-600 before:duration-500 after:duration-500 duration-300 hover:before:skew-y-12 after:block after:absolute after:inset-0 after:bg-white hover:after:-skew-y-12 before:-z-10 after:-z-10 inline-block relative text-primary font-medium">
                <span>Login</span>
              </button>
            </Link>
          </div>
        </nav>
      </Container>
    </div>
  );
};

export default NavBar;
