import { useState } from "react";
import { useForm } from "react-hook-form";
import { useLoaderData } from "react-router";


const SendParcel = () => {
  const serviceCenters = useLoaderData();

  const [selectedSenderRegion, setSelectedSenderRegion] = useState("");
  const [selectedReceiverRegion, setSelectedReceiverRegion] = useState("");

  const regions = [...new Set(serviceCenters.map((c) => c.region))];

  const senderCenters = serviceCenters.filter(
    (c) => c.region === selectedSenderRegion
  );
  const receiverCenters = serviceCenters.filter(
    (c) => c.region === selectedReceiverRegion
  );

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [parcelType, setParcelType] = useState("document");

  const onSubmit = (data) => {
    // Simulate cost calculation
    let cost = 50;
    if (data.type === "non-document") cost += 30;
    if (data.weight) cost += Number(data.weight) * 5;

    alert(`Delivery Cost: $${cost}\nProceeding to confirm booking...`);
    reset();
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
                    {...register("type", { required: true })}
                    onChange={() => setParcelType(type)}
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
                  {...register("weight")}
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
                    defaultValue="John Doe"
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
                    onChange={(e) => setSelectedSenderRegion(e.target.value)}
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
                    {senderCenters.map((center) => (
                      <option key={center.id}>
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
                    onChange={(e) => setSelectedReceiverRegion(e.target.value)}
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
                    {receiverCenters.map((center) => (
                      <option key={center.id}>
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
