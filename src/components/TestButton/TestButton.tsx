"use client";

import { nlogAPI } from "src/utils/nlog-api";

const handleClick = async () => {
  const res = await nlogAPI.get("/user");
  alert(res.data);
};

export function TestButton() {
  return (
    <button onClick={handleClick} type='button'>
      fetch User Info
    </button>
  );
}
