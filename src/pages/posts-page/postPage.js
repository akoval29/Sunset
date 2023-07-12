import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHttp } from "../../shared/useAPI";

import { scrollTo } from "../../features/scroll/pageScroll";
import "../../features/scroll/scrollStyle.css";

import {
  postsFetching,
  postsFetched,
  postsFetchingError,
} from "../../redux/actions";

import "./postStyle.css";

export const Posts = () => {
  const { posts, postsLoadingStatus } = useSelector((state) => state.posts);
  const dispatch = useDispatch();
  const { request } = useHttp();

  useEffect(() => {
    dispatch(postsFetching());
    request("https://jsonplaceholder.typicode.com/posts")
      .then((data) => dispatch(postsFetched(data)))
      .catch(() => dispatch(postsFetchingError()));

    // eslint-disable-next-line
  }, []);

  if (postsLoadingStatus === "loading") {
    return <h5 className="">Loading ...</h5>;
  } else if (postsFetchingError === "error") {
    return <h5 className="">Помилка завантаження</h5>;
  }

  // scrolling
  const handleScrollTo = () => {
    scrollTo();
  };

  //newPost
  const newPost = () => {
    console.log(`newPost btn +`);
  };

  return (
    <article className="app__main">
      <h3 className="app__main-title">Posts</h3>
      {posts.map((item) => (
        <div className="post" key={item.id}>
          <div className="post__wrap">
            <p className="post__userId">User № {item.userId}</p>
            <p className="post__postId">Post № {item.id}</p>
          </div>
          <h4 className="post__title">{item.title}</h4>
          <p className="post__body">{item.body}</p>
        </div>
      ))}

      <div className="add" onClick={newPost}>
        <div className="add__cross-wrap">
          <span className="add__cross">✕</span>
        </div>
        <div className="add__message-wrap">
          <div className="add__message">Add new post</div>
        </div>
      </div>

      <div className="scroll" onClick={handleScrollTo}>
        <span className="scroll__arrow scroll__arrowDown"></span>
      </div>
    </article>
  );
};
