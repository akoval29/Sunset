import { useCallback } from "react";

export const useHttp = () => {
  const request = useCallback(
    async (
      url,
      method = "GET",
      body = null,
      headers = { "Content-Type": "application/json" }
    ) => {
      try {
        const response = await fetch(url, { method, body, headers });

        if (!response.ok) {
          throw new Error(`Could not fetch ${url}, status: ${response.status}`);
        }

        const data = await response.json();
        console.log(`new request`);
        return data;
      } catch (e) {
        throw e;
      }
    },
    []
  );

  return { request };
};

// export async function getInfo(info) {
//   try {
//     const response = await axios.get(
//       `https://jsonplaceholder.typicode.com/${info}`
//     );
//     console.log(`new request: ${info}`);
//     console.log(response.data);
//     return response;
//   } catch (error) {
//     console.error(error);
//     throw error;
//   }
// }

// Posts: https://jsonplaceholder.typicode.com/posts

// Todo: https://jsonplaceholder.typicode.com/todos

// Users: https://jsonplaceholder.typicode.com/users
// -  show only "name" and "username" for this list
