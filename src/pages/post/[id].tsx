import { fetchPost } from "src/requests";

import { Block } from "@blocknote/core";
import { type GetServerSideProps } from "next";
import { HTMLAttributes } from "react";

type meta = {
  author: string;
};
interface Props extends HTMLAttributes<HTMLDivElement> {
  post: {
    title: string;
    meta: meta;
    contents: Block[];
  };
}
export default function Post(props: Props) {
  const { post } = props;

  return (
    <>
      <h1>{post.title}</h1>
      <span>author: {post.meta.author}</span>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.query;
  const { data } = await fetchPost(id as string);

  return {
    props: {
      post: data,
    },
  };
};
