import React from "react";

export default function Badge({
  value = "",
  // width = "",
  ...props
}) {
  return (
    <div className="absolute top-0 left-12 w-[70px] h-[40px] rounded-b-[8px] bg-[#FD5656] text-white 
    text-center text-xl py-[5px]">-{value ? value : 0}%</div>
  );
}
