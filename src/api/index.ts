import { Todo } from "@/utils/Todo";

export interface Photographers {
  id: number;
  width: number;
  height: number;
  url: string;
  photographer: string;
  photographer_url: string;
  photographer_id: number;
  avg_color: string;
  src: {
    original: string;
    large2x: string;
    large: string;
    medium: string;
    small: string;
    portrait: string;
    landscape: string;
    tiny: string;
  };
  liked: boolean;
  alt: string;
}

export const createTod = async (todo: Todo) => {
  return new Promise((resolve, reject) => {
    fetch("http://54.165.215.89:3001/createTodo", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(todo),
    })
      .then((res) => res.json())
      .then((result) => resolve(result))
      .catch((err) => {
        console.log("---> err", err);
        resolve([]);
      });
  });
};

export const deleteTodoParent = async (id: string) => {
  return new Promise((resolve, reject) => {
    fetch("http://54.165.215.89:3001/deleteTodo", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: id }),
    })
      .then((res) => res.json())
      .then((result) => resolve(result))
      .catch(() => resolve([]));
  });
};
export const getAllTodo = () => {
  return new Promise((resolve, reject) => {
    fetch("http://54.165.215.89:3001/getAllTodo", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((result) => resolve(result))
      .catch(() => resolve([]));
  });
};

export const fetchPhotographers = async (): Promise<Photographers | []> => {
  return new Promise((resolve, reject) => {
    fetch("https://imdb-backend-pi.vercel.app/v1/movies/fetchphotographers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((result) => resolve(result?.Data))
      .catch(() => resolve([]));
  });
};

export const addToFavourites = async (id: number) => {
  return new Promise((resolve, reject) => {
    fetch(`https://imdb-backend-pi.vercel.app/v1/movies/addFavorite`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: id }),
    })
      .then((res) => res.json())
      .then((result) => resolve(result))
      .catch(() => resolve([]));
  });
};

export const fetchFavourites = async (): Promise<Photographers | []> => {
  return new Promise((resolve, reject) => {
    fetch("https://imdb-backend-pi.vercel.app/v1/movies/fetchFavorite", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((result) => resolve(result?.Data))
      .catch(() => resolve([]));
  });
};
//
