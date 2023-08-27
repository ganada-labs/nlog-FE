"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { ChangeEventHandler, useState } from "react";

const BlockNote = dynamic(
  async () => {
    const { BlockNote } = await import("src/components/BlockNote");
    return { default: BlockNote };
  },
  { ssr: false },
);

export default function Editor() {
  const [title, setTitle] = useState("");

  const handleChangeTitle: ChangeEventHandler<HTMLInputElement> = (e) => {
    const value = e.currentTarget.value;
    setTitle(value);
  };

  return (
    <>
      <h2>에디터 페이지</h2>
      <div>
        <Link href='/'>home</Link>
      </div>
      <label>
        <span>Title: </span>
        <input value={title} onChange={handleChangeTitle}></input>
      </label>
      <BlockNote />
    </>
  );
}
