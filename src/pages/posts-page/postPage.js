import React, { useEffect, useState } from "react";
import { getInfo } from "../../shared/useAPI";

import "./postStyle.css";

export const Posts = () => {
  const [postItems, setPostItems] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await getInfo("posts");
        if (response && response.data) {
          setPostItems(response.data);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <article className="app__main">
      <h3 className="app__main-title">Posts</h3>
      {postItems.map((item) => (
        <div className="post" key={item.id}>
          <div className="post__wrap">
            <p className="post__userId">User № {item.userId}</p>
            <p className="post__postId">Post № {item.id}</p>
          </div>
          <h4 className="post__title">{item.title}</h4>
          <p className="post__body">{item.body}</p>
        </div>
      ))}
    </article>
  );
};
