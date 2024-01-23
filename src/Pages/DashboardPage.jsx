import { useQuery } from "@tanstack/react-query";
import { FaArrowRight } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { TiEdit } from "react-icons/ti";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import Container from "../Components/Shared/Container";
import Loader from "../Components/Shared/Loader";
import useAuth from "../Hooks/useAuth";
import usePublicAxios from "../Hooks/usePublicAxios";

const DashboardPage = () => {
  const { user, logOut } = useAuth();
  const axiosInstance = usePublicAxios();
  const { data: houses, refetch } = useQuery({
    queryKey: ["houses", user.email],
    queryFn: async ({ queryKey }) => {
      const { data } = await axiosInstance.get(
        `/house/all-houses?email=${queryKey[1]}`
      );
      return data;
    },
  });
  const { data: bookings, refetch: refetchB } = useQuery({
    queryKey: ["myBookings", user.email],
    queryFn: async ({ queryKey }) => {
      const { data } = await axiosInstance.get(`/booking/get/${queryKey[1]}`);
      return data;
    },
  });
  //! Owner
  const { data: booked } = useQuery({
    queryKey: ["myBooked", user.email],
    queryFn: async ({ queryKey }) => {
      const { data } = await axiosInstance.get(
        `/booking/get-booked/${queryKey[1]}`
      );
      return data;
    },
  });
  console.log(">>>>>>>", booked);
  if (!houses || !bookings || !booked) return <Loader />;
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
          {user.role == "owner" ? (
            <div className="flex-1 flex flex-col items-center justify-start">
              <p className="text-primary text-3xl font-semibold mt-5">
                My Houses
              </p>
              <div className="flex flex-col gap-4 w-full mt-6">
                {/* House  */}
                {houses?.map((house) => (
                  <div
                    key={house._id}
                    className="flex flex-col border rounded-md"
                  >
                    <div className="flex items-center justify-around p-4">
                      <img
                        className="w-32 h-20 rounded-md"
                        src={house.picture}
                        alt=""
                      />
                      <p className="font-semibold">{house.name}</p>
                      <p className="font-semibold">
                        {house.rent_per_month} BDT
                      </p>
                    </div>
                    <div className="flex items-center justify-center gap-10 py-5">
                      <Link to={`/edit-a-house/${house._id}`}>
                        <TiEdit className="text-white duration-300 select-none cursor-pointer active:scale-90 bg-orange-600 text-4xl p-2 rounded-full" />
                      </Link>
                      <MdDelete
                        onClick={async () => {
                          Swal.fire({
                            title: "Are you sure?",
                            text: "You won't be able to revert this!",
                            icon: "warning",
                            showCancelButton: true,
                            confirmButtonColor: "#3085d6",
                            cancelButtonColor: "#d33",
                            confirmButtonText: "Yes, delete it!",
                          }).then(async (result) => {
                            if (result.isConfirmed) {
                              const { data } = await axiosInstance.delete(
                                `/house/delete/${house._id}`
                              );
                              if (data.success) {
                                await refetch();
                                Swal.fire({
                                  title: "Deleted!",
                                  text: "Your House has been deleted.",
                                  icon: "success",
                                });
                              }
                            }
                          });
                        }}
                        className="text-white duration-300 select-none cursor-pointer active:scale-90 bg-red-600 text-4xl p-2 rounded-full"
                      />
                      <FaArrowRight className="text-white duration-300 select-none cursor-pointer active:scale-90 bg-primary text-4xl p-2 rounded-full" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <img
              className="w-[200px] h-screen"
              src="https://i.ibb.co/jGzbJBV/photo-1625603736199-775425d2890a.jpg"
            />
          )}
          {user.role == "renter" ? (
            <div className="flex-1 flex flex-col items-center justify-start">
              <p className="text-primary text-3xl font-semibold mt-5">
                My Bookings
              </p>
              <div className="flex flex-col gap-4 w-full mt-6">
                {/* House  */}
                {bookings.map((booking) => (
                  <div
                    key={booking._id}
                    className="flex flex-col border rounded-md"
                  >
                    <div className="flex items-center justify-around p-4">
                      <img
                        className="w-32 h-20 rounded-md"
                        src={booking.picture}
                        alt=""
                      />
                      <p className="font-semibold">{booking.name}</p>
                      <p className="font-semibold">
                        {booking.rent_per_month} BDT
                      </p>
                    </div>
                    <div className="flex items-center justify-center gap-10 py-5">
                      <MdDelete
                        onClick={async () => {
                          Swal.fire({
                            title: "Are you sure?",
                            text: "You won't be able to revert this!",
                            icon: "warning",
                            showCancelButton: true,
                            confirmButtonColor: "#3085d6",
                            cancelButtonColor: "#d33",
                            confirmButtonText: "Yes, delete it!",
                          }).then(async (result) => {
                            if (result.isConfirmed) {
                              const { data } = await axiosInstance.delete(
                                `/booking/delete/${booking._id}`
                              );
                              if (data.success) {
                                await refetchB();
                                Swal.fire({
                                  title: "Deleted!",
                                  text: "Your Booking has been deleted.",
                                  icon: "success",
                                });
                              }
                            }
                          });
                        }}
                        className="text-white duration-300 select-none cursor-pointer active:scale-90 bg-red-600 text-4xl p-2 rounded-full"
                      />
                      <FaArrowRight className="text-white duration-300 select-none cursor-pointer active:scale-90 bg-primary text-4xl p-2 rounded-full" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-start">
              <p className="text-primary text-3xl font-semibold mt-5">Booked</p>
              <div className="flex flex-col gap-4 w-full mt-6">
                {/* House  */}
                {booked.map((booking) => (
                  <div
                    key={booking._id}
                    className="flex flex-col border rounded-md"
                  >
                    <div className="flex items-center justify-around p-4">
                      <img
                        className="w-32 h-20 rounded-md"
                        src={booking.picture}
                        alt=""
                      />
                      <p className="font-semibold">{booking.name}</p>
                      <p className="font-semibold">
                        {booking.rent_per_month} BDT
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </Container>
    </div>
  );
};

export default DashboardPage;
