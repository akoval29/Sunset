import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { ScrollTo } from "../../common/scroll/pageScroll";
import { Spinner } from "../../common/loading/spinner";

import { fetchPosts, allPostsSelector } from "./postSlice.js";

import "./postStyle.scss";

export const Posts = () => {
  const allPosts = useSelector(allPostsSelector);
  const { postsLoadingStatus } = useSelector((state) => state.posts);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  if (postsLoadingStatus === "loading") {
    return <Spinner />;
  } else if (postsLoadingStatus === "error") {
    return <h5 className="text-center mt-5">Помилка завантаження</h5>;
  }

  return (
    <article className="app__main">
      <h3 className="app__main-title">Posts</h3>
      {allPosts.map((item) => (
        <div className="post" key={item.id}>
          <div className="post__wrap">
            <p className="post__userId">User № {item.userId}</p>
            <p className="post__postId">Post № {item.id}</p>
          </div>
          <h4 className="post__title">{item.title}</h4>
          <p className="post__body">{item.body}</p>
        </div>
      ))}
      <ScrollTo />
    </article>
  );
};
