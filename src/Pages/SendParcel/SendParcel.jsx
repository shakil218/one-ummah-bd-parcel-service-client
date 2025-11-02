import { useForm } from "react-hook-form";
import { useLoaderData } from "react-router";
import Swal from "sweetalert2";
import useAuth from "./../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import creditCard from "../../assets/credit-card.png";
import pencil from "../../assets/edit.png";

// Utility to generate unique tracking ID
const generateTrackingId = () => {
  const prefix = "PF"; // short for your company, e.g., ProFast
  const timestamp = Date.now().toString(36).toUpperCase(); // base36 timestamp
  const randomPart = Math.random().toString(36).substring(2, 7).toUpperCase(); // 4 random chars
  return `${prefix}-${timestamp}-${randomPart}`;
};

const SendParcel = () => {
  const serviceCenters = useLoaderData();
  // const navigate = useNavigate();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const regions = [...new Set(serviceCenters.map((c) => c.region))];

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm();

  // Watch real-time form inputs
  const selectedSenderRegion = watch("senderRegion");
  const selectedReceiverRegion = watch("receiverRegion");
  const parcelType = watch("parcelType", "document");

  const senderCenters = serviceCenters.filter(
    (c) => c.region === selectedSenderRegion
  );
  const receiverCenters = serviceCenters.filter(
    (c) => c.region === selectedReceiverRegion
  );

  const onSubmit = (data) => {
    const isSameDistrict = data.senderWireHouse === data.receiverWireHouse;
    const parcelWeight = parseFloat(watch("parcelWeight") || 0);

    // Calculate cost and breakdown
    let cost = 0;
    let breakdown = { base: 0, extra: 0 };

    if (parcelType === "document") {
      cost = isSameDistrict ? 60 : 80;
      breakdown.base = cost;
      breakdown.extra = 0;
    } else if (parcelType === "non-document") {
      if (parcelWeight <= 3) {
        cost = isSameDistrict ? 110 : 150;
        breakdown.base = cost;
        breakdown.extra = 0;
      } else {
        const extraWeight = parcelWeight - 3;
        cost = isSameDistrict
          ? 110 + extraWeight * 40
          : 150 + extraWeight * 40 + 40;
        breakdown.base = isSameDistrict ? 110 : 150;
        breakdown.extra = cost - breakdown.base;
      }
    }

    // ✅ Show SweetAlert2 modal instead of previous setModalData
    Swal.fire({
      title: "Confirm Your Booking",
      html: `
      <div class="text-left">
        <p>Estimated Delivery Cost: <strong>৳${cost}</strong></p>
        <div class="mt-2 bg-gray-50 p-4 rounded-lg text-gray-700 space-y-2 max-h-60 overflow-auto">
          <p class="font-semibold">💡 How your Estimated Cost was calculated:</p>
          <div class="bg-gray-100 p-3 rounded-lg mt-2 text-gray-700 space-y-1">
            <p class="font-semibold">💡 Cost Breakdown:</p>
            <p>Base Cost: ৳${breakdown.base}</p>
            <p>Extra Cost: ৳${breakdown.extra}</p>
            <p class="font-bold">Total Cost:৳${cost}</p>
          </div>
          <hr class="my-2" />
          <p class="font-semibold">📦 Pricing Policy:</p>
          <ul class="list-disc ml-5 space-y-1 text-gray-700">
          <li><strong>Document:</strong> Any weight – Within City: ৳60, Outside City: ৳80</li>
          <li><strong>Non-Document (≤ 3kg):</strong> Within City: ৳110, Outside City: ৳150</li>
          <li><strong>Non-Document (> 3kg):</strong> +৳40 per extra kg + ৳40 extra fee</li>
        </ul>
        </div>
        <p class="mt-2 text-sm text-gray-500">
          Please review and confirm that you agree with the above pricing policy before submitting your booking.
        </p>

        <div class="mt-4 flex justify-end gap-3">
          <button id="payBtn" class="flex items-center gap-2 px-5 py-2 rounded-lg text-white
                 bg-linear-to-r from-[#06B6D4] to-[#0284C7] hover:from-[#0EA5E9] hover:to-[#0369A1]
                 transition-all duration-300 shadow-md">
                 <img src="${creditCard}" alt="Credit Card Icon" class="w-5 h-5"/>
             Proceed to Payment
          </button>
          <button id="editBtn" class="flex items-center gap-2 px-5 py-2 rounded-lg
                 text-gray-800 bg-linear-to-r from-gray-100 to-gray-200
                 hover:from-gray-200 hover:to-gray-300
                 transition-all duration-300 shadow-sm">
                 <img src="${pencil}" alt="Edit Icon" class="w-5 h-5"/>
            Edit Details
          </button>
        </div>
      </div>
    `,
      showConfirmButton: false,
      showCancelButton: false,
      width: "600px",
      didOpen: () => {
        const editBtn = Swal.getHtmlContainer().querySelector("#editBtn");
        const payBtn = Swal.getHtmlContainer().querySelector("#payBtn");

        editBtn.addEventListener("click", () => Swal.close());

        payBtn.addEventListener("click", async () => {
          Swal.close(); // Close the SweetAlert modal first

          const trackingId = generateTrackingId();
          const parcelData = {
            ...data,
            cost,
            created_by: user?.email,
            status: "Pending",
            creation_date: new Date().toISOString(),
            trackingNumber: trackingId,
            paymentStatus: "Pending",
          };

          // Send parcelData to server
          try {
            const res = await axiosSecure.post("/parcels", parcelData);
            console.log("Server Response:", res.data);

            if (res.data.insertedId) {
              // Show success alert
              Swal.fire({
                title: "Booking Confirmed 🎉",
                text: "Redirecting to payment gateway...",
                icon: "success",
                showConfirmButton: false,
                timer: 1800,
                timerProgressBar: true,
              });

              //TODO: Redirect to payment page after 1.8s
              // setTimeout(() => {
              //   navigate(`/payment/${trackingId}`, { state: { parcelData } });
              // }, 1800);

              // Reset form
              reset();
            }
          } catch (error) {
            console.error("Error saving parcel:", error);

            Swal.fire({
              title: "Error ❌",
              text: "Failed to save parcel. Please try again.",
              icon: "error",
              confirmButtonColor: "#d33",
            });
          }
        });
      },
    });
  };

  return (
    <div className="bg-base-100 py-8 my-5 rounded-2xl">
      <div className="max-w-7xl mx-auto px-4">
        {/* Title & Subtitle */}
        <div className="text-left mb-4">
          <h1 className="text-3xl font-bold text-gray-800">Send a Parcel</h1>
          <p className="text-gray-600">
            Quickly and securely send your parcels door-to-door with real-time
            tracking and flexible pickup options.
          </p>
        </div>

        <hr className="border-gray-300 mb-6" />

        <h2 className="text-lg font-semibold text-gray-700 mb-4">
          Enter your parcel details
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          {/* Parcel Info */}
          <div className="space-y-4">
            <h3 className="text-base font-semibold text-gray-700 mb-3">
              Parcel Info
            </h3>

            {/* Parcel Type Radios */}
            <div className="flex flex-col sm:flex-row gap-4 mb-3">
              {["document", "non-document"].map((type) => (
                <label
                  key={type}
                  className="flex items-center gap-2 cursor-pointer relative"
                >
                  <input
                    type="radio"
                    value={type}
                    {...register("parcelType", { required: true })}
                    // onChange={() => setParcelType(type)}
                    className="peer absolute opacity-0"
                  />

                  <div
                    className={`
                  w-5 h-5 rounded-full border-2 border-gray-400
                  peer-checked:border-[#0AB010] peer-checked:ring-2 peer-checked:ring-[#0AB010]
                  transition-all
                `}
                  ></div>
                  <span className="ml-2 capitalize">{type}</span>
                </label>
              ))}
            </div>
            {errors.type && (
              <p className="text-red-500 text-sm">
                Please select a parcel type.
              </p>
            )}

            {/* Parcel Title & Weight */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Parcel Title */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Parcel Title</span>
                </label>
                <input
                  type="text"
                  placeholder="Enter parcel title"
                  {...register("title", { required: true })}
                  className="input input-bordered w-full"
                />
                {errors.title && (
                  <p className="text-red-500 text-sm">
                    Parcel title is required.
                  </p>
                )}
              </div>

              {/* Parcel Weight */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Weight (kg)</span>
                </label>
                <input
                  type="number"
                  step="0.1"
                  placeholder="Enter parcel weight"
                  {...register("parcelWeight")} // <-- changed from "weight"
                  disabled={parcelType === "document"}
                  className={`input input-bordered w-full ${
                    parcelType === "document"
                      ? "bg-gray-100 cursor-not-allowed"
                      : ""
                  }`}
                />
              </div>
            </div>
          </div>

          <hr className="border-gray-300" />

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sender Info */}
            <div>
              <h3 className="text-base font-semibold text-gray-700 mb-3">
                Sender Details
              </h3>

              {/* Row 1:Sender Name + Contact */}
              <div className="flex flex-col lg:flex-row gap-4">
                {/* sender name */}
                <div className="form-control flex-1">
                  <label className="label">
                    <span className="label-text">Sender Name</span>
                  </label>
                  <input
                    type="text"
                    defaultValue={user.displayName}
                    {...register("senderName", { required: true })}
                    className="input input-bordered w-full"
                  />
                </div>
                {/* Contact */}
                <div className="form-control flex-1">
                  <label className="label">
                    <span className="label-text">Sender Contact No</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Enter contact number"
                    {...register("senderContact", { required: true })}
                    className="input input-bordered w-full"
                  />
                </div>
              </div>

              {/* Row 2:Sender Region + Sender Pickup Wire house */}
              <div className="flex flex-col lg:flex-row gap-4 mt-4">
                {/* Region */}
                <div className="form-control flex-1">
                  <label className="label">
                    <span className="label-text">Select Region</span>
                  </label>
                  <select
                    {...register("senderRegion", { required: true })}
                    // onChange={(e) => setSelectedSenderRegion(e.target.value)}
                    className="select select-bordered w-full"
                  >
                    <option value="">Select Region</option>
                    {regions.map((region) => (
                      <option key={region}>{region}</option>
                    ))}
                  </select>
                </div>

                {/* Sender Pickup Wire house */}
                <div className="form-control flex-1">
                  <label className="label">
                    <span className="label-text">Sender Pickup Wire house</span>
                  </label>
                  <select
                    {...register("senderWireHouse", { required: true })}
                    className="select select-bordered w-full"
                  >
                    <option value="">Select Wire House</option>
                    {senderCenters.map((center, index) => (
                      <option key={index}>
                        {center.name} ({center.district})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Address */}
              <div className="form-control mt-4">
                <label className="label">
                  <span className="label-text">Address</span>
                </label>
                <input
                  type="text"
                  placeholder="Enter pickup address"
                  {...register("senderAddress", { required: true })}
                  className="input input-bordered w-full"
                />
              </div>

              {/* Pickup Instructions */}
              <div className="form-control mt-4">
                <label className="label">
                  <span className="label-text">Pickup Instruction</span>
                </label>
                <textarea
                  placeholder="Enter pickup instruction"
                  {...register("pickupInstruction")}
                  className="textarea textarea-bordered w-full"
                ></textarea>
              </div>
            </div>

            {/* Receiver Info */}
            <div>
              <h3 className="text-base font-semibold text-gray-700 mb-3">
                Receiver Details
              </h3>

              {/* Row 1: Receiver Name + Contact */}
              <div className="flex flex-col lg:flex-row gap-4">
                <div className="form-control flex-1">
                  <label className="label">
                    <span className="label-text">Receiver Name</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Enter receiver name"
                    {...register("receiverName", { required: true })}
                    className="input input-bordered w-full"
                  />
                </div>
                {/* Contact */}
                <div className="form-control flex-1">
                  <label className="label">
                    <span className="label-text">Receiver Contact No</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Enter receiver contact"
                    {...register("receiverContact", { required: true })}
                    className="input input-bordered w-full"
                  />
                </div>
              </div>

              {/* Row 2: Receiver Region + Service Center */}
              <div className="flex flex-col lg:flex-row gap-4 mt-4">
                {/* Region */}
                <div className="form-control flex-1">
                  <label className="label">
                    <span className="label-text">Select Region</span>
                  </label>
                  <select
                    {...register("receiverRegion", { required: true })}
                    // onChange={(e) => setSelectedReceiverRegion(e.target.value)}
                    className="select select-bordered w-full"
                  >
                    <option value="">Select Region</option>
                    {regions.map((region) => (
                      <option key={region}>{region}</option>
                    ))}
                  </select>
                </div>
                {/* Receiver Delivery Wire house */}
                <div className="form-control flex-1">
                  <label className="label">
                    <span className="label-text">
                      Receiver Delivery Wire House
                    </span>
                  </label>
                  <select
                    {...register("receiverWireHouse", { required: true })}
                    className="select select-bordered w-full"
                  >
                    <option value="">Select Receiver Wire House</option>
                    {receiverCenters.map((center, index) => (
                      <option key={index}>
                        {center.name} ({center.district})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Address */}
              <div className="form-control mt-4">
                <label className="label">
                  <span className="label-text">Receiver Address</span>
                </label>
                <input
                  type="text"
                  placeholder="Enter delivery address"
                  {...register("receiverAddress", { required: true })}
                  className="input input-bordered w-full"
                />
              </div>

              {/* Delivery Instructions */}
              <div className="form-control mt-4">
                <label className="label">
                  <span className="label-text">Delivery Instruction</span>
                </label>
                <textarea
                  placeholder="Enter delivery instruction"
                  {...register("deliveryInstruction")}
                  className="textarea textarea-bordered w-full"
                ></textarea>
              </div>
            </div>
          </div>

          {/* Pickup Time Note */}
          <p className="text-sm text-gray-600 italic mt-4">
            * PickUp Time <strong>4pm-7pm</strong> Approx.
          </p>

          {/* Submit Button */}
          <div className="mt-6 ">
            <button
              type="submit"
              className="btn btn-primary text-black w-full lg:w-sm"
            >
              Proceed to Confirm Booking
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SendParcel;
