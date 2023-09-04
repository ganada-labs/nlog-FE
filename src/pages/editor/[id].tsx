"use client";

import { fetchPost, updatePost } from "src/requests";

import { Block } from "@blocknote/core";
import { type GetServerSideProps } from "next";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useRouter } from "next/router";
import { type ChangeEventHandler, HTMLAttributes, type MouseEventHandler, useState } from "react";

const BlockNote = dynamic(
  async () => {
    const { BlockNote } = await import("src/components/BlockNote");
    return { default: BlockNote };
  },
  { ssr: false },
);

type Meta = {
  author: string;
};

interface Props extends HTMLAttributes<HTMLDivElement> {
  post: {
    id: string;
    title: string;
    meta: Meta;
    contents: Block[];
  };
}

export default function Editor(props: Props) {
  const { post } = props;

  const router = useRouter();
  const [title, setTitle] = useState(post.title);
  const [contents, setContents] = useState<Block[]>(post.contents);
  const handleTitle: ChangeEventHandler<HTMLInputElement> = (e) => {
    const newTitle = e.currentTarget.value;
    setTitle(newTitle);
  };

  const handleBlockNote = (blocks: Block[]) => {
    setContents(blocks);
  };

  const handleUpdate: MouseEventHandler<HTMLButtonElement> = async () => {
    await updatePost(post.id, {
      contents,
      title,
    });

    router.push(`/posts/${post.id}`);
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
      <BlockNote onEdit={handleBlockNote} init={contents} />
      <div>
        <button type='button' onClick={handleUpdate}>
          수정하기
        </button>
      </div>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.query;
  const { data } = await fetchPost(id as string);
  const { post } = data;

  return {
    props: {
      post,
    },
  };
};
