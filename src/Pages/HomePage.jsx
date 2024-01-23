import Container from "../Components/Shared/Container";

const HomePage = () => {
  return (
    <Container>
      <div className="my-6">
        <div className="">
          <input
            className="px-3 py-2 rounded-md outline-none bg-primary bg-opacity-15 w-72 text-primary font-semibold"
            placeholder="Search by Title"
            type="text"
          />
        </div>
        {/* Houses  */}
        <div className=""></div>
      </div>
    </Container>
  );
};

export default HomePage;
