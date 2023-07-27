export const useHttp = () => {
  const request = async (
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
  };

  return { request };
};

// Posts: https://jsonplaceholder.typicode.com/posts

// Todo: https://jsonplaceholder.typicode.com/todos

// Users: https://jsonplaceholder.typicode.com/users
// -  show only "name" and "username" for this list
