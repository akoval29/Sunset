import React from "react";
import { useFetchPosts } from "../../shared/hooks";
import "./postStyle.css";

export const Posts = () => {
  const postItems = useFetchPosts("posts");

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
