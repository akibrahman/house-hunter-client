import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import DatePicker from "react-datepicker";
import { FaExclamation } from "react-icons/fa";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import Container from "../Components/Shared/Container";
import Loader from "../Components/Shared/Loader";
import useAuth from "../Hooks/useAuth";
import usePublicAxios from "../Hooks/usePublicAxios";
import { base64 } from "../Utils/base64";
import { imageUpload } from "../Utils/imageUpload";
import { makeFile } from "../Utils/makeFile";
const EditAHousePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, logOut } = useAuth();
  const [date, setDate] = useState();
  const [error, setError] = useState();
  const [pic, setPic] = useState();
  const [newPic, setNewPic] = useState();
  const axiosInstance = usePublicAxios();

  const { data: house, refetch } = useQuery({
    queryKey: ["house", id],
    queryFn: async ({ queryKey }) => {
      const { data } = await axiosInstance.get(`/house/get-one/${queryKey[1]}`);
      setPic(data.picture);
      setDate(new Date(data.date));
      return data;
    },
  });

  const addHouse = async (event) => {
    event.preventDefault();
    if (error) {
      return;
    }
    if (!pic) {
      setError("Selecte Image");
      return;
    }
    setError("");

    const form = event.target;

    const newHouse = {
      name: form.name.value,
      address: form.address.value,
      city: form.city.value,
      bedroom: parseInt(form.bedroom.value),
      bathroom: parseInt(form.bathroom.value),
      size: parseInt(form.size.value),
      rent_per_month: parseInt(form.rent.value),
      picture: newPic
        ? await imageUpload(await makeFile(newPic, "House", "image/*"))
        : pic,
      availability: form.availability.value,
      date: new Date(date).toISOString(),
      phone_number: form.phone.value,
      description: form.description.value,
      owner: user.email,
    };
    const { data } = await axiosInstance.post(`/house/update/${id}`, newHouse);

    if (data.success) {
      await refetch();
      alert("Room Updated");
    }
  };
  if (!house) return <Loader />;
  if (user.role != "owner") return <Navigate to={"/"}></Navigate>;
  return (
    <div className="relative">
      {error && (
        <div className="z-50 fixed top-8 left-8">
          <p className="flex items-center gap-1 bg-red-600 bg-opacity-95 text-white px-3 py-1 rounded-md">
            <FaExclamation />
            {error}
          </p>
        </div>
      )}
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
      <p className="text-xl text-primary font-semibold my-4 text-center">
        Add New House - {user.name}
      </p>
      <Container>
        {/* Whole Form  */}
        <form
          onSubmit={addHouse}
          className="py-6 px-3 border border-primary rounded-md flex flex-col gap-8"
        >
          {/* One Row  */}
          <div className="flex items-center justify-between">
            <div className="">
              <label className="w-[160px] inline-block mb-1 font-semibold">
                Name:
              </label>
              <input
                required
                defaultValue={house.name}
                className="px-3 py-2 rounded-md outline-none bg-primary bg-opacity-15"
                type="text"
                name="name"
              />
            </div>
            <div className="">
              <label className="w-[160px] inline-block mb-1 font-semibold">
                Address:
              </label>
              <input
                required
                defaultValue={house.address}
                className="px-3 py-2 rounded-md outline-none bg-primary bg-opacity-15"
                type="text"
                name="address"
              />
            </div>
            <div className="">
              <label className="w-[160px] inline-block mb-1 font-semibold">
                City:
              </label>
              <input
                required
                defaultValue={house.city}
                className="px-3 py-2 rounded-md outline-none bg-primary bg-opacity-15"
                type="text"
                name="city"
              />
            </div>
            <div className="">
              <label className="w-[160px] inline-block mb-1 font-semibold">
                Rent per Month:
              </label>
              <input
                required
                defaultValue={house.rent_per_month}
                className="px-3 py-2 rounded-md outline-none bg-primary bg-opacity-15"
                type="number"
                name="rent"
              />
            </div>
          </div>
          {/* One Row  */}
          <div className="flex items-center justify-between">
            <div className="">
              <label className="w-[160px] inline-block mb-1 font-semibold">
                Bedroom:
              </label>
              <input
                required
                defaultValue={house.bedroom}
                className="px-3 py-2 rounded-md outline-none bg-primary bg-opacity-15"
                type="number"
                name="bedroom"
              />
            </div>
            <div className="">
              <label className="w-[160px] inline-block mb-1 font-semibold">
                Bathroom:
              </label>
              <input
                required
                defaultValue={house.bathroom}
                className="px-3 py-2 rounded-md outline-none bg-primary bg-opacity-15"
                type="number"
                name="bathroom"
              />
            </div>
            <div className="">
              <label className="w-[160px] inline-block mb-1 font-semibold">
                size:
              </label>
              <input
                required
                defaultValue={house.size}
                className="px-3 py-2 rounded-md outline-none bg-primary bg-opacity-15"
                type="number"
                name="size"
              />
            </div>
            <div className="">
              <label className="w-[160px] inline-block mb-1 font-semibold">
                Phone Number:
              </label>
              <input
                required
                defaultValue={house.phone_number}
                onChange={(e) => {
                  const bdPhoneNumberRegex = /^(?:\+88|88)?(01[3-9]\d{8})$/;
                  if (bdPhoneNumberRegex.test(e.target.value)) {
                    setError("");
                  } else {
                    setError("Enter Bangladeshi phone number");
                  }
                }}
                className="px-3 py-2 rounded-md outline-none bg-primary bg-opacity-15"
                type="text"
                name="phone"
              />
            </div>
          </div>
          {/* One Row  */}
          <div className="flex items-center justify-around">
            <div className="flex items-center gap-4">
              <label
                htmlFor="pic"
                className="bg-primary text-white px-4 py-2 rounded-md font-medium text-lg"
              >
                Update Picture
              </label>
              {pic && (
                <img
                  className="w-32 rounded-md"
                  src={newPic ? newPic : pic}
                  alt=""
                />
              )}
              <input
                onChange={async (e) => {
                  const res = await base64(e.target.files[0]);
                  setNewPic(res);
                }}
                className="hidden"
                type="file"
                accept="image/*"
                id="pic"
                name="pic"
              />
            </div>
            <div className="">
              <label className="mr-3 inline-block mb-1 font-semibold">
                Availability:
              </label>
              <select
                defaultValue={house.availability ? "1" : "0"}
                name="availability"
              >
                <option value="1">True</option>
                <option value="0">False</option>
              </select>
            </div>
            <div className="">
              <label className="mr-3 inline-block mb-1 font-semibold">
                Date:
              </label>
              <DatePicker
                readOnly
                selected={date}
                className="px-3 py-2 rounded-md outline-none bg-primary bg-opacity-15 select-none"
                onChange={(date) => {
                  setDate(date);
                  setError("");
                }}
              />
            </div>
          </div>
          {/* One Row  */}
          <div className="flex items-center justify-between w-full">
            <div className="w-full">
              <label className="w-[160px] inline-block mb-1 font-semibold">
                Description:
              </label>
              <br />
              <textarea
                required
                defaultValue={house.description}
                name="description"
                className="w-[100%] h-[150px] rounded-md outline-none bg-primary bg-opacity-15 p-4"
              ></textarea>
            </div>
          </div>
          <button
            // onClick={logOut}
            className="z-20 text-xl w-32 h-10 rounded-full before:block before:absolute before:inset-0 before:bg-sky-600 before:duration-500 after:duration-500 duration-300 hover:before:skew-y-12 after:block after:absolute after:inset-0 after:bg-primary hover:after:-skew-y-12 before:-z-10 after:-z-10 inline-block relative text-white font-medium"
          >
            <span>Update</span>
          </button>
        </form>
      </Container>
    </div>
  );
};

export default EditAHousePage;
