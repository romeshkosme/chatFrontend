import React from "react";
import { BeatLoader } from "react-spinners";

function LoaderButton({ loading }) {
  return (
    <>
      <button className="font-[500] w-full bg-[#1d3557] text-white px-2 py-1 rounded-[4px] mt-4">
        <BeatLoader color="#a8dadc" size="10px" loading={loading} />
      </button>
    </>
  );
}

export default LoaderButton;
