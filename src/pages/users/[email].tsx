import {
  fetchPostList,
  fetchUser,
  fetchUserById,
  type PostResponse,
  type User,
} from "src/requests";

import { type GetServerSideProps } from "next";
import Link from "next/link";
import { HTMLAttributes } from "react";

interface Props extends HTMLAttributes<HTMLDivElement> {
  user: User;
  posts: PostResponse[];
}

export default function Post(props: Props) {
  const { user, posts } = props;

  return (
    <>
      <h1>{user.name}</h1>
      <ul>
        {posts.map((post, index) => (
          <li key={index}>
            <h3>
              <Link href={`/posts/${post.id}`}>{post.title}</Link>
            </h3>
          </li>
        ))}
      </ul>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { email } = context.query;
  await fetchUser(); // access token 갱신용
  const { data: user } = await fetchUserById(email as string);
  const { data: posts } = await fetchPostList(user.email);
  return {
    props: {
      posts,
      user,
    },
  };
};
