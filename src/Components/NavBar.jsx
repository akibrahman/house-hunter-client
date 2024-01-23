import { Link } from "react-router-dom";
import Container from "./Shared/Container";

const NavBar = () => {
  return (
    <div className="bg-primary text-white">
      <Container>
        <nav className="flex items-center justify-between font-medium py-4">
          <div className="">House Hunter</div>
          <div className="flex items-center gap-4">
            <p>Home</p>
            <p>About</p>
            <p>Contact</p>
            <p>Blogs</p>
          </div>
          <div className="">
            <Link to="/login">
              <button className="bg-white text-primary px-4 py-1 rounded-md font-bold duration-300 active:scale-90">
                Login
              </button>
            </Link>
          </div>
        </nav>
      </Container>
    </div>
  );
};

export default NavBar;
