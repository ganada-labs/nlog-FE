"use client";

import { createPost } from "src/requests";

import { Block } from "@blocknote/core";
import dynamic from "next/dynamic";
import Link from "next/link";
import { redirect } from "next/navigation";
import { type ChangeEventHandler, type MouseEventHandler, useState } from "react";

const BlockNote = dynamic(
  async () => {
    const { BlockNote } = await import("src/components/BlockNote");
    return { default: BlockNote };
  },
  { ssr: false },
);

export default function Editor() {
  const [title, setTitle] = useState("");
  const [contents, setContents] = useState<Block[]>([]);
  const handleTitle: ChangeEventHandler<HTMLInputElement> = (e) => {
    const newTitle = e.currentTarget.value;
    setTitle(newTitle);
  };

  const handleBlockNote = (blocks: Block[]) => {
    setContents(blocks);
  };

  const handlePublish: MouseEventHandler<HTMLButtonElement> = async () => {
    const { data } = await createPost({
      contents,
      title,
    });

    redirect(`/${data.id}`);
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
      <BlockNote onEdit={handleBlockNote} />
      <div>
        <button type='button' onClick={handlePublish}>
          publish
        </button>
      </div>
    </>
  );
}
