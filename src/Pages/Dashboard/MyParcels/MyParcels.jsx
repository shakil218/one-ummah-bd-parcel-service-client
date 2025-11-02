import React from "react";
import Swal from "sweetalert2";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const MyParcels = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  // ✅ Load parcels for this user
  const {
    data: parcels = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["myParcels", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/parcels?email=${user.email}`);
      return res.data;
    },
  });

  // ✅ Handle delete
  const handleDelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to recover this parcel!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await axiosSecure.delete(`/parcels/${id}`);
          if (res.data.deletedCount > 0) {
            Swal.fire({
              title: "Deleted!",
              text: "Your parcel has been deleted.",
              icon: "success",
              timer: 1500,
              showConfirmButton: false,
            });
          }
          refetch(); // refresh the table
        } catch (error) {
          console.error(error);
          Swal.fire({
            icon: "error",
            title: "Failed!",
            text: "Something went wrong.",
          });
        }
      }
    });
  };

  if (isLoading) return <p className="text-center py-10">Loading...</p>;

  return (
    <section className="container px-4 mx-auto pt-12 gap-x-3">
      <div className="flex items-center gap-2">
        <h2 className="text-lg font-medium text-gray-800 ">My Parcels</h2>

        <span className="px-3 py-1 text-xs text-blue-600 bg-blue-100 rounded-full ">
          {parcels.length} parcel
        </span>
      </div>

      <div className="flex flex-col mt-6">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div className="overflow-hidden border border-gray-200  md:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="py-3.5 px-4 text-sm font-normal text-left text-gray-500">
                      #
                    </th>
                    <th className="py-3.5 px-4 text-sm font-normal text-left text-gray-500">
                      Title
                    </th>
                    <th className="px-4 py-3.5 text-sm font-normal text-left text-gray-500">
                      Parcel Type
                    </th>
                    <th className="px-4 py-3.5 text-sm font-normal text-left text-gray-500">
                      Cost
                    </th>
                    <th className="px-4 py-3.5 text-sm font-normal text-left text-gray-500">
                      Created By
                    </th>
                    <th className="px-4 py-3.5 text-sm font-normal text-left text-gray-500">
                      Status
                    </th>
                    <th className="px-4 py-3.5 text-sm font-normal text-left text-gray-500">
                      Creation Date
                    </th>
                    <th className="px-4 py-3.5 text-sm font-normal text-left text-gray-500">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200 ">
                  {parcels.map((parcel, index) => (
                    <tr key={parcel._id}>
                      <td className="px-4 py-4 text-sm text-gray-700 whitespace-nowrap">
                        {index + 1}
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-700 whitespace-nowrap">
                        {parcel.title}
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-700 whitespace-nowrap">
                        {parcel.parcelType}
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-700 whitespace-nowrap">
                        ${parcel.cost}
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-700 whitespace-nowrap">
                        {parcel.created_by}
                      </td>
                      <td className="px-4 py-4 text-sm whitespace-nowrap">
                        <span
                          className={`px-3 py-1 rounded-full text-xs ${
                            parcel.status === "Pending"
                              ? "text-yellow-600 bg-yellow-100"
                              : parcel.status === "Delivered"
                              ? "text-green-600 bg-green-100"
                              : "text-blue-600 bg-blue-100"
                          }`}
                        >
                          {parcel.status}
                        </span>
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-500 whitespace-nowrap">
                        {new Date(parcel.creation_date).toLocaleDateString()}
                      </td>
                      <td className="px-4 py-4 text-sm whitespace-nowrap">
                        {/* <div className="flex items-center gap-x-4">
                          <button
                            onClick={() => handleDelete(parcel._id)}
                            className="text-gray-500 hover:text-red-500"
                          >
                            🗑️
                          </button>
                        </div> */}
                        <div className="flex items-center gap-x-6">
                          <button
                            onClick={() => handleDelete(parcel._id)}
                            className="text-gray-500 transition-colors duration-200   hover:text-red-500 focus:outline-none"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth="1.5"
                              stroke="currentColor"
                              className="w-5 h-5"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                              />
                            </svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {parcels.length === 0 && (
                <p className="text-center py-6 text-gray-500">
                  No parcels found.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MyParcels;
