import * as z from "zod";
import { getRandomInt } from "./utils";

const url = "http://localhost:3333";

const authSchema = z.object({
  type: z.string(),
  token: z.string(),
});

const arrayPostsSchema = z.array(
  z.object({
    id: z.string(),
    titre: z.string(),
    message: z.string().optional(),
    created_at: z.number(),
    nbrComment: z.number().default(getRandomInt(0, 100)),
    nbrVote: z.number().default(getRandomInt(0, 50)),
    hasVoted: z.number().default(getRandomInt(-1, 1)),
    account: z
      .object({
        pseudo: z.string(),
        picture: z.string().optional(),
      })
      .default({ pseudo: "user" + getRandomInt(0, 100), picture: "" }),
  })
);

export type typeArrayPosts = z.infer<typeof arrayPostsSchema>;
const infoUserSchema = z.object({
  pseudo: z.string(),
});
export const Auth = async (credentials: {
  pseudo: string;
  password: string;
  type: "connexion" | "inscription";
}) => {
  const response = await fetch(`${url}/${credentials.type}`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      pseudo: credentials.pseudo,
      password: credentials.password,
    }),
  });
  const data = await response.json();
  let authData = authSchema.safeParse(data);
  if (!authData.success) {
    throw new Error(authData.error.message);
  }

  return authData.data;
};

export const getInfo = async () => {
  let myHeaders = new Headers();
  let accessToken = localStorage.getItem("accessToken");
  myHeaders.append("Authorization", `Bearer ${accessToken}`);
  const response = await fetch(`${url}/me`, {
    method: "GET",
    credentials: "include",
    headers: myHeaders,
  });
  const data = await response.json();
  let authData = infoUserSchema.safeParse(data);
  if (!authData.success) {
    throw new Error(authData.error.message);
  }

  return authData.data;
};

const postSchema = z.object({
  titre: z.string(),
  message: z.string().optional(),
});

export const addPost = async (dataPost: z.infer<typeof postSchema>) => {
  let myHeaders = new Headers();
  let accessToken = localStorage.getItem("accessToken");
  myHeaders.append("Authorization", `Bearer ${accessToken}`);
  myHeaders.append("Content-Type", "application/json");
  const response = await fetch(`${url}/store`, {
    method: "POST",
    credentials: "include",
    headers: myHeaders,
    body: JSON.stringify(dataPost),
  });
  const data = await response.json();
  let postData = postSchema.safeParse(data);
  if (!postData.success) {
    throw new Error(postData.error.message);
  }
  return postData.data;
};
const delay = (delayInms = 20000) => {
  return new Promise((resolve) => setTimeout(resolve, delayInms));
};
export const getPosts = async () => {
  delay();
  let myHeaders = new Headers();
  let accessToken = localStorage.getItem("accessToken");
  myHeaders.append("Authorization", `Bearer ${accessToken}`);
  const response = await fetch(`${url}/list`, {
    method: "GET",
    credentials: "include",
    headers: myHeaders,
  });
  const data = await response.json();
  let postData = arrayPostsSchema.safeParse(data);
  if (!postData.success) {
    throw new Error(postData.error.message);
  }
  return postData.data;
};
