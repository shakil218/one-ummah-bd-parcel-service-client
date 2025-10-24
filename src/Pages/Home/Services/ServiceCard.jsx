const ServiceCard = ({ icon, title, description }) => {
  return (
    <div className="card bg-base-100 shadow-md hover:shadow-xl transition-all p-6 border border-base-200">
      <div className="flex flex-col items-center text-center space-y-4">
        <div className="flex justify-center items-center w-20 h-20 rounded-full bg-radial-[at_100%_50%] from-[#EEEDFC] via-[#EEEDFC] to-[#EEEDFC] to-0% ">{icon}</div>
        <h3 className="text-lg font-bold text-[#03373D]">{title}</h3>
        <p className="text-sm text-gray-600">{description}</p>
      </div>
    </div>
  );
};

export default ServiceCard;
