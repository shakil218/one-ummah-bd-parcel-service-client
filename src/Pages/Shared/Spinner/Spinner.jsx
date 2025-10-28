import Lottie from "lottie-react";
import React from "react";
import spinner from "../../../assets/animations/loading.json";

const Spinner = () => {
  return (
    <div className="flex justify-center">
      <Lottie animationData={spinner}></Lottie>
    </div>
  );
};

export default Spinner;