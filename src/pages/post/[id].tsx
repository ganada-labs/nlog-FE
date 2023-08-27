import { fetchPost } from "src/requests";

import { type GetServerSideProps } from "next";
import { HTMLAttributes } from "react";

interface Props extends HTMLAttributes<HTMLDivElement> {
  post: object;
}
export default function Post(props: Props) {
  const { post } = props;

  console.log(post);

  return (
    <div>
      <h1>Title</h1>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.query;
  console.log(id);
  const { data } = await fetchPost(id as string);

  console.log(id, data);
  return {
    props: {
      post: data,
    },
  };
};
