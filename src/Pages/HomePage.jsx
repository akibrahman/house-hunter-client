import { useQuery } from "@tanstack/react-query";
import MultiRangeSlider from "multi-range-slider-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import Container from "../Components/Shared/Container";
import Pagination from "../Components/Shared/Pagination";
import usePublicAxios from "../Hooks/usePublicAxios";

const HomePage = () => {
  const axiosInstance = usePublicAxios();
  const [title, setTitle] = useState("");
  const [city, setCity] = useState("");
  const [bedroom, setBedroom] = useState("");
  const [bathroom, setBathroom] = useState("");
  const [min, setMin] = useState(10000);
  const [max, setMax] = useState(200000);
  const [page, setPage] = useState(0);

  const { data: houses } = useQuery({
    queryKey: [
      "filtered-houses",
      title,
      city,
      bedroom,
      bathroom,
      min,
      max,
      page,
    ],
    queryFn: async ({ queryKey }) => {
      const { data } = await axiosInstance.get(
        `/house/filtered-houses?title=${queryKey[1]}&city=${queryKey[2]}&bedroom=${queryKey[3]}&bathroom=${queryKey[4]}&min=${queryKey[5]}&max=${queryKey[6]}&page=${queryKey[7]}`
      );
      return data;
    },
  });
  const totalPages = Math.ceil(houses?.countt / 10);
  const pages = [...new Array(totalPages ? totalPages : 0).fill(0)];
  console.log(pages);
  return (
    <Container>
      <div className="my-6">
        <div className="flex items-center justify-between">
          <input
            className="px-3 py-2 rounded-md outline-none bg-primary bg-opacity-15 w-72 text-primary font-semibold"
            placeholder="Search by Title"
            type="text"
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            className="px-3 py-2 rounded-md outline-none bg-primary bg-opacity-15 w-72 text-primary font-semibold"
            placeholder="Search by City"
            type="text"
            onChange={(e) => setCity(e.target.value)}
          />
          <input
            className="px-3 py-2 rounded-md outline-none bg-primary bg-opacity-15 w-56 text-primary font-semibold"
            placeholder="Insert Bedroom Number"
            type="text"
            onChange={(e) => setBedroom(e.target.value)}
          />
          <input
            className="px-3 py-2 rounded-md outline-none bg-primary bg-opacity-15 w-56 text-primary font-semibold"
            placeholder="Insert Bathroom Number"
            type="text"
            onChange={(e) => setBathroom(e.target.value)}
          />
        </div>

        <div className="w-[500px] mx-auto mt-8">
          <MultiRangeSlider
            min={10000}
            minValue={10000}
            max={200000}
            maxValue={200000}
            canMinMaxValueSame={true}
            // onInput={(e: ChangeResult) => {
            //   setMinValue(e.minValue);
            //   setMaxValue(e.maxValue);
            // }}
            onChange={(e) => {
              setMin(e.minValue);
              setMax(e.maxValue);
            }}
            label={false}
            ruler={false}
            style={{ border: "none", boxShadow: "none", padding: "15px 10px" }}
            barLeftColor="#162C46"
            barInnerColor="#162C46"
            barRightColor="#162C46"
            thumbLeftColor="#162C46"
            thumbRightColor="#162C46"
          />
          <div className="flex items-center justify-between">
            <p>Min: {min}</p>
            <p>Max: {max}</p>
          </div>
        </div>
        {/* Houses  */}
        {houses && houses?.houses?.length > 0 ? (
          <div className="grid grid-cols-3 gap-4 mt-10">
            {houses.houses.map((house) => (
              <div key={house._id} className="border py-5 rounded-md">
                <div className="flex justify-center gap-6">
                  <img
                    src={house.picture}
                    className="w-36 h-24 rounded-md"
                    alt=""
                  />
                  <div className="flex flex-col gap-2">
                    <p>{house.name}</p>
                    <p>
                      City:{" "}
                      <span className="text-white bg-primary px-3 py-1 rounded-md">
                        {house.city}
                      </span>
                    </p>
                    <p>
                      Bedroom:{" "}
                      <span className="text-white bg-primary px-3 py-1 rounded-md ml-1">
                        {house.bedroom}
                      </span>
                    </p>
                    <p>
                      bathroom:{" "}
                      <span className="text-white bg-primary px-3 py-1 rounded-md">
                        {house.bathroom}
                      </span>
                    </p>
                  </div>
                </div>
                <div className="flex items-center justify-evenly py-4">
                  <p>
                    Monthly Rent:{" "}
                    <span className="text-white bg-primary px-3 py-1 rounded-md mr-2">
                      {house.rent_per_month}
                    </span>
                    BDT
                  </p>
                  <Link to={`/details/${house._id}`}>
                    <button className="font-semibold text-white bg-primary px-4 py-1 rounded-full">
                      Details
                    </button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>No Result</p>
        )}
        <Pagination
          page={page}
          setPage={setPage}
          pages={pages}
          totalPages={totalPages}
        />
      </div>
    </Container>
  );
};

export default HomePage;
