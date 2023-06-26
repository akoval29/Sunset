import { useEffect, useState } from "react";
import { getInfo } from "./useAPI";

export const useFetchPosts = (endpoint) => {
  const [postItems, setPostItems] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await getInfo(endpoint);
        if (response) {
          setPostItems(response.data);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchPosts();
  }, [endpoint]);

  return postItems;
};
