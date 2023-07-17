import React, { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHttp } from "../../shared/useAPI";

import { Add } from "../../features/add/add";
import { ScrollTo } from "../../features/scroll/pageScroll";
import { Spinner } from "../../features/loading/spinner";

import {
  postsFetching,
  postsFetched,
  postsFetchingError,
  postsCreated,
  postsDeleted,
} from "../../redux/actions";

import "./postStyle.scss";

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

  const onDelete = useCallback(
    (id) => {
      request(`https://jsonplaceholder.typicode.com/posts/${id}`, "DELETE")
        .then((data) => console.log(data, "Deleted"))
        .then(dispatch(postsDeleted(id)))
        .catch((err) => console.log(err));
      // eslint-disable-next-line
    },
    [request]
  );

  if (postsLoadingStatus === "loading") {
    return <Spinner />;
  } else if (postsFetchingError === "error") {
    return <h5 className="">Помилка завантаження</h5>;
  }

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
      <Add item="post" />
      <ScrollTo />
    </article>
  );
};
