import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts, allPostsSelector, deletePost } from "./postSlice.js";

// commons
import { ScrollTo } from "../../common/scroll/pageScroll";
import { Spinner } from "../../common/loading/spinner";
import { EditPost } from "../../common/editForms/post/editPost";
import { AddPost } from "../../common/editForms/post/addPost";

import "./postStyle.scss";

export const Posts = () => {
  const [showEditPost, setShowEditPost] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const allPosts = useSelector(allPostsSelector);
  const { postsLoadingStatus } = useSelector(
    (state) => state.posts.postsLoadingStatus
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  if (postsLoadingStatus === "loading") {
    return <Spinner />;
  } else if (postsLoadingStatus === "error") {
    return <h5 className="text-center mt-5">Помилка завантаження</h5>;
  }

  const onDelete = (postId) => {
    dispatch(deletePost(postId));
  };

  const onEdit = (item) => {
    setSelectedItem(item);
    setShowEditPost(true);
  };

  return (
    <ul className="app__main">
      <h3 className="app__main-title">Posts</h3>
      {allPosts.map((item) => (
        <li className="post" key={item.id}>
          <div className="post__wrap">
            <p className="post__userId">User № {item.userId}</p>
            <p className="post__postId">Post № {item.id}</p>
            <div className="post__edit-wrap">
              <button className="post__item-wrap" onClick={() => onEdit(item)}>
                <img
                  src="https://cdn-icons-png.flaticon.com/512/3524/3524762.png"
                  className="post__item"
                  alt="wrench-icon"
                />
              </button>
              <button
                className="post__item-wrap"
                onClick={() => onDelete(item.id)}
              >
                <img
                  src="https://cdn-icons-png.flaticon.com/512/57/57165.png"
                  className="post__item"
                  alt="cross-icon"
                />
              </button>
            </div>
          </div>
          <h4 className="post__title">{item.title}</h4>
          <p className="post__body">{item.body}</p>
        </li>
      ))}
      <EditPost
        showEditPost={showEditPost}
        setShowEditPost={setShowEditPost}
        selectedItem={selectedItem}
      />

      <AddPost flag="post" />
      <ScrollTo />
    </ul>
  );
};
