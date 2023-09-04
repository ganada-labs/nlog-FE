import { nlogAPI } from "src/utils";

import { Block } from "@blocknote/core";

export type Meta = {
  author: string;
};

export type Post = {
  title: string;
  contents: Block[];
};

export type PostResponse = {
  id: string;
  title: string;
  meta: Meta;
  contents: Block[];
};

export async function createPost(post: Post) {
  return await nlogAPI.post("/post", post);
}

export async function fetchIsAuthor(id: string) {
  return await nlogAPI.get(`/post/${id}?isAuthor=true`);
}

export async function fetchPost(id: string) {
  return await nlogAPI.get(`/post/${id}`);
}

export async function fetchPostList(author: string) {
  return await nlogAPI.get(`/post?author=${author}`);
}

export async function updatePost(id: string, newPost: Post) {
  return await nlogAPI.patch(`/post/${id}`, newPost);
}

export async function deletePost(id: string) {
  return await nlogAPI.delete(`/post/${id}`);
}
