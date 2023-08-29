import { nlogAPI } from "src/utils";

export type User = {
  name: string;
  email: string;
};

export async function fetchUserById(id: string) {
  return await nlogAPI.get(`/user/${id}`);
}
