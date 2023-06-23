import axios from "axios";

let lastinfo = null; // уникнути повторних запитів на сервер 1/3
export async function getInfo(info) {
  if (!info || (lastinfo && lastinfo === info)) {
    return;
  } // уникнути пустих і повторних запитів на сервер 2/3
  try {
    const response = await axios.get(
      `https://jsonplaceholder.typicode.com/${info}`
    );
    lastinfo = info; // уникнути повторних запитів на сервер 3/3
    console.log(response.data);
    return response;
  } catch (error) {
    // onError();
    console.error(error);
    throw error;
  }
}

// Posts: https://jsonplaceholder.typicode.com/posts

// Todo: https://jsonplaceholder.typicode.com/todos

// Users: https://jsonplaceholder.typicode.com/users
// -  show only "name" and "username" for this list
