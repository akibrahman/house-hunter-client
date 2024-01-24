import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Container from "../Components/Shared/Container";
import Loader from "../Components/Shared/Loader";
import useAuth from "../Hooks/useAuth";
import usePublicAxios from "../Hooks/usePublicAxios";

const DetailsPage = () => {
  const { user } = useAuth();
  const { id } = useParams();
  const [open, setOpen] = useState(false);
  const [error, setError] = useState("");
  const axiosInstance = usePublicAxios();
  const { data: house } = useQuery({
    queryKey: ["house", id],
    queryFn: async ({ queryKey }) => {
      const { data } = await axiosInstance.get(`/house/get-one/${queryKey[1]}`);
      return data;
    },
  });
  const { data: booking, refetch: refetchBB } = useQuery({
    queryKey: ["booking", id],
    queryFn: async ({ queryKey }) => {
      const { data } = await axiosInstance.get(
        `/booking/get-one/${queryKey[1]}`
      );
      return data;
    },
  });
  const { data: bookingCount, refetch: refetchBC } = useQuery({
    queryKey: ["bookingCount", user?.email],
    queryFn: async ({ queryKey }) => {
      const { data } = await axiosInstance.get(`/booking/get/${queryKey[1]}`);
      return data;
    },
  });
  console.log("-.-.-", bookingCount);

  const handleBooking = async (e) => {
    e.preventDefault();

    if (error) {
      return;
    }
    console.log(e.target.phone.value);
    const { data } = await axiosInstance.post("/booking/add", {
      ...house,
      renterName: user.name,
      renterEmail: user.email,
      renterPhoneNumber: e.target.phone.value,
    });
    if (data.success) {
      setOpen(false);
      await refetchBC();
      await refetchBB();
      toast.success("Booking Confirmed");
    }
  };
  if (!house || !bookingCount) return <Loader />;
  return (
    <Container className={"my-10 relative"}>
      {open && (
        <div className="fixed w-full h-screen bg-white bg-opacity-30">
          <div className="fixed bg-primary rounded-md top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 p-20">
            <form
              onSubmit={handleBooking}
              className="flex flex-col items-center"
            >
              <input
                className="px-4 py-2 mb-2 rounded-md"
                type="text"
                name="name"
                readOnly
                defaultValue={user.name}
              />
              <input
                className="px-4 py-2 mb-2 rounded-md"
                type="text"
                name="email"
                readOnly
                defaultValue={user.email}
              />
              <input
                className="px-4 py-2 mb-2 rounded-md"
                type="text"
                name="phone"
                onChange={(e) => {
                  const bdPhoneNumberRegex = /^(?:\+88|88)?(01[3-9]\d{8})$/;
                  if (bdPhoneNumberRegex.test(e.target.value)) {
                    setError("");
                  } else {
                    setError("Enter Bangladeshi phone number");
                  }
                }}
              />
              {error && (
                <p className="font-semibold text-red-700">
                  Invalid Phone Number !
                </p>
              )}
              <div className="flex gap-3 mt-5">
                <button
                  // onClick={logOut}
                  className="z-20 text-xl w-32 h-10 rounded-full before:block before:absolute before:inset-0 before:bg-sky-600 before:duration-500 after:duration-500 duration-300 hover:before:skew-y-12 after:block after:absolute after:inset-0 after:bg-white hover:after:-skew-y-12 before:-z-10 after:-z-10 inline-block relative text-primary font-medium"
                >
                  <span>Submit</span>
                </button>
                <button
                  onClick={() => setOpen(false)}
                  className="z-20 text-xl w-32 h-10 rounded-full before:block before:absolute before:inset-0 before:bg-sky-600 before:duration-500 after:duration-500 duration-300 hover:before:skew-y-12 after:block after:absolute after:inset-0 after:bg-white hover:after:-skew-y-12 before:-z-10 after:-z-10 inline-block relative text-primary font-medium"
                >
                  <span>Cancel</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="absolute top-3 right-3">
        {typeof booking == "object" ? (
          <button
            // onClick={() => setOpen(true)}
            className="bg-primary text-white font-semibold px-4 py-2 rounded-md pointer-events-none"
          >
            Alredy Booked
          </button>
        ) : (
          <button
            onClick={() => {
              if (!user) {
                toast.info("Login First to Book");
                return;
              }
              if (user.role == "owner") {
                toast.info("You are not a Renter");
                return;
              }
              if (bookingCount.length >= 2) {
                toast.info("Alredy Booked 2 Houses");
                return;
              }
              setOpen(true);
            }}
            className="bg-primary text-white font-semibold px-4 py-2 rounded-md duration-300 active:scale-90"
          >
            Book Now
          </button>
        )}
      </div>
      <div className="flex gap-10">
        <img src={house.picture} className="rounded-md w-1/2" alt="" />
        <div className="flex flex-col gap-2 text-primary font-semibold text-lg">
          <p className="text-3xl mb-4">{house.name}</p>
          <p>Address: {house.address}</p>
          <p>City: {house.city}</p>
          <p>Availability: {house.availability ? "Yes" : "No"}</p>
          <p>Bedroom(s): {house.bedroom}</p>
          <p>Bathroom(s): {house.bathroom}</p>
          <p>Monthly Rent: {house.rent_per_month} BDT</p>
          <p>Size: {house.size} Sq/Feet</p>
          <p>Posted Date: {new Date(house.date).toDateString()}</p>
          <p>Phone Number: {house.phone_number}</p>
        </div>
      </div>
      <div className="mt-5">
        <p className="mb-1 font-semibold">Description:</p>
        <p>{house.description}</p>
      </div>
    </Container>
  );
};

export default DetailsPage;
