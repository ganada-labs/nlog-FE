"use client";

export default function Login() {
  const handleClick = () => {
    fetch("/api/auth?provider=google");
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
