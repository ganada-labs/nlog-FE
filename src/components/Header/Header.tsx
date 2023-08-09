"use client";

export function Header() {
  const handleClick = () => {
    window.location.assign("https://api.new-blog.store/auth/google");
  };

  return (
    <button onClick={handleClick} type='button'>
      구글 로그인
    </button>
  );
}
