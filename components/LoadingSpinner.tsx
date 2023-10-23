"use client";

import { ThreeDots } from "react-loader-spinner";

function LoadingSpinner() {
  return (
    <ThreeDots
      height="24"
      width="30"
      radius="9"
      color="#ffffff"
      wrapperClass="opacity-80 mx-auto flex justify-center"
      ariaLabel="three-dots-loading"
    />
  );
}

export default LoadingSpinner;
