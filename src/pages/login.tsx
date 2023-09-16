"use client";

import { ENV } from "src/constants";

export default function Login() {
  const handleClick = () => {
    window.location.assign(`${ENV.NLOG_API}/auth/google`);
  };

  return (
    <>
      <h2>로그인 페이지</h2>
      <button onClick={handleClick} type='button'>
        구글 로그인
      </button>
    </>
  );
}
