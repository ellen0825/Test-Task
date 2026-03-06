import React from "react";

export default function Badge({
  value = "",
  // width = "",
  ...props
}) {
  return (
    <div className="min-w-[55px] h-[35px] rounded-b-[8px] bg-[#FD5656] text-white text-center text-bzse py-[5px] px-3 flex items-center justify-center">-{value ? value : 0}%</div>
  );
}
