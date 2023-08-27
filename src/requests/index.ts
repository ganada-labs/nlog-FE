import { nlogAPI } from "src/utils";

import { Block } from "@blocknote/core";

type Post = {
  title: string;
  contents: Block[];
};

export async function createPost(post: Post) {
  return await nlogAPI.post("/post", post);
}

export async function fetchPost(id: string) {
  return await nlogAPI.get(`/post/${id}`);
}
