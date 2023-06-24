import axios from "axios";

export async function getInfo(info) {
  try {
    const response = await axios.get(
      `https://jsonplaceholder.typicode.com/${info}`
    );
    console.log(response.data);
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

// Posts: https://jsonplaceholder.typicode.com/posts

// Todo: https://jsonplaceholder.typicode.com/todos

// Users: https://jsonplaceholder.typicode.com/users
// -  show only "name" and "username" for this list
