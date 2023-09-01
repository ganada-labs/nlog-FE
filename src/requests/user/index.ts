import { nlogAPI } from "src/utils";

export type User = {
  name: string;
  email: string;
};

export async function fetchUser() {
  return await nlogAPI.get("/user");
}

export async function fetchUserById(id: string) {
  return await nlogAPI.get(`/user/${id}`);
}
