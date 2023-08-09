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
      return data;
    } catch (e) {
      throw e;
    }
  };

  return { request };
};

// -------------------- вибери API - розкоментуй потрібне ---------------  //

// export const url = "http://localhost:3001"; // локальна БД
export const url = "https://jsonplaceholder.typicode.com"; // фейковий API
