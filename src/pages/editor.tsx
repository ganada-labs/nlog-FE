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

  const handleTitle: ChangeEventHandler<HTMLInputElement> = (e) => {
    const newTitle = e.currentTarget.value;
    setTitle(newTitle);
  };

  return (
    <>
      <h2>에디터 페이지</h2>
      <div>
        <Link href='/'>home</Link>
      </div>
      <label>
        <span>Title: </span>
        <input value={title} onChange={handleTitle}></input>
      </label>
      <BlockNote />
    </>
  );
}
